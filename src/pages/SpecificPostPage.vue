<template>
  <div class="specificPost" @click="$emit('hideSpecificPost')">
    <div class="content" @click.stop>
      <div class="post">
        <div class="hoverMenu" v-if="specificPost.myPost">
          <i class="uil uil-ellipsis-h" onClick="showMenu(this)"></i>
          <ul class="menu">
            <li @click="$emit('delete', specificPost)">
              <i class="uil uil-trash"></i>Delete
            </li>
          </ul>
        </div>
        <div class="postAuthor">
          {{ specificPost.userName }} <small>@{{ specificPost.user }}</small>
        </div>
        <div>{{ specificPost.body }}</div>
      </div>
      <div class="comments" v-if="comments.length">
        <h3>Comments</h3>
        <div class="comment" v-for="comment in comments" :key="comment.id">
          <div class="commentAuthor">
            {{ comment.email }}
          </div>
          <div>{{ comment.body }}</div>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  specificPost: {
    type: Object,
    required: true,
  },
  comments: {
    type: Array,
  },
})
</script>

<style scoped>
.specificPost {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  border-radius: 10px;
  min-height: 50px;
  min-width: 300px;
  padding: 20px;
  width: 740px;
}

.comments {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #393148;
  color: #fcfdfd;
}

.commentAuthor {
  font-weight: bold;
  margin-bottom: 0;
  color: #9c5f64;
  font-size: 16px;
}

.comment {
  margin-top: 15px;
  font-size: 16px;
}

h3 {
  text-align: center;
}
</style>
