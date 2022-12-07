<template>
  <div class="newsPage">
    <div class="newsList">
      <news-list :articles="filteredNews" v-if="!isNewsLoading" />
      <h2 class="newsLoadingText" v-else>News loading in progress...</h2>
      <div v-intersection="loadMoreNews" class="observer"></div>
    </div>
    <my-search-menu
      v-model:selectedSort="selectedSort"
      v-model:searchQuery="searchQuery"
      :options="sortOptionsNews"
    />
  </div>
</template>

<script setup>
import NewsList from "@/components/NewsList.vue"
import MySortAndSearch from "@/components/UI/MySortAndSearch.vue"
import useGetNews from "@/hooks/useGetNews"
import useFilter from "@/hooks/useFilter"

const { articles, isNewsLoading, loadMoreNews } = useGetNews(10)
const { searchQuery, selectedSort, sortOptionsNews, filteredNews } = useFilter(
  undefined,
  articles
)
</script>

<style scoped>
.newsPage {
  display: flex;
}

.newsList {
  width: 750px;
}

.newsLoadingText {
  margin-top: 10px;
  color: #fcfdfd;
}

.observer {
  height: 10px;
}
</style>
