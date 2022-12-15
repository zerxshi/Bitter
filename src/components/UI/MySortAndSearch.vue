<template>
  <div class="sortAndSearchMenu">
    <input class="searchInput" placeholder="Search..." v-model="searchQuery" />
    <select class="select" v-model="selectedSort">
      <option disabled value="">Sort by:</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "my-search-menu",
}
</script>

<script setup>
import { useStorePosts } from "@/stores/storePosts"
import useFilter from "@/hooks/useFilter"

const props = defineProps({
  options: {
    type: Array,
    default: () => [],
  },
})

const { searchQuery, selectedSort } = useFilter()

const storePosts = useStorePosts()

// const props = defineProps({
//   selectedSort: String,
//   options: {
//     type: Array,
//     default: () => [],
//   },
//   searchQuery: String,
// })

// const emit = defineEmits(["update:searchQuery", "update:selectedSort"])

// const updateSearchQuery = (event) => {
//   emit("update:searchQuery", event.target.value)
// }
// const changeOption = (event) => {
//   emit("update:selectedSort", event.target.value)
// }
</script>

<style scoped>
.sortAndSearchMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin-left: 15px;
  background-color: #393148;
  height: 150px;
  width: 300px;
}

.searchInput {
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #271a2c;
  color: #fcfdfd;
  font-size: 18px;
  width: 100%;
  margin-bottom: 10px;
}

.select {
  background-color: #fcfdfd;
  color: #393148;
  border-radius: 50px;
  width: 150px;
  height: 40px;
  font-weight: bold;
  text-align: center;
}

option {
  color: #393148;
}
</style>
