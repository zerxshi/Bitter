import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/App.vue"
import components from "@/components/UI"
import router from "@/router/router"
import directives from "@/directives"

const app = createApp(App)
const pinia = createPinia()

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router).use(pinia).mount("#app")
