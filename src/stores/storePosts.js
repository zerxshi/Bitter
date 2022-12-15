import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"
import useFilter from "@/hooks/useFilter"

export const useStorePosts = defineStore("storePosts", () => {
  //Get Posts
  const posts = ref([])
  const users = ref([])
  const page = ref(1)
  const postsLimit = ref(10)

  const fetchPosts = async () => {
    if (!posts.value.length) {
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
      }
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

  //Post Actions
  const deletePost = (post) => {
    posts.value = posts.value.filter((p) => p.id !== post.id)
    showSpecificPost.value = false
  }

  //Filter Posts
  const { searchQuery, selectedSort } = useFilter()
  const sortOptionsPosts = ref([{ value: "body", name: "content" }])

  const sortedPosts = computed(() => {
    return [...posts.value].sort((post1, post2) =>
      post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    )
  })

  const filteredPosts = computed(() => {
    const searchFilter = (post) => {
      return (
        [post.body, post.userName, post.user]
          .join("")
          .toLowerCase()
          .indexOf(searchQuery.value.toLowerCase()) !== -1
      )
    }
    return sortedPosts.value.filter(searchFilter)
  })

  //Specific post
  const comments = ref([])

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
  let isSpecificPost = ref(false)
  let specificPost = ref({})
  const filteredComments = ref([])

  const showPost = (id) => {
    if (!isSpecificPost.value) {
      posts.value.forEach((post) => {
        if (post.id == id) {
          specificPost.value = post
        }
      })
      filteredComments.value = comments.value.filter(
        (comment) => comment.postId == id
      )
      showSpecificPost.value = true
    }
  }

  return {
    posts,
    searchQuery,
    selectedSort,
    sortOptionsPosts,
    filteredPosts,
    specificPost,
    filteredComments,
    showSpecificPost,
    isSpecificPost,
    showPost,
    fetchPosts,
    loadMorePosts,
    deletePost,
    fetchComments,
  }
})
