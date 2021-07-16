<template>
  <section class="blog--card--wrap">
    <div class="container">
    <div>
           <h3 v-if="isHomeList">View More Recent Blogs</h3>
           <div v-else-if="isUserOnline && !isHomeList && getBlogs && getBlogs.length >0" class="toggle--edit">
               <span>Edit Posts</span>
               <input type="checkbox" v-model="allowEditing" />
           </div>
    </div>
   
      <ul v-if="cardList.length > 0" class="blog--cards flex-row">
        <BlogCardItem :allowEditing="allowEditing" :isHomeList="isHomeList" :postItem="postItem" v-for="(postItem, index) in cardList" :key="postItem.blogId" :index="index" />
      </ul>
      <div v-else class="flex-column empty-blogs">
          <span>No blogs available. You can add some.</span>
          <button v-if="isUserOnline && cardList.length <= 0" :disabled="!isUserOnline" class="router-button" @click="directToCreatePost">
              Create a post
          </button>
      </div>
    </div>
  </section>
</template>

<script>
import BlogCardItem from "./BlogCardItem/BlogCardItem";
import list from "../../list.json";
import { mapGetters } from 'vuex';
import { routeNames } from "@/Consts";
export default {
    name: "BlogCardList",
    props: {
        "isHomeList" : Boolean
    },
    data() {
        return {
            cardList: list?.sampleCards,
            allowEditing: false,
            routeNames
        }
    },
    computed: {
        ...mapGetters("user", {isUserOnline: "getUserState"}),
        ...mapGetters("blogList", ["getReceivedData"]),
        getBlogs(){
           return this.getReceivedData?.blogs;
        }
    },
    methods: {
        updateData(){
            const blogList = this.getBlogs;
            if(this.isUserOnline && this.getReceivedData && blogList ){
                this.cardList = blogList;
            }
        },
        directToCreatePost(){
            this.$router.push({name: routeNames.createPost});
        }
    },
    watch: {
        getBlogs() {
          this.updateData();
        },
        isUserOnline(){
            this.updateData();
        },
        getReceivedData(){
            this.updateData();
        }
    },
    components: {
        BlogCardItem
    },
    mounted(){
        this.updateData();
    },
    beforeDestroy(){
        this.allowEditing = false;
    }
};
</script>

<style lang="scss" scoped>
.blog--card--wrap{
    .empty-blogs{
        min-height: 300px;
        justify-content: center;
        align-items:center;
        text-align: center;
    }
    .container{
            position: relative;
             padding-left: 25px;
             padding-right: 25px;
             @media only screen and (max-width: 700px) {
                padding-left: 0;
                padding-right: 0;
             }
            .blog--cards{
                list-style: none;
            }
            h3{
                font-weight: 200;
                font-size: 28px;
                margin-bottom: 32px;
            }
            .toggle--edit {
                display: flex;
                align-items: center;
                position: absolute;
                top: -70px;
                right: 5px;
                cursor: pointer;
                
                span {
                margin-right: 16px;
                }

                input[type="checkbox"] {
                position: relative;
                border: none;
                -webkit-appearance: none;
                background: #fff;
                outline: none;
                width: 80px;
                height: 30px;
                border-radius: 20px;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                input[type="checkbox"]:before {
                content: "";
                position: absolute;
                width: 30px;
                height: 30px;
                border-radius: 20px;
                top: 0;
                left: 0;
                background: #303030;
                transform: scale(1.1);
                transition: 750ms ease all;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }

                input:checked[type="checkbox"]:before {
                background: rgb(74, 180, 122);
                left: 52px;
                }
            }
    }


}
</style>