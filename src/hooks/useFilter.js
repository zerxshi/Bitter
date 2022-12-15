import { ref, computed } from "vue"

const searchQuery = ref("")
const selectedSort = ref("")

export default function useFilteredPosts(posts, articles) {
  return {
    searchQuery,
    selectedSort,
  }
}
