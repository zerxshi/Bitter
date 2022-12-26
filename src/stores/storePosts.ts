import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"
import useFilter from "@/hooks/useFilter"
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore"
import { db } from "@/js/firebase"
import { useRoute } from "vue-router"

export const useStorePosts = defineStore("storePosts", () => {
  //Get Posts
  let posts = ref<any[]>([])
  let userPosts = ref<any[]>([])
  const users = ref<any[]>([])
  const page = ref<number>(1)
  const postsLimit = ref<number>(10)
  const postsCollectionRef = collection(db, "posts")
  const postsCollectionQuery = query(
    postsCollectionRef,
    orderBy("date", "desc")
  )

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
  const route = useRoute()
  let showDialog = ref<boolean>(false)

  const getPosts = async (homePage: boolean) => {
    onSnapshot(postsCollectionQuery, (querySnapshot) => {
      let firebasePosts = ref<any[]>([])
      querySnapshot.forEach((doc) => {
        if (route.params.user === doc.data().user || homePage) {
          let post = {
            id: doc.id,
            body: doc.data().body,
            myPost: true,
            user: doc.data().user,
            userName: doc.data().userName,
            date: doc.data().date,
          }
          firebasePosts.value.unshift(post)
        }
      })
      userPosts.value = firebasePosts.value
    })
  }

  // interface post {
  //   userName: string
  //   user: string
  //   body: string
  //   myPost: boolean
  //   id?: number
  // }

  let postBody = ref<string>("")

  const createPost = async (): Promise<any> => {
    const date = Date.now().toString()
    // if (post.value.body !== "") {
    //   post.value.id = Date.now()
    //   posts.value.unshift(post.value)
    //   showDialog.value = false
    //   post.value = {
    //     userName: "Arsen",
    //     user: "zerxshi",
    //     body: "",
    //     myPost: true,
    //   }
    // }
    if (postBody.value !== "") {
      await addDoc(postsCollectionRef, {
        body: postBody.value,
        user: "zerxshi",
        userName: "Arsen",
        myPost: true,
        date,
      })
      postBody.value = ""
      showDialog.value = false
    }
  }

  const deletePost = async (idToDelete: number): Promise<any> => {
    // posts.value = posts.value.filter((p) => p.id !== idToDelete)
    // showSpecificPost.value = false
    await deleteDoc(doc(postsCollectionRef, idToDelete.toString()))
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
    userPosts,
    postBody,
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
    getPosts,
    createPost,
    deletePost,
    fetchComments,
  }
})
