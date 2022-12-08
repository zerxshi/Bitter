<template>
  <div class="profileInfo">
    <img
      src="https://pbs.twimg.com/media/FiPTOq5VsAYc2-n?format=jpg"
      alt="profilePic"
      class="profilePic"
    />
    <p class="userName">{{ userName }}</p>
    <p class="userTag">@{{ userTag }}</p>
    <p class="description">Learning Vue 3 + Composition API</p>
    <div class="followersCount">
      <p class="following">135 <small>Following</small></p>
      <p class="following">23 <small>Followers</small></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  userName: {
    type: String,
    required: true,
  },
  userTag: {
    type: String,
    required: true,
  },
})
</script>

<style>
.profileInfo {
  padding: 15px;
  border-radius: 10px;
  background-color: #393148;
  color: #fcfdfd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profilePic {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.userName {
  margin-top: 10px;
}

.userTag {
  color: #9c9aa8;
}

.description {
  margin-top: 10px;
}

.followersCount {
  display: flex;
  margin-top: 10px;
}

.following {
  margin-right: 10px;
}
</style>
