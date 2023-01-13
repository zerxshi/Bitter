<template>
  <div class="authPage">
    <nav>
      <button
        @click="storeAuth.register = false"
        :class="['authTypeBtn', { activeBtn: !storeAuth.register }]"
      >
        Login
      </button>
      <button
        @click="storeAuth.register = true"
        :class="['authTypeBtn', { activeBtn: storeAuth.register }]"
      >
        Register
      </button>
    </nav>
    <hr />
    <div class="authForm">
      <h1>{{ storeAuth.formTitle }}</h1>
      <form @submit.prevent="storeAuth.onSubmit">
        <div class="field">
          <label>Email</label>
          <input
            v-model="storeAuth.credentials.email"
            class="formInput"
            type="email"
            placeholder="e.g. alexsmith@gmail.com"
          />
        </div>
        <div v-if="storeAuth.register" class="field">
          <label>Login</label>
          <input
            v-model="storeAuth.credentials.login"
            class="formInput"
            type="text"
            placeholder="Enter login..."
            maxlength="15"
          />
        </div>
        <div class="field">
          <label>Password</label>
          <input
            v-model="storeAuth.credentials.password"
            class="formInput"
            type="password"
            placeholder="Enter a password..."
          />
        </div>
        <p v-if="storeAuth.validationError" class="validationError">
          Please enter an email and password!
        </p>
        <p v-if="storeAuth.emailError" class="validationError">
          This email already in use
        </p>
        <button class="submitBtn">{{ storeAuth.formTitle }}</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useStoreAuth } from "@/stores/storeAuth"

const storeAuth = useStoreAuth()
</script>

<style scoped>
.authPage {
  padding: 15px;
  border-radius: 10px;
  background-color: #393148;
  color: #fcfdfd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.authTypeBtn {
  border: none;
  background-color: transparent;
  margin-right: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #271a2c;
}

.authTypeBtn:hover {
  color: #fcfdfd;
}

.activeBtn {
  color: #fcfdfd;
  /* border-bottom: 1px solid #fcfdfd; */
}

hr {
  width: 100%;
  margin-top: 10px;
  color: #9c9aa8;
}

.authForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
}

form {
  display: flex;
  flex-direction: column;
}

.field {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

label {
  font-size: 20px;
}

.formInput {
  border: none;
  padding: 7px;
  border-radius: 5px;
  background-color: #271a2c;
  color: #fcfdfd;
  font-size: 18px;
}

.validationError {
  margin-top: 5px;
  color: #9c5f64;
  font-size: 15px;
  font-weight: bold;
}

.submitBtn {
  align-self: flex-end;
  margin-top: 10px;
  background-color: #fcfdfd;
  color: #393148;
  border: none;
  border-radius: 50px;
  width: 120px;
  height: 35px;
  font-size: 16px;
  font-weight: bold;
}
</style>
