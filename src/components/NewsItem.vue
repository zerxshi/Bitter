<template>
  <div class="article">
    <div class="articleAuthor">{{ article.author }}</div>
    <div>{{ article.content }}</div>
    <img class="articleImg" :src="article.urlToImage" alt="newsImage" />
  </div>
</template>

<script setup>
const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.article {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #393148;
  color: #fcfdfd;
}

.articleAuthor {
  font-weight: bold;
  margin-bottom: 10px;
  color: #9c5f64;
  font-size: 18px;
}

.articleImg {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}
</style>
