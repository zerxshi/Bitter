<template>
  <div v-if="showSortAndSearch" class="sortAndSearchMenu">
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

<script lang="ts">
export default {
  name: "my-search-menu",
}
</script>

<script setup lang="ts">
import { useStorePosts } from "@/stores/storePosts"
import { useStoreNews } from "@/stores/storeNews"
import useFilter from "@/hooks/useFilter"
import { computed } from "@vue/runtime-core"
import { useRoute } from "vue-router"

const route = useRoute()
const { searchQuery, selectedSort, showSortAndSearch } = useFilter()
const storePosts = useStorePosts()
const storeNews = useStoreNews()

const options = computed<any[]>(() => {
  if (route.path === "/") {
    return storePosts.sortOptionsPosts
  }
  if (route.path === "/news") {
    return storeNews.sortOptionsNews
  }
  return []
})
</script>

<style scoped>
.sortAndSearchMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-self: start;
  padding: 15px;
  border-radius: 10px;
  background-color: #393148;
  height: 150px;
  width: 300px;
}

.searchInput {
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  margin-top: 10px;
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
