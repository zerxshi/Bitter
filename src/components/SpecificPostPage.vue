<template>
  <div class="specificPost" @click="storePosts.showSpecificPost = false">
    <div class="content" @click.stop>
      <post-item :post="storePosts.specificPost" />
      <div class="comments" v-if="storePosts.filteredComments.length">
        <h3>Comments</h3>
        <div
          class="comment"
          v-for="comment in storePosts.filteredComments"
          :key="comment.id"
        >
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
import PostItem from "@/components/PostItem.vue"
import { useStorePosts } from "@/stores/storePosts"

const storePosts = useStorePosts()
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
