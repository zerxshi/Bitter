import { createRouter, createWebHashHistory } from "vue-router"
import NewsPage from "@/pages/NewsPage.vue"
import PostsPageComposition from "@/pages/PostsPageComposition.vue"
import ProfilePage from "@/pages/ProfilePage.vue"

const routes: any[] = [
  {
    path: "/",
    component: PostsPageComposition,
  },
  {
    path: "/news",
    component: NewsPage,
  },
  {
    path: "/profile/:user",
    component: ProfilePage,
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
})

export default router
