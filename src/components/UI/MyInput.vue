<template>
  <input
    :value="modelValue"
    @input="updateInput($event)"
    class="input"
    type="text"
  />
</template>

<script lang="ts">
export default {
  name: "my-input",
}
</script>

<script setup lang="ts">
const props = defineProps({
  modelValue: [String, Number],
})
const emit = defineEmits(["update:modelValue"])
const updateInput = (event: Event): void => {
  emit("update:modelValue", (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
.input {
  border: none;
  padding: 40px 20px;
  border-radius: 10px;
  background-color: #271a2c;
  color: #fcfdfd;
  font-size: 18px;
}
</style>
