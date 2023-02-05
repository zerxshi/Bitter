import { defineStore } from "pinia"
import { ref, computed, reactive } from "vue"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth"
import { auth } from "@/ts/firebase"
import { useRouter } from "vue-router"
import { useRoute } from "vue-router"
import { useStorePosts } from "./storePosts"

export const useStoreAuth = defineStore("storeAuth", () => {
  const storePosts = useStorePosts()
  const router = useRouter()
  const route = useRoute()
  const register = ref<Boolean>(false)
  let validationError = ref<Boolean>(false)
  let emailError = ref<Boolean>(false)

  const formTitle = computed<String>(() => {
    return register.value ? "Register" : "Login"
  })

  interface credentials {
    email: string
    login: string
    password: string
  }

  const credentials = reactive<credentials>({
    email: "",
    login: "",
    password: "",
  })

  interface userData {
    email?: string | null
    login?: string | null
    profilePic?: string | null
    id?: string
  }

  const userData = ref<userData>({})

  const init = (): void => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userData.value.email = user.email
        userData.value.login = user.displayName
        userData.value.profilePic = user.photoURL
          ? user.photoURL
          : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
        userData.value.id = user.uid
        router.push("/")
        storePosts.init()
      } else {
        userData.value = {}
        router.replace("/auth")
        storePosts.clearPosts()
      }
    })
  }

  const registerUser = async (credentials: credentials): Promise<any> => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      ).catch((error) => (emailError.value = true))

      await updateProfile(auth.currentUser!, {
        displayName: credentials.login,
      }).catch((error) => console.log(error))
    } catch (error) {
      console.error(error)
    }
    credentials.email = ""
    credentials.login = ""
    credentials.password = ""
  }

  const loginUser = (credentials: credentials): void => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        const user = userCredential.user
      })
      .catch((error) => {
        console.log("error: ", error.message)
      })
    credentials.email = ""
    credentials.password = ""
  }

  const logoutUser = (): void => {
    signOut(auth)
      .then(() => {
        console.log("user signed out")
      })
      .catch((error) => {
        console.log("error: ", error.message)
      })
  }

  const onSubmit = (): void => {
    if (!credentials.email || !credentials.password) {
      validationError.value = true
    } else {
      if (register.value) {
        validationError.value = false
        registerUser(credentials)
      } else {
        validationError.value = false
        loginUser(credentials)
      }
    }
  }

  return {
    register,
    formTitle,
    credentials,
    validationError,
    userData,
    emailError,
    onSubmit,
    init,
    logoutUser,
  }
})
