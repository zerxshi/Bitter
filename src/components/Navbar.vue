<template>
  <nav class="navbar">
    <div class="navbarBtns">
      <button @click="$router.push('/')" class="navbarBtn">
        <font-awesome-icon icon="fas fa-home" class="icon" />
        <p class="navBtnText">Home</p>
      </button>
      <button @click="$router.push('/news')" class="navbarBtn">
        <font-awesome-icon icon="fa-solid fa-newspaper" class="icon" />
        <p class="navBtnText">News</p>
      </button>
      <button
        @click="$router.push(`/profile/${storeAuth.userData.login}`)"
        class="navbarBtn"
      >
        <font-awesome-icon icon="fa-solid fa-user" class="icon" />
        <p class="navBtnText">Profile</p>
      </button>
      <button @click="$router.push('/settings')" class="navbarBtn">
        <font-awesome-icon icon="fa-solid fa-gear" class="icon" />
        <p class="navBtnText">Settings</p>
      </button>
      <button class="createPostBtn" @click="storePosts.showDialog = true">
        <font-awesome-icon icon="fa-solid fa-pen" class="icon" />
        <p class="navBtnText">Create post</p>
      </button>
      <div v-if="storeAuth.userData.id" class="userInfo">
        <img
          :src="storeAuth.userData.profilePic"
          alt="userPic"
          class="userPic"
        />
        <div class="userTags">
          <p class="userName">{{ storeAuth.userData.email }}</p>
          <p class="userTag">@{{ storeAuth.userData.login }}</p>
        </div>
        <font-awesome-icon
          @click="storeAuth.logoutUser"
          icon="fa-solid fa-right-from-bracket"
          class="signOutIcon"
        />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useStorePosts } from "@/stores/storePosts"
import { useStoreAuth } from "@/stores/storeAuth"

const storePosts = useStorePosts()
const storeAuth = useStoreAuth()
</script>

<style scoped>
.navbar {
  border-radius: 10px;
  height: 150px;
  justify-self: end;
}

.navbarBtns {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.navbarBtn {
  display: flex;
  align-items: center;
  margin-top: 15px;
  border: none;
  background-color: transparent;
  color: #fcfdfd;
  font-size: 24px;
  font-weight: bold;
  width: 170px;
  height: 40px;
}

.navbarBtn:hover {
  background-color: #393148;
  border-radius: 50px;
}

.icon {
  margin-right: 10px;
  padding: 10px;
}

.createPostBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  border: none;
  border-radius: 50px;
  background-color: #fcfdfd;
  color: #393148;
  font-size: 23px;
  font-weight: bold;
  width: 200px;
  height: 40px;
}

.userInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  color: #fcfdfd;
  width: 200px;
  height: 40px;
}

.userPic {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 10px;
}

.userName {
  color: #9c5f64;
  font-weight: bold;
}

.userTag {
  color: #9c9aa8;
}

.signOutIcon {
  cursor: pointer;
  font-size: 26px;
  align-self: flex-end;
}

.signOutIcon:active {
  transform: scale(0.96);
}

@media (max-width: 1300px) {
  .navbarBtn {
    width: 50px;
    height: 50px;
    margin-left: 15px;
  }
  .createPostBtn {
    width: 50px;
    height: 50px;
    margin-left: 15px;
  }
  .navBtnText {
    display: none;
  }
  .userInfo {
    width: 50px;
    height: 50px;
    margin-left: 15px;
  }
  .userTags {
    display: none;
  }
  .userPic {
    display: none;
  }
  .signOutIcon {
    margin-left: 12px;
  }
  .icon {
    margin-right: 0;
  }
}
</style>
