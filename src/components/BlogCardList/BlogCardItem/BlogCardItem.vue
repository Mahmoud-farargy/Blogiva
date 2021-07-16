<template>
  <li id="blogCardItem">
    <article class="blog--card--inner flex-column">
      <div v-if="allowEditing && !isHomeList" class="icons flex-row">
        <span @click="updateBlog" class="icon">
          <Edit class="edit" />
        </span>
        <span class="icon" @click="deleteBlog">
          <Delete  class="delete" />
        </span>
      </div>
      <img
        v-if="postItem && coverPath"
        :src="!/^(http|https):/.test(coverPath) ? require(`../../../assets/blogCards/${coverPath}.jpg`): coverPath"
        :alt="postItem.postTitle"
      />
     
      <div class="info flex-column">
        <div class="blog--title" v-if="postItem && postItem.blogTitle ">{{ postItem.blogTitle }}</div>
        <small v-if="postItem && postItem.blogDate">Posted on: {{ new Date(Number(postItem.blogDate)).toLocaleString("en-us", {dateStyle: 'long'})  }}</small>
        <router-link class="link" :to="{name: routeNames.viewPost, params: {blogId: postItem.blogId}}">
          View The Post <Arrow class="arrow" />
        </router-link>
      </div>
    </article>
  </li>
</template>

<script>
import Arrow from "../../../assets/Icons/arrow-right-light.svg";
import Edit from "../../../assets/Icons/edit-regular.svg";
import Delete from "../../../assets/Icons/trash-regular.svg";
import { routeNames } from "@/Consts";
import { deletePost } from "@/utilities";
export default {
  name: "BlogCardItem",
  props: [
    "postItem",
    "index",
    "allowEditing",
    "isHomeList"
    ],
  data() {
      return {
        isAnHTTPPhotoURL: false,
        routeNames
      }
  },
  components: {
    Arrow,
    Edit,
    Delete,
  },
  computed: {
    coverPath(){
        return this.postItem?.blogCoverPhoto;
    },
  },
  methods: {
    deleteBlog(){
       this.postItem && this.postItem.blogId && deletePost(this.postItem.blogId);
    },
    updateBlog(){
       this.postItem && this.postItem.blogId && this.$router.push({name: routeNames.updatePost, params: {blogId: this.postItem.blogId}}) ;
    }
  },
};
</script>

<style lang="scss" scoped>
#blogCardItem {
  .blog--card--inner {
    height: 100%;
    position: relative;
    cursor: pointer;
    border-radius: 8px;
    background-color: var(--white);
    height: 450px;
    transition: 0.5s ease all;

    &:hover {
      transform: rotateZ(-1deg) scale(1.01);
      box-shadow: var(--slight-shadow);
    }
    .icons {
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 60;
      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: var(--white);
        transition: var(--mild-trans);

        &:hover {
          background: var(--primary-clr);

          .edit,
          .delete {
            path {
              fill: var(--white);
            }
          }
        }

        &:nth-child(1) {
          margin-right: 8px;
        }
        &:last-of-type {
          margin-right: 0;
        }
        .edit,
        .delete {
          pointer-events: none;
          height: 15px;
          width: auto;
        }
      }
    }
    .blog--title{
      font-size: 18px;
      font-weight: 600;
      text-transform: capitalize;
    }
    img{
      display: block;
      border-radius: 8px 8px 0 0;
      z-index: 1;
      width: 100%;
      object-fit: cover;
      min-height: 250px;
    }
    .info{
      height: 100%;
      z-index: 3;
      padding: 32px 16px;
      color: var(--black);

      h4{
        padding-bottom: 8px;
        font-size: 20px;
        font-weight: 300;
      }

      small{
        font-weight: 300;
        font-size: 12px;
        margin-top:6px;
        padding-bottom: 16px;
      }

      .link{
        display: inline-flex;
        align-items: center;
        font-weight: 600;
        margin-top: auto;
        padding-top: 20px;
        font-size: 12px;
        padding-bottom: 4px;
        transition: var(--mild-trans);

        &:hover{
          color: rgba(48,48,48, 0.8);
          transform: scale(1.01);
        }

        .arrow {
          width: 10px;
        }
      }
    }

  }

}
</style>