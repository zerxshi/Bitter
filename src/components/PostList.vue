<template>
  <div v-if="posts.length" class="postListPage">
    <transition-group name="postList">
      <post-item
        class="post"
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </transition-group>
  </div>
  <h2 class="noPostsText" v-else>There are no posts yet...</h2>
  <specific-post-page
    v-if="storePosts.showSpecificPost"
    class="specificPostPage"
  />
</template>

<script setup>
import { onMounted } from "vue"
import { useStorePosts } from "@/stores/storePosts"
import PostItem from "@/components/PostItem.vue"
import SpecificPostPage from "@/components/SpecificPostPage.vue"

const props = defineProps({
  posts: {
    type: Array,
    required: true,
  },
})

const storePosts = useStorePosts()

onMounted(storePosts.fetchComments)
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
