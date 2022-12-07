import axios from "axios"
import { ref, onMounted, reactive, computed } from "vue"

export default function useGetPosts(postsLimit, necessaryId) {
  const posts = ref([])
  const users = ref([])
  const page = ref(1)
  const isPostsLoading = ref(true)

  const fetchPosts = async () => {
    try {
      const postsResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page.value,
            _limit: postsLimit,
          },
        }
      )
      const usersResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      posts.value = postsResponse.data
      users.value = usersResponse.data
      posts.value.forEach((post, index) => {
        post.user = users.value[index].username
        post.userName = users.value[index].name
      })
    } catch (err) {
      console.error(err)
    } finally {
      isPostsLoading.value = false
    }
  }

  const loadMorePosts = async () => {
    try {
      page.value++
      const postsResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: page.value,
            _limit: postsLimit,
          },
        }
      )
      const usersResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      )
      const additionalPosts = postsResponse.data
      const additionalUsers = usersResponse.data
      additionalPosts.forEach((post, index) => {
        post.user = additionalUsers[index].username
        post.userName = additionalUsers[index].name
      })
      posts.value = [...posts.value, ...additionalPosts]
    } catch (err) {
      console.error(err)
    }
  }

  onMounted(fetchPosts)

  return {
    posts,
    isPostsLoading,
    loadMorePosts,
  }
}
