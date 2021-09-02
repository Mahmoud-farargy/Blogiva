<template>
  <div id="authMain">
    <div class="form-wrap"> 
        <!-- LOGIN -->
       <Login :onFormSubmission="onFormSubmission" :Consts="Consts" :submitted="submitted" :appName="appName" v-if="authType === Consts.authTypes.login" />
       <!-- REGISTER -->
       <Register :onFormSubmission="onFormSubmission" :Consts="Consts"  :submitted="submitted"  :appName="appName" v-if="authType === Consts.authTypes.register" />
       <!-- Forgot Password -->
       <ForgotPassword :onFormSubmission="onFormSubmission" :Consts="Consts" :submitted="submitted" :appName="appName" v-if="authType === Consts.authTypes.forgotPassword" />
      <div class="background"></div>
    </div>
  </div>
</template>

<script>
import * as Consts from "../../Consts";
import Login from "@/components/Authentication/Login";
import Register from "@/components/Authentication/Register";
import ForgotPassword from "@/components/Authentication/ForgotPassword";
import appConfig from "../../../config/app-config.json";
import { login, signUp, resetPassword, notify } from "@/utilities.js";

export default {
  name: "Authentication",
  data() {
    return {
      appName: appConfig.title || "Blogiva",
      authType: "login",
      Consts: Consts,
      submitted: false
    };
  },
  components: {
      Login,
      Register,
      ForgotPassword
  },
  methods: {
    checkAuthType(val) {
      if (val) {
        this.authType = val;
        return;
      }
      this.authType =
        this.$route.params && this.$route.params.type
          ? this.$route.params?.type?.toLowerCase()
          : "login";
    },
    loginUser(formInputs){
        const {email, password} = formInputs;
        (email && password) && login({email: email, password: password});
    },
    onFormSubmission(form){
        // todo: form validations
      
        if(form){
            const { type = 'login', inputs = {}, isAnonymous = false} = form?.form; 
           this.submitted = !isAnonymous;
            const { password, email } = inputs;
            if(type && Object.values(inputs).some(input => input !== 'undefined')) switch(type.toLowerCase().trim()){
                case 'login': {
                  if(password && email){
                     this.loginUser(inputs);
                  }
                       
                break; 
                }
                   
                case 'register': {
                         const {email, firstName, lastName, userName, password} = inputs;
                         if(email && password && firstName && lastName && userName){
                            signUp({email, password, firstName, lastName, userName});
                         }else{
                           const invalidInputs = Object.keys(inputs).filter(el => el !== "error" && (typeof inputs[el] === 'undefined' || inputs[el] === ""));
                           invalidInputs.length > 0 && notify({type: "error", msg: `${invalidInputs.join(', ')}${invalidInputs.length > 1 ? ' are' : ' is'} not defined. Please fill these fields and try again.`});
                         }
                       
                break;
                }                
                case 'forgot_password': {
                    const { email } = inputs;
                    email && resetPassword({email});
                break;
                }
                default:
                  this.loginUser(inputs);
            }
        }
    },
    beforeDestroy() {
        this.submitted = false;
    },
  },
  watch: {
    $route() {
      this.checkAuthType();
    },
  },

  created() {
    this.checkAuthType();
  },
};
</script>

<style lang="scss">
#authMain {
  .form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;
    @media (min-width: 900px) {
      width: 100%;
    }
    .register {
        h2 {
            max-width: 350px;
        }
    }
    .login-register {
      margin-bottom: 32px;

      .router-link {
        color: #000;
        text-transform: capitalize;
      }
    }

    form {
      padding: 0 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 1;
      @media (min-width: 900px) {
        padding: 0 50px;
      }

      h2 {
        text-transform: capitalize;
        text-align: center;
        font-size: 32px;
        font-weight: 900;
        color: var(--primary-clr);;
        margin-bottom: 40px;
        @media (min-width: 900px) {
          font-size: 40px;
        }
      }

      .inputs {
        width: 100%;
        max-width: 350px;

        .input {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 8px;
          input {
            width: 100%;
            border: none;
            background-color: #f2f7f6;
            padding: 4px 4px 4px 30px;
            height: 50px;
            transition: 0.5s ease all;
            border-radius: 4px;
            &:focus {
              background-color: #ecfcf8;
              outline: none;
            }
          }

          .icon {
            width: 14px;
            position: absolute;
            left: 8px;
          }
        }
      }

      .forgot-password {
        text-decoration: none;
        color: #000;
        cursor: pointer;
        font-size: 14px;
        margin: 16px 0 32px;
        border-bottom: 1px solid transparent;
        transition: 0.5s ease all;

        &:hover {
          border-color: var(--primary-clr);;
        }
      }

      .angle {
        display: none;
        position: absolute;
        background-color: #fff;
        transform: rotateZ(3deg);
        width: 60px;
        right: -30px;
        height: 101%;
        @media (min-width: 900px) {
          display: initial;
        }
      }
    }

    .background {
      display: none;
      flex: 2;
      background-size: cover;
      background-image: url("../../assets/background.png");
      width: 100%;
      height: 100%;
      @media (min-width: 900px) {
        display: initial;
      }
    }
  }
}
</style>