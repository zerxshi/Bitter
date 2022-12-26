<template>
  <div class="profilePage">
    <div class="profile">
      <profile-info />
      <post-list />
      <my-dialog>
        <post-form />
      </my-dialog>
      <div v-intersection="storePosts.loadMorePosts" class="observer"></div>
    </div>
    <trends-and-recs />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useStoreProfile } from "@/stores/storeProfile"
import { useStorePosts } from "@/stores/storePosts"
import TrendsAndRecs from "@/components/TrendsAndRecs"
import ProfileInfo from "@/components/ProfileInfo.vue"
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"

const storeProfile = useStoreProfile()
const storePosts = useStorePosts()

onMounted(storePosts.getPosts)
</script>

<style>
.profilePage {
  display: flex;
}

.profile {
  width: 750px;
}
</style>
