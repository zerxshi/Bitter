<template>
  <div class="newsPage">
    <div class="newsList">
      <my-dialog>
        <post-form />
      </my-dialog>
      <news-list
        :articles="storeNews.filteredNews"
        v-if="!storeNews.isNewsLoading"
      />
      <h2 class="newsLoadingText" v-else>News loading in progress...</h2>
      <div v-intersection="storeNews.loadMoreNews" class="observer"></div>
    </div>
    <!-- <my-search-menu :options="storeNews.sortOptionsNews" /> -->
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"
import { useStoreNews } from "@/stores/storeNews"
import NewsList from "@/components/NewsList.vue"
import MySortAndSearch from "@/components/UI/MySortAndSearch.vue"
import PostForm from "@/components/PostForm"

const storeNews = useStoreNews()

onMounted(storeNews.fetchNews)
</script>

<style scoped>
.newsPage {
  display: flex;
  max-width: 750px;
}

.newsLoadingText {
  margin-top: 10px;
  color: #fcfdfd;
}

.observer {
  height: 10px;
}

@media (max-width: 1200px) {
  .newsPage {
    min-width: 362px;
  }
}
</style>
