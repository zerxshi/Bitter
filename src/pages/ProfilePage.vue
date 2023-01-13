<template>
  <div class="profilePage">
    <div class="profile">
      <profile-info />
      <post-list :isMyProfile="storeProfile.isMyProfile" />
      <my-dialog>
        <post-form />
      </my-dialog>
      <div v-intersection="storePosts.loadMorePosts" class="observer"></div>
    </div>
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
}

.profile {
  width: 750px;
}
</style>
