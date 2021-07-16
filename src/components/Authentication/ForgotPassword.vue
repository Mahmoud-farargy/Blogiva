<template>
  <form @submit.prevent="onFormSubmission({form: {type:'forgot_password', inputs: form}})" class="reset">
      <p class="login-register">
          Back to
         <router-link
                :to="{ name: Consts.routeNames.auth, params: { type: Consts.authTypes.login } }"
                class="router-link"
                >Login</router-link
            >
      </p>
      <h2>Reset Password</h2>
      <p>Forgot your password? That's okay, it happens! Enter your email below to reset it.</p>
      <div class="inputs">
          <div class="input">
              <input type="email" required placeholder="Email" v-model="form.email"/> 
              <emailSVG class="icon" />
          </div>
       
      </div>
        <input class="router-button" type="submit" role="submit" value="Reset" />
      <div class="angle"></div>
  </form>
</template>

<script>
import emailSVG from "../../assets/Icons/envelope-regular.svg";

export default {
    name: "ForgotPassword",
    props: [
        "Consts",
        "onFormSubmission",
    ],
    components: {
        emailSVG
    },
    data(){
        return {
            form: {
                email: "",
                error: {
                    state: false,
                        msg: "",
                },
            },
        }
    }
}
</script>

<style lang="scss" scoped>
    .reset {
        h2 {
            margin-bottom: 8px;
        }
        p {
            text-align: center;
            margin-bottom: 32px;
        }
    }
</style>