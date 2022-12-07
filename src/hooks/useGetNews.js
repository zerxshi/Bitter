import axios from "axios"
import { ref, onMounted } from "vue"

export default function useGetNews(newsLimit) {
  const articles = ref([])
  const page = ref(1)
  const isNewsLoading = ref(true)

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/everything?domains=wsj.com&apiKey=435fc15d4e2a45f78c1732e283078646",
        {
          params: {
            page: page.value,
            pageSize: newsLimit,
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
            pageSize: newsLimit,
          },
        }
      )
      articles.value = [...articles.value, ...response.data.articles]
    } catch (err) {
      console.error(err)
    }
  }

  onMounted(fetchNews)

  return {
    articles,
    isNewsLoading,
    loadMoreNews,
  }
}
