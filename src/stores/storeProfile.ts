import { defineStore } from "pinia"
import { ref, computed } from "vue"
import { useStorePosts } from "@/stores/storePosts"
import { useStoreAuth } from "@/stores/storeAuth"
import { useRoute } from "vue-router"

export const useStoreProfile = defineStore("storeProfile", () => {
  const storePosts = useStorePosts()
  const storeAuth = useStoreAuth()
  const route = useRoute()
  let exactUserName = ref("")
  const isMyProfile = computed<Boolean>(() => {
    if (route.params.user == storeAuth.userData.login) {
      return true
    }
    return false
  })

  const findExactUserName = () => {
    exactUserName.value = ""
    storePosts.posts.forEach((post) => {
      if (post.user == route.params.user) {
        exactUserName.value = post.userName
      }
    })
  }

  const userPosts = computed(() => {
    return [...storePosts.posts].map((post) => ({
      ...post,
      userName: exactUserName.value,
      user: route.params.user,
      myPost: true,
    }))
  })

  const showTrendsAndRecs = computed<Boolean>(() => {
    return route.path.includes("profile")
  })

  return {
    exactUserName,
    isMyProfile,
    userPosts,
    showTrendsAndRecs,
    findExactUserName,
  }
})
