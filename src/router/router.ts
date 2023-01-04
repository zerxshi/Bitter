import { createRouter, createWebHashHistory } from "vue-router"
import NewsPage from "@/pages/NewsPage.vue"
import PostsPageComposition from "@/pages/PostsPage.vue"
import ProfilePage from "@/pages/ProfilePage.vue"
import AuthPage from "@/pages/AuthPage.vue"

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
  {
    path: "/auth",
    component: AuthPage,
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(process.env.BASE_URL),
})

export default router
