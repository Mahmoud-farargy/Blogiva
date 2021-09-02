<template>
    <div id="createPost">
    <!-- <Loading v-show="loading" /> -->
    <div class="container">
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle" />
        <div class="upload-file flex-row">
          <label :class="{ 'button-inactive': method !== 'create'}" for="blog-photo">Upload Cover Photo</label>
          <input type="file" :disabled="method !== 'create'" :class="{ 'button-inactive': method !== 'create'}" class="router-button" ref="blogPhoto" id="blog-photo" @change="fileChange" accept=".png, .jpg, ,jpeg" />
          <button @click="openPreview" class="preview" :class="{ 'button-inactive': !blogPhotoFileURL }">
            Preview Photo
          </button>
          <span v-if="blogPhotoName" >File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" aria-placeholder="text editor" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler" />
      </div>
      <div class="blog-actions flex-row">
        <button :disabled="isLoading.globalLoading" :class="{ 'button-inactive': isLoading.globalLoading}"  @click="uploadBlog">{{method === "create" ? "Publish Blog" : "Save Changes"}}</button>
        <button class="router-button"
          :disabled="!blogPhotoFileURL || !blogHTML || !blogTitle || isLoading.globalLoading"
          :class="{ 'button-inactive': !blogPhotoFileURL || !blogHTML || !blogTitle || isLoading.globalLoading}"
          @click="redirectToPostPreview">{{method === "create" ? "Post Preview" : "Perview Changes"}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from "quill";
import { mapActions, mapGetters } from 'vuex';
import { storageRef } from "../../config/firebase";
import { routeNames } from "@/Consts" ;
import { notify, handleLoading, uploadBlogPost, generateNewId } from "@/utilities";
window.Quill = Quill;
const imageResize = require("quill-image-resize-module").default;
Quill.register("modules/imageResize", imageResize);
export default {
    name: "CreatePost",
    data(){
        return {
            file: {},
            routeNames,
            blogTitle: "",
            blogHTML: "",
            blogPhotoFileURL: "",
            blogPhotoPreview: null,
            blogPhotoName: "",
            method: "create",
            uploadedBlogId: "",
            blogDate: "",
            editorSettings: {
                modules: {
                    imageResize: {}
                }
            }
        }
    },
    methods: {
      ...mapActions("blogList", [ "updateBlogObj"]),
      ...mapActions("modals", [ "updateModals" ]),
      imageHandler(file, Editor, cursorLocation, resetUploader) {
        const uid = this.getUID;
        if(uid && file){
          handleLoading('globalLoading', true);
          const docRef = storageRef.child(`blogPostPhotos/${this.getUID}/${file.name}`);
          docRef.put(file).on(
            "state_changed",
            (snapshot) => {
              console.log(snapshot);
            },
            () => {
              handleLoading('globalLoading', false);
            },
            async () => {
              handleLoading('globalLoading', false);
              const downloadURL = await docRef.getDownloadURL();
              Editor.insertEmbed(cursorLocation, "image", downloadURL);
              resetUploader();
            }
          );
        }
      },
        uploadBlog () {
          if(this.blogTitle && this.blogHTML){
              if(this.file?.name || this.blogPhotoFileURL){
                if (
                (/(image)/g.test( this.file?.type) &&
                 this.file.size <= 5242880) || this?.blogPhotoFileURL
              ) {
                uploadBlogPost({blogTitle: this.blogTitle, blogHTML: this.blogHTML, file: this.file, blogPhotoName: this.blogPhotoName, method: this.method, blogId: this.uploadedBlogId, uploadedCoverUrl: this?.blogPhotoFileURL, blogDate: this.blogDate }).then(() => {
                  this.resetForm();
                });
              }else{
                  notify({ type: "error", msg: "The photo should be less than 5 MB."});
              }
                  
              }else{
                 notify({ type: "error", msg: "Please ensure you uploaded a cover photo!"});
              }
          }else{
            notify({ type: "error", msg: "Please ensure Blog Title & Blog Post has been filled!"});
          }
        },
        fileChange() {
            const file = this.$refs.blogPhoto.files[0];
            if(file){
              const fileName = `${generateNewId()}_${file?.name}` ;
              this.file = file;
              this.blogPhotoFileURL = URL.createObjectURL(file);
              this.blogPhotoName = fileName;
            }

        },
        openPreview() {
          this.cloneObj();
           this.updateModals({level: 3, type: "coverPreview", val: true });
        },
        redirectToPostPreview(){
          this.cloneObj();
          this.$router.push({name: this.routeNames.blogPreview});
        },
        populateData(){
            const blogId = this.$route?.params?.blogId;
            const fetchedBlogs = this.getReceivedData.blogs ? this.getReceivedData.blogs : null;
            if((this.$route.name === routeNames.updatePost && blogId) && fetchedBlogs){ 
                const blogIndex = fetchedBlogs.map(blog => blog.blogId).indexOf(blogId);
                if(blogIndex !== -1){
                  const  { blogPhotoName, blogHTML, blogTitle, blogCoverPhoto, blogDate } = fetchedBlogs[blogIndex];
                  this.method = "update";
                  this.uploadedBlogId = blogId;
                  this.blogTitle = blogTitle;
                  this.blogHTML = blogHTML;
                  this.blogPhotoFileURL = blogCoverPhoto;
                  this.blogPhotoName = blogPhotoName;       
                  this.blogDate = blogDate;    
                }else{
                  notify({ type: "error", msg: "Error occurred while fetching data."});
                }
            }else{
                this.method = "create";
            }
      },
      resetForm(){
        this.file = null;
        this.blogTitle = "";
        this.blogHTML = "";
        this.blogPhotoFileURL = "";
        this.blogPhotoPreview = null;
        this.blogPhotoName = "";
        this.uploadedBlogId = "";
        this.blogDate = "";
      },
      cloneObj(){
        const objToPreview = {
            file: this.file,
            blogTitle: this.blogTitle,
            blogHTML: this.blogHTML,
            blogPhotoFileURL: this.blogPhotoFileURL,
            blogPhotoPreview: this.blogPhotoPreview,
            blogPhotoName: this.blogPhotoName,
          }
          this.updateBlogObj({newObj: objToPreview});
      }
    },
    beforeRouteLeave (to, _, next) {
        if((this?.file || this.blogTitle  || this.blogHTML ) && (to?.name !== this.routeNames.blogPreview && to?.name !== this.routeNames.home && to?.name !== this.routeNames.viewPost)){
            this.resetForm();
        }
        return next();
    },
    computed: {
        ...mapGetters("modals", ["getModals"]),
        ...mapGetters("blogList", ["getReceivedData"]),
        ...mapGetters("user",["getUID"]),
        ...mapGetters("toggleKeys", {isLoading: "getLoadingState"}),
    },
    watch: {
      '$route.name'(){
        this.populateData();
      },

    },
    mounted(){
      this.populateData();
    }
}
</script>

<style lang="scss">
 #createPost {
  margin-top: 10px;
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    text-decoration: none;
    background-color: var(--primary-clr);
    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .blog-info {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 32px;
    gap: 15px;
    input:nth-child(1) {
      @media only screen and (min-width: 700px) {
        min-width: 300px;
      }
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid var(--primary-clr);

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 var(--primary-clr);
      }
    }
    label, button{
      white-space: nowrap;

    }
    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      flex-wrap: wrap;
      gap:10px;

      @media only screen and (max-width: 700px){
        margin-left: 0;
      }
      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    align-items: center;
    flex-wrap: wrap;
    margin-top: 32px;
    gap: 10px;
    button {
      margin-right: 16px;
    }
  }
}
</style>