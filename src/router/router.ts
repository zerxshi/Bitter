import { createRouter, createWebHashHistory } from "vue-router"
import { useStoreAuth } from "@/stores/storeAuth"
import { useStoreProfile } from "@/stores/storeProfile"
import NewsPage from "@/pages/NewsPage.vue"
import PostsPageComposition from "@/pages/PostsPage.vue"
import ProfilePage from "@/pages/ProfilePage.vue"
import SettingsPage from "@/pages/SettingsPage.vue"
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
    path: "/settings",
    component: SettingsPage,
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

router.beforeEach(async (to, from) => {
  const storeAuth = useStoreAuth()
  if (!storeAuth.userData.id && to.path !== "/auth") {
    return { path: "/auth" }
  }
  if (storeAuth.userData.id && to.path === "/auth") {
    return false
  }
})

export default router
