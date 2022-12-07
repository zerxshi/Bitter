<template>
  <div v-if="articles.length">
    <transition-group name="newsList">
      <news-item
        v-for="article in articles"
        :key="article.url"
        :article="article"
      />
    </transition-group>
  </div>
  <h2 class="noNewsText" v-else>No news</h2>
</template>

<script setup>
import NewsItem from "@/components/NewsItem.vue"

const props = defineProps({
  articles: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped>
.newsList-item {
  display: inline-block;
  margin-right: 10px;
}

.newsList-enter-active,
.newsList-leave-active {
  transition: all 0.6s ease;
}

.newsList-enter-from,
.newsList-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.newsList-move {
  transition: transform 0.6s ease;
}

.noNewsText {
  margin-top: 15px;
  margin-left: 15px;
  color: #fcfdfd;
}
</style>
