<template>
  <div class="profilePage">
    <div class="profile">
      <div class="profileInfo">
        <img
          src="https://pbs.twimg.com/media/FiPTOq5VsAYc2-n?format=jpg"
          alt="profilePic"
          class="profilePic"
        />
        <p class="userName">Arsen</p>
        <p class="userTag">@zerxshi</p>
        <p class="description">Learning Vue 3 + Composition API</p>
        <div class="followersCount">
          <p class="following">135 <small>Following</small></p>
          <p class="following">23 <small>Followers</small></p>
        </div>
      </div>
      <my-dialog :show="showDialog" @hideDialog="$emit('hideDialog')">
        <post-form @create="createPost" />
      </my-dialog>
      <post-list :posts="myPosts" @delete="deletePost" />
      <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
    <trends-and-recs />
  </div>
</template>

<script setup>
import TrendsAndRecs from "@/components/TrendsAndRecs"
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

.profileInfo {
  padding: 15px;
  border-radius: 10px;
  background-color: #393148;
  color: #fcfdfd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profilePic {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.userName {
  margin-top: 10px;
}

.userTag {
  color: #9c9aa8;
}

.description {
  margin-top: 10px;
}

.followersCount {
  /* align-self: flex-start; */
  display: flex;
  margin-top: 10px;
}

.following {
  margin-right: 10px;
}
</style>
