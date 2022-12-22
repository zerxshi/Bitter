import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"
import useFilter from "@/hooks/useFilter"

export const useStorePosts = defineStore("storePosts", () => {
  //Get Posts
  const posts = ref<any[]>([])
  const users = ref<any[]>([])
  const page = ref<number>(1)
  const postsLimit = ref<number>(10)

  const fetchPosts = async (): Promise<any> => {
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
        posts.value.forEach((post: any, index) => {
          post.user = users.value[index].username
          post.userName = users.value[index].name
        })
      } catch (err) {
        console.error(err)
      }
    }
  }

  const loadMorePosts = async (): Promise<any> => {
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
      additionalPosts.forEach((post: any, index: number) => {
        post.user = additionalUsers[index].username
        post.userName = additionalUsers[index].name
      })
      posts.value = [...posts.value, ...additionalPosts]
    } catch (err) {
      console.error(err)
    }
  }

  //Post Actions
  const showDialog = ref<boolean>(false)

  const deletePost = (post: any): void => {
    posts.value = posts.value.filter((p) => p.id !== post.id)
    showSpecificPost.value = false
  }

  //Filter Posts
  const { searchQuery, selectedSort } = useFilter()
  const sortOptionsPosts = ref<any[]>([{ value: "body", name: "content" }])

  const sortedPosts = computed<any[]>(() => {
    return [...posts.value].sort((post1, post2) =>
      post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    )
  })

  const filteredPosts = computed<any[]>(() => {
    const searchFilter = (post: any) => {
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
  const comments = ref<any[]>([])

  const fetchComments = async (): Promise<any> => {
    try {
      const commentsResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/comments"
      )
      comments.value = commentsResponse.data
    } catch (err) {
      console.error(err)
    }
  }

  let showSpecificPost = ref<boolean>(false)
  let isSpecificPost = ref<boolean>(false)
  let specificPost = ref<object>({})
  const filteredComments = ref<any[]>([])

  const showPost = (id: number): void => {
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
    showDialog,
    showPost,
    fetchPosts,
    loadMorePosts,
    deletePost,
    fetchComments,
  }
})
