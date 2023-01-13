<template>
  <div class="app">
    <navbar></navbar>
    <router-view></router-view>
    <my-sort-and-search />
    <trends-and-recs />
  </div>
</template>

<script setup>
import { onMounted } from "@vue/runtime-core"
import { useStoreAuth } from "@/stores/storeAuth"
import Navbar from "@/components/Navbar.vue"
import MySortAndSearch from "@/components/UI/MySortAndSearch.vue"
import TrendsAndRecs from "@/components/TrendsAndRecs"

const storeAuth = useStoreAuth()

onMounted(storeAuth.init)
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", sans-serif;
}

body {
  background-color: #271a2c;
}

.app {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 30px;
}

button {
  cursor: pointer;
}

button:active {
  transform: scale(0.96);
}

button:disabled {
  cursor: auto;
}
</style>
