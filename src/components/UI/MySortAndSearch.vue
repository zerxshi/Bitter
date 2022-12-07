<template>
  <div class="sortAndSearchMenu">
    <input
      class="searchInput"
      placeholder="Search..."
      :value="searchQuery"
      @input="updateSearchQuery($event)"
    />
    <select class="select" :value="selectedSort" @change="changeOption($event)">
      <option disabled value="">Sort by:</option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "my-search-menu",
  methods: {
    updateSearchQuery(event) {
      this.$emit("update:searchQuery", event.target.value)
    },
    changeOption(event) {
      this.$emit("update:selectedSort", event.target.value)
    },
  },
}
</script>

<script setup>
const props = defineProps({
  selectedSort: String,
  options: {
    type: Array,
    default: () => [],
  },
  searchQuery: String,
})

const emit = defineEmits(["update:searchQuery", "update:selectedSort"])

const updateSearchQuery = (event) => {
  emit("update:searchQuery", event.target.value)
}
const changeOption = (event) => {
  emit("update:selectedSort", event.target.value)
}
</script>

<style scoped>
.sortAndSearchMenu {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  margin-left: 15px;
  background-color: #393148;
  height: 150px;
  width: 300px;
}

.searchInput {
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #271a2c;
  color: #fcfdfd;
  font-size: 18px;
  width: 100%;
  margin-bottom: 10px;
}

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
