import { ref, computed } from "vue"

export default function useFilteredPosts(posts, articles) {
  const searchQuery = ref("")
  const selectedSort = ref("")
  const sortOptions = ref([{ value: "body", name: "content" }])
  const sortOptionsNews = ref([{ value: "content", name: "content" }])

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

  const sortedNews = computed(() => {
    return [...articles.value].sort((artcile1, article2) =>
      artcile1[selectedSort.value]?.localeCompare(article2[selectedSort.value])
    )
  })

  const filteredNews = computed(() => {
    const searchFilter = (article) => {
      return (
        [article.content, article.author]
          .join("")
          .toLowerCase()
          .indexOf(searchQuery.value.toLowerCase()) !== -1
      )
    }
    return sortedNews.value.filter(searchFilter)
  })

  return {
    searchQuery,
    selectedSort,
    sortOptions,
    sortOptionsNews,
    filteredPosts,
    filteredNews,
  }
}
