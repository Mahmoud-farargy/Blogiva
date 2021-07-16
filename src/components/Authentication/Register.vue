<template>
  <form @submit.prevent="onFormSubmission({form: {type:'register', inputs: form}})" class="register">
      <p class="login-register">
          Aleady have an account?
         <router-link
                :to="{ name: Consts.routeNames.auth, params: { type: Consts.authTypes.login } }"
                class="router-link"
                >Login</router-link
         >
      </p>
      <h2>Create Your {{appName}} Account</h2>
      <div class="inputs">
         <div class="input">
              <input autofocus type="text" required placeholder="First Name" v-model="form.firstName" />
              <userSVG class="icon" />
         </div>
         <div class="input">
              <input type="text" required placeholder="Last Name" v-model="form.lastName" />
              <userSVG class="icon" />
          </div>
          <div class="input">
              <input type="text" required placeholder="Username" v-model="form.userName" />
               <userSVG class="icon" />
          </div>
          <div class="input">
              <input type="email" required placeholder="Email" v-model="form.email" />
              <emailSVG class="icon" />
          </div>
          <div class="input">
              <input type="password" required placeholder="Password" autocomplete="off" v-model="form.password" />
              <passwordSVG class="icon" />
          </div>
          <div v-show="form.error.state" class="error" >{{form.error.msg}}</div>
      </div>
     <input class="router-button" type="submit" role="submit" value="Sign Up" />
     <div class="angle"></div>
  </form>
</template>

<script>
import emailSVG from "@/assets/Icons/envelope-regular.svg";
import passwordSVG from "@/assets/Icons/lock-alt-solid.svg";
import userSVG from "@/assets/Icons/user-alt-light.svg";

export default {
    name: "Register",
    props: [
        "Consts",
        "onFormSubmission",
        "appName"
    ],
    components: {
        emailSVG,
        passwordSVG,
        userSVG
    },
    data(){
        return {
            form: {
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                password: "",
                error: {
                    state: false,
                        msg: "",
                },
            },
        }
    }
}
</script>