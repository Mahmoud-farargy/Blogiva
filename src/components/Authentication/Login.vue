<template>
        <form @submit.prevent="onFormSubmission({form: {type:'login', inputs: form}})" class="login">
            <p class="login-register first--login--link">
            Don't have an account?
            <router-link
                :to="{ name: Consts.routeNames.auth, params: { type: Consts.authTypes.register } }"
                class="router-link"
                >Register</router-link
            >
            </p>
            <h2>Login to {{appName}}</h2>
            <div class="inputs">
            <div class="input" :class="{'invalidInput' : submitted && !form.email}">
                <input autofocus type="email" required placeholder="Email" v-model="form.email" />
                <emailSVG class="icon" />
            </div>
            <span v-if="submitted && !form.email" class="error">
                 Field above is required
            </span>
            <div class="input">
                <input
                type="password"
                placeholder="Password"
                v-model="form.password"
                autocomplete="off"
                required
                />
                <passwordSVG class="icon" />
            </div>
            <span v-if="submitted && !form.password" class="error">
                 Field above is required
            </span>
            <div v-show="form.error.state" class="error">{{ form.error.msg }}</div>
            </div>
            <router-link
            :to="{ name: Consts.routeNames.auth, params: { type: Consts.authTypes.forgotPassword } }"
            class="forgot-password"
            >
            Forgot your password?
            </router-link>
            <div class="buttons--group flex-row">
                <button
                    @click.prevent="$router.push({name: Consts.routeNames.home})"
                    class="router-button cancel--btn"
                    >Cancel</button
                >   
                <input class="router-button" type="submit" role="submit" value="Sign In" />
            </div>

            <div class="angle"></div>
        </form>
</template>

<script>
import emailSVG from "@/assets/Icons/envelope-regular.svg";
import passwordSVG from "@/assets/Icons/lock-alt-solid.svg";

export default {
    name: "Login",
    props: [
        "Consts",
        "onFormSubmission",
        "appName",
        "submitted" 
    ],
    components: {
        emailSVG,
        passwordSVG,
    },
    data(){
        return {
            form: {
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

<style lang="scss" scoped>
    .buttons--group{
        flex-wrap: wrap;
        align-items:center;
        .cancel--btn{
            margin-right: 20px;
            background-color: #8d8989;
        }
    }
</style>