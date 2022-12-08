<template>
  <div class="profilePage">
    <div class="profile">
      <profile-info
        :userName="exactUserName ? exactUserName : 'Arsen'"
        :userTag="$route.params.user"
      />
      <post-list :posts="userPosts" @delete="deletePost" />
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
import { ref, computed, onMounted } from "vue"
import { useRoute } from "vue-router"

const props = defineProps({
  showDialog: {
    type: Boolean,
  },
})
const emit = defineEmits(["hideDialog"])
const route = useRoute()

const { posts, loadMorePosts } = useGetPosts(10)
const { createPost, deletePost } = usePostAction(posts, emit)

let exactUserName = ref("")

const user = ref({
  userName: exactUserName.value ? exactUserName.value : "Arsen",
  userTag: route.params.user,
})

const findExactUserName = () => {
  posts.value.forEach((post) => {
    if (post.user == route.params.user) {
      exactUserName.value = post.userName
    }
  })
}

const userPosts = computed(() => {
  return [...posts.value].map((post) => ({
    ...post,
    userName: exactUserName.value ? exactUserName.value : "Arsen",
    user: route.params.user,
    myPost: true,
  }))
})

onMounted(findExactUserName)
</script>

<style>
.profilePage {
  display: flex;
}

.profile {
  width: 750px;
}
</style>
