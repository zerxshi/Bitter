<template>
  <div class="pageWrapper">
    <button
      v-for="pageNumber in totalPages"
      :key="pageNumber"
      :class="[
        'page',
        {
          currentPage: page === pageNumber,
        },
      ]"
      @click="$emit('pageChanged', pageNumber)"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>

<script lang="ts">
export default {
  name: "my-pagination",
}
</script>

<script setup lang="ts">
const props = defineProps({
  totalPages: {
    type: Number,
    required: true,
  },
  page: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.pageWrapper {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.page {
  border: 3px solid #393148;
  border-radius: 50%;
  background-color: transparent;
  width: 40px;
  height: 40px;
  color: #fcfdfd;
  text-align: center;
  margin: 3px;
}

.currentPage {
  background-color: #393148;
}
</style>
