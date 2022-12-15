import { defineStore } from "pinia"
import { ref, computed } from "vue"
import axios from "axios"
import useFilter from "@/hooks/useFilter"

export const useStoreNews = defineStore("storeNews", () => {
  //Get News
  const articles = ref([])
  const page = ref(1)
  const newsLimit = ref(10)
  const isNewsLoading = ref(true)

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=435fc15d4e2a45f78c1732e283078646",
        {
          params: {
            page: page.value,
            pageSize: newsLimit.value,
          },
        }
      )
      articles.value = response.data.articles
    } catch (err) {
      console.error(err)
    } finally {
      isNewsLoading.value = false
    }
  }

  const loadMoreNews = async () => {
    try {
      page.value++
      const response = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=435fc15d4e2a45f78c1732e283078646",
        {
          params: {
            page: page.value,
            pageSize: newsLimit.value,
          },
        }
      )
      articles.value = [...articles.value, ...response.data.articles]
    } catch (err) {
      console.error(err)
    }
  }

  //Filter News
  const { searchQuery, selectedSort } = useFilter()
  const sortOptionsNews = ref([{ value: "content", name: "content" }])

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
    isNewsLoading,
    searchQuery,
    selectedSort,
    filteredNews,
    sortOptionsNews,
    fetchNews,
    loadMoreNews,
  }
})
