<template>
  <div
    class="dialog"
    v-if="storePosts.showDialog"
    @click="storePosts.showDialog = false"
  >
    <div class="dialogContent" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "my-dialog",
}
</script>

<script setup lang="ts">
import { useStorePosts } from "@/stores/storePosts"

const storePosts = useStorePosts()
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialogContent {
  margin: auto;
  background: #393148;
  border-radius: 10px;
  width: 500px;
  height: 200px;
  padding: 20px;
}
</style>
