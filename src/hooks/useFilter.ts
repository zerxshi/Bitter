import { ref } from "vue"

const searchQuery = ref<string>("")
const selectedSort = ref<string>("")

export default function useFilter() {
  return {
    searchQuery,
    selectedSort,
  }
}
