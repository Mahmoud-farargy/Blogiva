<template>
  <section id="profile">
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ profileInitials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon" />
          <span>admin</span>
        </div>
        <form @submit="onSavingUpdates">
            <div class="input">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" v-model="formData.firstName" />
            </div>
            <div class="input">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" v-model="formData.lastName" />
            </div>
                <div class="input">
                <label for="username">Username:</label>
            <input type="text" id="username" v-model="formData.userName" />
            </div>
            <div class="input">
                <label for="email">Email:</label>
                <input disabled type="text" id="email" v-model="formData.email" />
            </div>
            <div class="profile-btns flex-row">
                  <input class="router-button" type="submit" role="submit" vale="Save Changes"> 
            </div>
        </form>

      </div>
    </div>
  </section>
</template>

<script>
import adminIcon from "../assets/Icons/user-crown-light.svg";
import { updateUserInfo } from "@/utilities";
import { mapGetters } from 'vuex';
// TODO: FIX POPULATING DATA
export default {
    name: "Profile",
    computed: {
      ...mapGetters("blogList", ["profileInitials", "getReceivedData"]),
      userInfo(){
          return this.getReceivedData?.userInfo;
      }
    },
    components: {
        adminIcon
    },
    data() {
        return {
            formData: {
                firstName: "",
                lastName: "",
                userName: "",
                email: ""
            }
        }
    },
    methods: {
        populateForm(){
            const { userInfo } = this;
            if(this.getReceivedData && userInfo && Object.keys(userInfo).length > 0){
                Object.keys(userInfo).map(key => {
                    this.formData[key] = userInfo[key];
                });
                
            }
        },
        onSavingUpdates(e){
            e.preventDefault();
            updateUserInfo(this.formData);
        }
    },
    mounted(){
        this.populateForm();
    }
}
</script>

<style lang="scss" scoped>
    #profile{
         .container {
            max-width: 1000px;
            padding: 60px 25px;

            h2 {
            text-align: center;
            margin-bottom: 16px;
            font-weight: 300;
            font-size: 32px;
            }

            .profile-info {
            border-radius: 8px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            padding: 32px;
            background-color: #f1f1f1;
            display: flex;
            flex-direction: column;
            max-width: 600px;
            margin: 32px auto;

            .initials {
                position: initial;
                width: 80px;
                height: 80px;
                font-size: 32px;
                background-color: var(--primary-clr);
                color: #fff;
                display: flex;
                align-self: center;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
            }

            .admin-badge {
                display: flex;
                align-self: center;
                color: #fff;
                font-size: 14px;
                padding: 8px 24px;
                border-radius: 8px;
                background-color: var(--primary-clr);
                margin: 16px 0;
                text-align: center;
                text-transform: capitalize;

                .icon {
                width: 14px;
                height: auto;
                margin-right: 8px;
                }
            }

            .input {
                margin: 16px 0;

                label {
                font-size: 14px;
                display: block;
                padding-bottom: 6px;
                }
                input {
                width: 100%;
                border: none;
                background-color: #f2f7f6;
                padding: 8px;
                height: 50px;
                @media (min-width: 900px) {
                }

                &:focus {
                    background-color: #ecfcf8;
                    outline: none;
                }
                }
            }

            .profile-btns{
                width:100%;
                justify-content:center;
            }
            }
        }
    }
</style>