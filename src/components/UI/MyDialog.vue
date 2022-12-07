<template>
  <div class="dialog" v-if="show" @click="$emit('hideDialog', false)">
    <div class="dialogContent" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import toggleMixin from "@/mixins/toggleMixin"

export default {
  name: "my-dialog",
  // mixins: [toggleMixin],
}
</script>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
})
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
