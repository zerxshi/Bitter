<template>
  <div class="postsPage">
    <div class="postsList">
      <my-dialog>
        <post-form />
      </my-dialog>
      <post-form />
      <post-list :isHomePage="true" />
      <div v-intersection="storePosts.loadMorePosts" class="observer"></div>
    </div>
    <my-search-menu :options="storePosts.sortOptionsPosts" />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList.vue"
import { useStorePosts } from "@/stores/storePosts"

const storePosts = useStorePosts()

onMounted(storePosts.fetchPosts(), storePosts.getPosts(true))
</script>

<style>
.postsPage {
  display: flex;
}

.postsList {
  width: 750px;
}

.appBtns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.postsLoadingText {
  margin-top: 10px;
  color: #fcfdfd;
}

.observer {
  height: 10px;
}
</style>
