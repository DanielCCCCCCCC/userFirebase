import { defineStore } from "pinia";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import router from "../routers";

// import router from "../router/index";

import { auth } from "../firebaseConfig"; // Asegúrate de tener esta importación
export const useUserStore = defineStore("userStore", {
  state: () => ({
    userData: null,
    loadingUsers: false,
    loadingSession: false,
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUsers = true;
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/login");
        console.log(user);
      } catch (e) {
        alert("Error: Usuario ya registrado ");
        console.log(e.message);
      } finally {
        this.loadingUsers = false;
      }
    },
    async loginUsers(email, password) {
      this.loadingUsers = true;
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        this.userData = { email: user.email, uid: user.uid };
        router.push("/home");
      } catch (e) {
        alert("Error: Credenciales incorrectas");
        console.log(e.message);
      } finally {
        this.loadingUsers = false;
      }
    },

    async logoutUser() {
      try {
        await signOut(auth);
        this.userData = null;
        router.push("/login");
      } catch (e) {
        console.log(e.message);
      }
    },

    currentUser() {
      return new Promise((resolve, reject) => {
        const unsuscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              this.userData = { email: user.email, uid: user.uid };
            } else {
              this.userData = null;
            }
            resolve(user); //devuelve del usuario independiente si existe o no
          },
          (e) => reject(e)
        );
        // unsuscribe();
      });
    },
  },
});
