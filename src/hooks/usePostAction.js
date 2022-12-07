import { ref } from "vue"

export default function usePostAction(posts, emit) {
  const createPost = (post) => {
    posts.value.unshift(post)
    emit("hideDialog")
  }

  const deletePost = (post) => {
    posts.value = posts.value.filter((p) => p.id !== post.id)
  }

  return {
    createPost,
    deletePost,
  }
}
