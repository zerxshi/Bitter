<template>
  <div v-if="posts.length" class="postListPage">
    <transition-group name="postList">
      <post-item
        class="post"
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @delete="$emit('delete', post)"
        @showPost="showPost(post.id)"
      />
    </transition-group>
  </div>
  <h2 class="noPostsText" v-else>There are no posts. Create the first one!</h2>
  <specific-post-page
    v-if="showSpecificPost"
    :specificPost="specificPost"
    :comments="filteredComments"
    @delete="deleteSpecificPost"
    @hideSpecificPost="showSpecificPost = false"
    class="specificPostPage"
  />
</template>

<script setup>
import PostItem from "@/components/PostItem.vue"
import MyDialog from "./UI/MyDialog.vue"
import SpecificPostPage from "@/pages/SpecificPostPage.vue"
import { onMounted, ref } from "vue"
import axios from "axios"

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(["delete"])

const comments = ref([])
const filteredComments = ref([])
const fetchComments = async () => {
  try {
    const commentsResponse = await axios.get(
      "https://jsonplaceholder.typicode.com/comments"
    )
    comments.value = commentsResponse.data
  } catch (err) {
    console.error(err)
  }
}

let showSpecificPost = ref(false)
let specificPost = ref({})

const showPost = (id) => {
  props.posts.forEach((post) => {
    if (post.id == id) {
      specificPost.value = post
    }
  })
  filteredComments.value = comments.value.filter(
    (comment) => comment.postId == id
  )
  showSpecificPost.value = true
}

const deleteSpecificPost = (specificPost) => {
  emit("delete", specificPost)
  showSpecificPost.value = false
}

onMounted(fetchComments)
</script>

<style scoped>
.postList-item {
  display: inline-block;
  margin-right: 10px;
}

.postList-enter-active,
.postList-leave-active {
  transition: all 0.6s ease;
}

.postList-enter-from,
.postList-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.postList-move {
  transition: transform 0.6s ease;
}

.noPostsText {
  margin-top: 15px;
  margin-left: 15px;
  color: #fcfdfd;
}
</style>
