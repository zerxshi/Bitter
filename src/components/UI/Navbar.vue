<template>
  <nav class="navbar">
    <div class="navbarBtns">
      <button class="navbarBtn" @click="$router.push('/')">Home</button>
      <button class="navbarBtn" @click="$router.push('/news')">News</button>
      <button class="navbarBtn" @click="$router.push('/profile')">
        Profile
      </button>
      <button class="navbarBtn" @click="$router.push('/')">Settings</button>
      <button class="createPostBtn" @click="$emit('showDialog')">
        Create post
      </button>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
.navbar {
  border-radius: 10px;
  height: 150px;
  justify-self: end;
}

.navbarBtns {
  display: flex;
  flex-direction: column;
}

.navbarBtn {
  margin-top: 15px;
  border: none;
  background-color: transparent;
  color: #fcfdfd;
  font-size: 24px;
  font-weight: bold;
  width: 150px;
  height: 40px;
}

.navbarBtn:hover {
  background-color: #393148;
  border-radius: 50px;
}

.createPostBtn {
  margin-top: 15px;
  border: none;
  border-radius: 50px;
  background-color: #fcfdfd;
  color: #393148;
  font-size: 22px;
  font-weight: bold;
  width: 170px;
  height: 40px;
}
</style>
