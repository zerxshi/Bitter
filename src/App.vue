<template>
  <div class="app">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navbar from "@/components/UI/Navbar"
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
  grid-template-columns: 1fr 1050px 1fr;
  column-gap: 40px;
  justify-content: start;
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
