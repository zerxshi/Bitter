<template>
  <div class="settingsPage">
    <div class="formCard">
      <h2>Change login</h2>
      <form @submit.prevent class="changeForm">
        <input
          v-model="storeSettings.loginInput"
          class="changeInput"
          placeholder="Enter new login"
          type="text"
        />
        <button @click="storeSettings.updateLogin" class="formBtn">Save</button>
      </form>
      <h2>Change profile picture</h2>
      <form @submit.prevent class="changeForm">
        <input
          v-model="storeSettings.pictureInput"
          class="changeInput"
          placeholder="Enter picture URL"
          type="text"
        />
        <button @click="storeSettings.updatePicture" class="formBtn">
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStoreSettings } from "@/stores/storeSettings"

const storeSettings = useStoreSettings()
</script>

<style scoped>
.settingsPage {
  max-width: 750px;
}

.formCard {
  background-color: #393148;
  padding: 15px;
  border-radius: 10px;
  color: #fcfdfd;
}

.changeForm {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  width: 70%;
}

.changeInput {
  margin-top: 10px;
  border: none;
  padding: 7px;
  border-radius: 10px;
  background-color: #271a2c;
  color: #fcfdfd;
  font-size: 18px;
}

.formBtn {
  align-self: flex-end;
  margin-top: 10px;
  background-color: #fcfdfd;
  color: #393148;
  border: none;
  border-radius: 50px;
  width: 90px;
  height: 30px;
  font-size: 16px;
  font-weight: bold;
}

@media (max-width: 1200px) {
  .settingsPage {
    min-width: 362px;
  }
}
</style>
