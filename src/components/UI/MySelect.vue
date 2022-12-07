<template>
  <select class="select" :value="modelValue" @change="changeOption($event)">
    <option disabled value="">Sort by:</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: "my-select",
}
</script>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["update:modelValue"])
const changeOption = (event) => {
  emit("update:modelValue", event.target.value)
}
</script>

<style scoped>
.select {
  background-color: #fcfdfd;
  color: #393148;
  border-radius: 50px;
  width: 150px;
  height: 40px;
  font-weight: bold;
  text-align: center;
}

option {
  color: #393148;
}
</style>
