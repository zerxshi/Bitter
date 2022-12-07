import { createRouter, createWebHashHistory } from "vue-router"
import NewsPage from "@/pages/NewsPage"
import PostsPageComposition from "@/pages/PostsPageComposition"
import ProfilePage from "@/pages/ProfilePage"

const routes = [
  {
    path: "/",
    component: PostsPageComposition,
  },
  {
    path: "/news",
    component: NewsPage,
  },
  {
    path: "/profile",
    component: ProfilePage,
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
})

export default router
