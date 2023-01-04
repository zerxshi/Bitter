import { ref, computed } from "vue"
import { useRoute } from "vue-router"

const searchQuery = ref<string>("")
const selectedSort = ref<string>("")

export default function useFilter() {
  const route = useRoute()
  const showSortAndSearch = computed<Boolean>(() => {
    if (route.path === "/" || route.path === "/news") {
      return true
    }
    return false
  })

  return {
    searchQuery,
    selectedSort,
    showSortAndSearch,
  }
}
