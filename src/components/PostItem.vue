<template>
  <div class="post">
    <div class="hoverMenu">
      <i class="uil uil-ellipsis-h" onClick="showMenu(this)"></i>
      <ul class="menu">
        <li @click="$emit('delete', post)" v-if="post.myPost">
          <i class="uil uil-trash"></i>Delete
        </li>
        <!-- <li @click.stop="$router.push(`/posts/${post.id}`)">Open</li> -->
        <li @click="$emit('showPost')">Open</li>
      </ul>
    </div>
    <div class="postAuthor">
      {{ post.userName }} <small>@{{ post.user }}</small>
    </div>
    <div>{{ post.body }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<style>
.post {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #393148;
  color: #fcfdfd;
}

.postAuthor {
  font-weight: bold;
  margin-bottom: 10px;
  color: #9c5f64;
  font-size: 18px;
}

small {
  color: #9c9aa8;
}

.uil-ellipsis-h {
  position: absolute;
  right: -10px;
  top: -18px;
  color: #fcfdfd;
  font-size: 20px;
}

.hoverMenu {
  position: relative;
}

.menu {
  position: absolute;
  padding: 0 5px;
  margin-top: 4px;
  right: -15px;
  transform: scale(0);
  transition: transform 0.2s ease;
  transform-origin: top right;
  border-radius: 10px;
  cursor: pointer;
  background-color: #393148;
}

.menu li {
  cursor: pointer;
  color: #fcfdfd;
  padding: 3px;
  margin-bottom: 1px;
  border-radius: 5px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.menu li:hover {
  box-shadow: 0 0 3px #fcfdfd;
  border-radius: 5px;
}

.hoverMenu:hover .menu {
  transform: scale(1);
}
</style>
