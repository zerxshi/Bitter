import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useStorePosts } from "@/stores/storePosts"
import { useRoute } from "vue-router"

export const useStoreProfile = defineStore("storeProfile", () => {
  const storePosts = useStorePosts()
  const route = useRoute()
  let exactUserName = ref("")

  const findExactUserName = () => {
    storePosts.posts.forEach((post) => {
      if (post.user == route.params.user) {
        exactUserName.value = post.userName
      }
    })
  }

  const userPosts = computed(() => {
    return [...storePosts.posts].map((post) => ({
      ...post,
      userName: exactUserName.value ? exactUserName.value : "Arsen",
      user: route.params.user,
      myPost: true,
    }))
  })

  return {
    exactUserName,
    userPosts,
    findExactUserName,
  }
})
