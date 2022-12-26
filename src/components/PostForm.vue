<template>
  <form class="postForm" @submit.prevent>
    <input
      type="text"
      placeholder="What's happening?"
      class="input"
      v-model="storePosts.postBody"
    />
    <button class="addPostBtn" @click="storePosts.createPost">Publish</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "@vue/reactivity"
import { useStorePosts } from "@/stores/storePosts"

const storePosts = useStorePosts()
</script>

<style scoped>
.postForm {
  display: flex;
  flex-direction: column;
  background-color: #393148;
  padding: 15px;
  border-radius: 10px;
}

.input {
  border: none;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #271a2c;
  color: #fcfdfd;
  font-size: 18px;
}

.addPostBtn {
  align-self: flex-end;
  margin-top: 10px;
  background-color: #fcfdfd;
  color: #393148;
  border: none;
  border-radius: 50px;
  width: 150px;
  height: 40px;
  font-size: 16px;
  font-weight: bold;
}
</style>
