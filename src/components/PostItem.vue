<template>
  <div class="post" @click="storePosts.showPost(post.id)">
    <div class="hoverMenu" v-if="!storePosts.isSpecificPost && post.myPost">
      <i class="uil uil-ellipsis-h" onClick="showMenu(this)"></i>
      <ul class="menu">
        <li @click.stop="storePosts.deletePost(post.id)">
          <i class="uil uil-trash"></i>Delete
        </li>
      </ul>
    </div>
    <span class="postInfo">
      <p class="postAuthor" @click.stop="$router.push(`/profile/${post.user}`)">
        {{ post.userName }}
      </p>
      <small>&nbsp;@{{ post.user }}</small>
      <small v-if="post.date">&nbsp;· {{ formattedDate }}</small>
    </span>
    <p @click.stop="checkMouseAction">{{ post.body }}</p>
  </div>
</template>

<script setup lang="ts">
import { useStorePosts } from "@/stores/storePosts"
import { useRouter } from "vue-router"
import { useDateFormat } from "@vueuse/core"
import { computed } from "@vue/runtime-core"

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})

const storePosts = useStorePosts()
const router = useRouter()

const formattedDate = computed<any>(() => {
  let date = new Date(parseInt(props.post.date))
  let formatted = useDateFormat(date, "DD MMM, YYYY")
  return formatted.value
})

const checkMouseAction = (event: Event): void => {
  const isTextHighlighting = window.getSelection()!.toString().trim() !== ""
  if (
    (event.target as HTMLInputElement).classList.contains("postAuthor") &&
    !isTextHighlighting
  ) {
    ;(event.target as HTMLInputElement).parentElement!.click()
    router.push(`/profile/${props.post.user}`)
  }
  if (!isTextHighlighting) {
    ;(event.target as HTMLInputElement).parentElement!.click()
  }
}
</script>

<style>
.post {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #393148;
  color: #fcfdfd;
}

.postInfo {
  font-weight: bold;
  margin-bottom: 10px;
  color: #9c5f64;
  font-size: 18px;
  width: max-content;
  display: flex;
}

.postAuthor:hover {
  cursor: pointer;
  text-decoration: underline;
}

small {
  color: #9c9aa8;
}

.uil-ellipsis-h {
  position: absolute;
  right: -10px;
  top: -18px;
  color: #fcfdfd;
  font-size: 20px;
}

.hoverMenu {
  position: relative;
}

.menu {
  position: absolute;
  padding: 0 5px;
  margin-top: 4px;
  right: -15px;
  transform: scale(0);
  transition: transform 0.2s ease;
  transform-origin: top right;
  border-radius: 10px;
  cursor: pointer;
  background-color: #393148;
}

.menu li {
  cursor: pointer;
  color: #fcfdfd;
  padding: 3px;
  margin-bottom: 1px;
  border-radius: 5px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.menu li:hover {
  box-shadow: 0 0 3px #fcfdfd;
  border-radius: 5px;
}

.hoverMenu:hover .menu {
  transform: scale(1);
}
</style>
