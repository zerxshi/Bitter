<template>
  <div class="profilePage">
    <div class="profile">
      <profile-info />
      <post-list :posts="myPosts" @delete="deletePost" />
      <my-dialog :show="showDialog" @hideDialog="$emit('hideDialog')">
        <post-form @create="createPost" />
      </my-dialog>
      <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
    <trends-and-recs />
  </div>
</template>

<script setup>
import TrendsAndRecs from "@/components/TrendsAndRecs"
import ProfileInfo from "@/components/ProfileInfo.vue"
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"
import useGetPosts from "@/hooks/useGetPosts"
import usePostAction from "@/hooks/usePostAction"
import { computed } from "vue"

const props = defineProps({
  showDialog: {
    type: Boolean,
  },
})

const emit = defineEmits(["hideDialog"])

const { posts, loadMorePosts } = useGetPosts(10)
const { createPost, deletePost } = usePostAction(posts, emit)

const myPosts = computed(() => {
  return [...posts.value].map((post) => ({
    ...post,
    userName: "Arsen",
    user: "zerxshi",
    myPost: true,
  }))
})
</script>

<style>
.profilePage {
  display: flex;
}

.profile {
  width: 750px;
}
</style>
