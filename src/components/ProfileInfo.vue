<template>
  <div class="profileInfo">
    <img
      :src="storeAuth.userData.profilePic"
      alt="profilePic"
      class="profilePic"
    />
    <p class="userName">
      {{
        storeProfile.exactUserName
          ? storeProfile.exactUserName
          : storeAuth.userData.email
      }}
    </p>
    <p class="userTag">@{{ $route.params.user }}</p>
    <p class="description">Hardcoded description</p>
    <div class="followersCount">
      <p class="following">135 <small>Following</small></p>
      <p class="following">23 <small>Followers</small></p>
    </div>
  </div>
</template>

<script setup>
import { useStoreProfile } from "@/stores/storeProfile"
import { useStoreAuth } from "@/stores/storeAuth"
import { computed, onMounted } from "@vue/runtime-core"

const storeProfile = useStoreProfile()
const storeAuth = useStoreAuth()

onMounted(storeProfile.findExactUserName)
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
