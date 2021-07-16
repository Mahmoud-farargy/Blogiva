<template>
<div id="navMenu" class=" flex-row">
  <ul :class="{ 'mobile--nav': isMobile, 'flex-row': !isMobile }">
    <!-- links -->
    <router-link
      exact
      tag="li"
      active-class="active--link"
      class="link"
      :to="{ name: routeNames.home }"
    >
      Home
    </router-link>
    <router-link
      tag="li"
      active-class="active--link"
      class="link"
      :to="{ name: routeNames.blogs }"
    >
      Blogs
    </router-link>
  
    <router-link
      tag="li"
      v-if="isUserOnline"
      active-class="active--link"
      class="link"
      :to="{ name: routeNames.createPost }"
      >
      Create Post
    </router-link>
    <router-link
      tag="li"
      v-if="!isUserOnline"
      active-class="active--link"
      class="link"
      :to="{name: routeNames.auth, params: {type: 'login'}}"
      >
      Login/Register
    </router-link>

  </ul>  
  <!-- profile menu -->
        <div v-if="isUserOnline" :class="{ 'mobile-user-menu': isMobile }" @click="toggleProfileMenu(true)" class="profile" ref="profile">
          <span v-if="profileInitials">{{profileInitials}}</span>
          <div v-show="showProfileMenu">
            <div @click.stop="toggleProfileMenu(false)" class="hidden--backdrop"></div>
            <div v-show="showProfileMenu" class="profile-menu">
                  
                  <div class="info">
                    <p v-if="profileInitials" class="initials">{{profileInitials}}</p>
                    <div class="right">
                      <p v-if="userInfo.firstName && userInfo.lastName">{{userInfo.firstName}} {{userInfo.lastName}}</p>
                      <p v-if="userInfo.userName">{{userInfo.userName}}</p>
                      <p v-if="userInfo.email">{{userInfo.email}}</p>
                    </div>
                  </div>
                  <ul class="options">
                    <li class="option" @click.stop="redirectUser('Profile')">
                      <!-- will change links later -->
                      <span  class="option">
                        <userIcon class="icon" />
                        <p>Profile</p>
                      </span>
                    </li>
                    <li class="option" @click.stop="redirectUser('Admin')">
                      <span class="option" >
                        <adminIcon class="icon" />
                        <p>Admin</p>
                      </span>
                    </li>
                    <!-- <li class="option" @click.stop="redirectUser('About')">
                      <span class="option" >
                        <adminIcon class="icon" />
                        <p>About</p>
                      </span>
                    </li> -->
                    <li @click.stop="logOut" class="option">
                      <span class="option" >
                          <signOutIcon class="icon" />
                          <p>Sign Out</p>
                      </span>
                    </li>
                  </ul>
                </div>
          </div>
        
    
        </div>
  </div>
</template>

<script>
import userIcon from "@/assets/Icons/user-alt-light.svg";
import adminIcon from "@/assets/Icons/user-crown-light.svg";
import signOutIcon from "@/assets/Icons/sign-out-alt-regular.svg";
import { mapActions, mapGetters } from 'vuex';
import { routeNames } from "../../../Consts";
import { signOut } from "@/utilities";

export default {
  name: "HeaderNav",
  computed: {
    ...mapGetters("user", {isUserOnline: "getUserState"}),
    ...mapGetters("toggleKeys", ["getKeys"]),
    ...mapGetters("blogList", ["profileInitials", "getReceivedData"]),
    userInfo(){
      return (this.getReceivedData && this.getReceivedData.userInfo) ? this.getReceivedData.userInfo : {};
    },
    showProfileMenu() {
      return this.getKeys?.profileMenu;
    }
  },
  props: ["isMobile"],
  components: {
    userIcon,
    signOutIcon,
    adminIcon
  },
  methods: {
    ...mapActions("toggleKeys", ["changeKeys"]),
    toggleProfileMenu(val){
        this.changeKeys({key: "profileMenu", val});
    },
    redirectUser(routeName){
      this.$router.push({name: routeName});
      this.toggleProfileMenu(false);
    },
    logOut(){
      signOut();
      this.toggleProfileMenu(false);
    }
  },
  watch: {
     showProfileMenu(val){
        if(val){
          document.body.style.overflow = "hidden";
        }else{
          document.body.style.overflow = "visible";
        }
     }
  },
  data(){
    return {
       routeNames: routeNames
    }
  }
};
</script>
<style lang="scss" scoped>
#navMenu{
        flex-wrap: nowrap;
        align-items: center;
        ul{
          align-items: center;
        }
        .profile {
          margin-left:  10px;
          position: relative;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          color: #fff;
          background-color: var(--primary-clr);
          user-select: none;
          -webkit-user-select: none;
          span {
            pointer-events: none;
          }

          .profile-menu {
            position: absolute;
            top: 60px;
            right: 0;
            width: 250px;
            background-color: var(--primary-clr);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            z-index: 260;
            .info {
              display: flex;
              align-items: center;
              padding: 15px;
              border-bottom: 1px solid #fff;
              min-height: 70px;
              .initials {
                position: initial;
                width: 40px;
                height: 40px;
                background-color: var(--white);
                color: var(--primary-clr);
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
              }

              .right {
                flex: 1;
                margin-left: 24px;

                p:nth-child(1) {
                  font-size: 14px;
                }

                p:nth-child(2),
                p:nth-child(3) {
                  font-size: 12px;
                }
              }
            }

            .options {
              list-style: none;
              padding: 0;
              .option {
                padding: 5px 10px;
                text-decoration: none;
                color: #fff;
                display: flex;
                align-items: center;
                &:hover{
                  background-color: #5c5c5c;
                }
                .icon {
                  width: 18px;
                  height: auto;
                }
                p {
                  font-size: 14px;
                  margin-left: 12px;
                }
              }
            }
          }
        }
      
      .mobile-user-menu {
        margin-right: 40px;
      }
}

</style>