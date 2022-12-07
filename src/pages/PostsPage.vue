<template>
  <div>
    <div class="searchBar">
      <my-input
        class="searchInput"
        placeholder="Поиск поста..."
        v-model="searchQuery"
      ></my-input>
    </div>
    <div class="appBtns">
      <my-button class="createPostBtn" @click="dialogVisible = true"
        >Создать пост</my-button
      >
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </my-dialog>
    <post-list
      @delete="deletePost"
      :posts="filteredPosts"
      v-if="!isPostsLoading"
    />
    <h2 class="postsLoadingText" v-else>Идет загрузка постов...</h2>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostList from "@/components/PostList.vue"
import PostForm from "@/components/PostForm.vue"
import axios from "axios"

export default {
  components: {
    PostList,
    PostForm,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По описанию" },
      ],
      page: 1,
      postsLimit: 10,
      totalPages: 0,
    }
  },
  methods: {
    createPost(post) {
      this.posts.unshift(post)
      this.dialogVisible = false
    },
    deletePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    async fetchPosts() {
      try {
        this.isPostsLoading = true
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.postsLimit,
            },
          }
        )
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.postsLimit
        )
        this.posts = response.data
      } catch (err) {
        console.error(err)
      } finally {
        this.isPostsLoading = false
      }
    },
    async loadMorePosts() {
      try {
        this.page++
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.postsLimit,
            },
          }
        )
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.postsLimit
        )
        this.posts = [...this.posts, ...response.data]
      } catch (err) {
        console.error(err)
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    //   this.fetchPosts()
    // },
  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      })
    },
    filteredPosts() {
      const searchFilter = (post) => {
        return (
          [post.title, post.body]
            .join("")
            .toLowerCase()
            .indexOf(this.searchQuery.toLowerCase()) !== -1
        )
      }
      return this.sortedPosts.filter(searchFilter)
    },
  },
  mounted() {
    this.fetchPosts()
  },
}
</script>

<style scoped>
.searchBar {
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #393148;
}

.pageText {
  color: #fcfdfd;
}

.appBtns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.postsLoadingText {
  color: #fcfdfd;
}

.observer {
  height: 30px;
}
</style>
