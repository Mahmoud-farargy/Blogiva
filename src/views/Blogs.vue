<template>
  <div id="blogs">
     <BlogCardList :isHomeList="false"  />
  </div>
</template>

<script>
import BlogCardList from "@/components/BlogCardList/BlogCardList";
export default {
  name: "Blogs",
  components: {
     BlogCardList
  }
}
</script>

<style lang="scss" scoped>
 #blogs{
   width:100%;
   height: 100%;
 }
</style>
