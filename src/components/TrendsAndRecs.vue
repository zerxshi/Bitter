<template>
  <div v-if="storeProfile.showTrendsAndRecs" class="trendsAndRecs">
    <div class="trendsContainer">
      <div class="trends">
        <h2>Trends for you</h2>
        <div class="trend">
          <h3>Tesla</h3>
          <small>30.3K posts</small>
        </div>
        <div class="trend">
          <h3>#ComicCon2022</h3>
          <small>13K posts</small>
        </div>
        <div class="trend">
          <h3>JS courses</h3>
          <small>3.2K posts</small>
        </div>
        <div class="trend">
          <h3>#HumanArtists</h3>
          <small>45.2K posts</small>
        </div>
      </div>
      <div class="recommendations">
        <h2>Who to follow</h2>
        <div class="profileRec">
          <div class="user">
            <h3>Elon Musk</h3>
            <small>@elonmusk</small>
          </div>
          <button class="followBtn">Follow</button>
        </div>
        <div class="profileRec">
          <div class="user">
            <h3>Wes Bos</h3>
            <small>@wesbos</small>
          </div>
          <button class="followBtn">Follow</button>
        </div>
        <div class="profileRec">
          <div class="user">
            <h3>Bob Ros</h3>
            <small>@bobart</small>
          </div>
          <button class="followBtn">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStoreProfile } from "@/stores/storeProfile"

const storeProfile = useStoreProfile()
</script>

<style>
.trends,
.recommendations {
  width: 300px;
  padding: 15px;
  border-radius: 10px;
  background-color: #393148;
  color: #fcfdfd;
}

.trend,
.recommendations,
.profileRec {
  margin-top: 15px;
}

.profileRec {
  display: flex;
  justify-content: space-between;
}

.followBtn {
  background-color: #fcfdfd;
  color: #393148;
  font-weight: bold;
  border: none;
  border-radius: 50px;
  width: 85px;
  height: 30px;
}
</style>
