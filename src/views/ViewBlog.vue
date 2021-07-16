<template>
<div id="viewBlog">
    <div class="post-view" v-if="currentBlog && currentBlog[0]">
        <div class="container quillWrapper flex-column">
            <h2 v-if="currentBlog[0].blogTitle">{{ currentBlog[0].blogTitle }}</h2>
            <h4 v-if="currentBlog[0].blogDate">Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
            <img v-if="currentBlog[0].blogCoverPhoto" :src="!/^(http|https):/.test(coverPath) ? require(`../assets/blogCards/${coverPath}.jpg`): coverPath" :alt="currentBlog[0].blogTitle" />
            <div v-if="currentBlog[0].blogHTML" class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
        </div>
    </div> 
    <div v-else class="empty--blog flex-column">
        <h3>Blog is not available. Most likely it got deleted.</h3>
    </div>
</div>

</template>

<script>
import { mapGetters } from 'vuex';
import { sampleCards } from "@/list.json";
export default {
  name: "ViewBlog",
  data() {
    return {
      currentBlog: sampleCards,
    };
  },
  computed: {
      ...mapGetters("blogList", ["getReceivedData"]),
      ...mapGetters("user", {isUserOnline: "getUserState"}),
      coverPath(){
          return this.currentBlog[0].blogCoverPhoto
      }
  },
  watch: {
      getReceivedData(){
          this.getCurrentBlog();
      },
      '$route.params'(){
          window.scrollTo(0,10);
          this.getCurrentBlog();
      }
  },
  methods: {
     async getCurrentBlog(){
         if(this.isUserOnline && this.getReceivedData?.blogs){
            let blog = await this.getReceivedData.blogs?.filter((post) => {
                    return post.blogId === this.$route.params.blogId;
            });
            
            if(blog === []){
              blog = sampleCards.filter((post) => {
                return post.blogId === this.$route.params.blogId;
                });
            }
            this.currentBlog = blog;
         }else{
            this.currentBlog = sampleCards.filter((post) => {
               return post.blogId === this.$route.params.blogId;
            });
         }
      }
  },
  mounted() {
   window.scrollTo(0,10);
   this.getCurrentBlog();
  },
};
</script>

<style lang="scss">
 .post-view {
        padding:25px 10px;
        h4 {
            font-weight: 400;
            font-size: 14px;
            margin-bottom: 24px;
        }
}
#viewBlog{
    .empty--blog{
        margin-top: 30px;
        justify-content: center;
        align-items: center;
    }
}

</style>
