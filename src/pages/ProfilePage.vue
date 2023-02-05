<template>
  <div class="profilePage">
    <profile-info />
    <post-list :isMyProfile="storeProfile.isMyProfile" />
    <my-dialog>
      <post-form />
    </my-dialog>
    <div v-intersection="storePosts.loadMorePosts" class="observer"></div>
  </div>
</template>

<script setup>
import { useStoreProfile } from "@/stores/storeProfile"
import { useStorePosts } from "@/stores/storePosts"
import TrendsAndRecs from "@/components/TrendsAndRecs"
import ProfileInfo from "@/components/ProfileInfo.vue"
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"
import { onMounted } from "@vue/runtime-core"

const storeProfile = useStoreProfile()
const storePosts = useStorePosts()
</script>

<style>
.profilePage {
  display: flex;
  flex-direction: column;
  max-width: 750px;
}

@media (max-width: 1200px) {
  .profilePage {
    min-width: 362px;
  }
}
</style>
