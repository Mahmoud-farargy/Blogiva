<template>
  <div class="home">
    <HomeBlogPosts :post="postItem" v-for="(postItem, index) in fillerPosts" :key="postItem.id" :index="index"/>
    <BlogCardList :isHomeList="true"  />
    <HomeResigterInvitation v-if="!isUserOnline" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeBlogPosts from "@/components/HomeBlogPost/HomeBlogPost";
import BlogCardList from "@/components/BlogCardList/BlogCardList";
import HomeResigterInvitation from "@/components/HomeResigterInvitation/HomeResigterInvitation";
import list from "@/list.json";
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  data(){
    return {
      fillerPosts: list.samplePosts,
    }
  },
  components: {
    HomeBlogPosts,
    BlogCardList,
    HomeResigterInvitation
  },
  computed: {
    ...mapGetters("user", {isUserOnline: "getUserState"})
  }
}
</script>
