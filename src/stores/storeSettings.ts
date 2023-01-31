import { defineStore } from "pinia"
import { ref } from "vue"
import { auth } from "@/ts/firebase"
import { updateProfile } from "firebase/auth"

export const useStoreSettings = defineStore("storeSettings", () => {
  const loginInput = ref<string>("")
  const pictureInput = ref<string>("")

  const updateLogin = () => {
    if (loginInput.value.trim() !== "") {
      updateProfile(auth.currentUser!, {
        displayName: loginInput.value,
      }).catch((error) => {
        console.log("error: ", error)
      })
    }
  }

  const updatePicture = () => {
    if (pictureInput.value.trim() !== "") {
      console.log("working")
      updateProfile(auth.currentUser!, {
        photoURL: pictureInput.value,
      }).catch((error) => {
        console.log("error: ", error)
      })
    }
  }

  return {
    loginInput,
    pictureInput,
    updateLogin,
    updatePicture,
  }
})
