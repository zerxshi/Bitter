<template>
  <div class="postsPage">
    <div class="postsList">
      <!--<div class="appBtns">
        <my-button class="createPostBtn" @click="dialogVisible = true"
        >Создать пост</my-button
        <my-select v-model="selectedSort" :options="sortOptions" />
      </div>-->
      <my-dialog :show="showDialog" @hideDialog="$emit('hideDialog')">
        <post-form @create="createPost" />
      </my-dialog>
      <post-form @create="createPost" />
      <post-list @delete="deletePost" :posts="filteredPosts" />
      <!-- <h2 class="postsLoadingText">Posts loading in progress...</h2> -->
      <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
    <my-search-menu
      v-model:selectedSort="selectedSort"
      v-model:searchQuery="searchQuery"
      :options="sortOptions"
    />
  </div>
</template>

<script setup>
import PostForm from "@/components/PostForm"
import PostList from "@/components/PostList.vue"
import useGetPosts from "@/hooks/useGetPosts"
import usePostAction from "@/hooks/usePostAction"
import useFilter from "@/hooks/useFilter"

const props = defineProps({
  showDialog: {
    type: Boolean,
  },
})

const emit = defineEmits(["hideDialog"])

const { posts, isPostsLoading, loadMorePosts } = useGetPosts(10)
const { createPost, deletePost } = usePostAction(posts, emit)
const { searchQuery, selectedSort, sortOptions, filteredPosts } =
  useFilter(posts)
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
