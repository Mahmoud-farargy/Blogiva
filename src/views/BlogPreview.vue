<template>
  <div class="post-view">
    <div class="container quillWrapper flex-column">
      <h2>{{ getBlogItem.blogTitle }}</h2>
      <img v-if="getBlogItem.blogPhotoFileURL" :src="getBlogItem.blogPhotoFileURL" :alt="getBlogItem.blogTitle" />
      <div class="post-content ql-editor" v-html="getBlogItem.blogHTML"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "PostPreview",
  computed: {
    ...mapGetters("blogList", ["getBlogItem"]),
  },
};
</script>
