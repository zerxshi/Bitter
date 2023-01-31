import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "@/App.vue"
import components from "@/components/UI"
import router from "@/router/router"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
  faGear,
  faHome,
  faNewspaper,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons"
import directives from "@/directives"
import './assets/tailwind.css'

const app = createApp(App)
const pinia = createPinia()
library.add(faHome, faSignOutAlt, faNewspaper, faUser, faGear)

components.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(pinia)
  .mount("#app")
