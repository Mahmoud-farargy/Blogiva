<template>
  <header id="mainHeader">
      <!-- modals/backdrops -->
      <div @click="toggleShowingMobNav(false)" v-if="mobileNav" class="mobile--backdrop"></div>
      <!-- Desktop/big screens -->
      <nav  class="container desktop--nav flex-row">
          <div class="branding flex-row">
              <router-link class="logo" :to="{name: 'Home'}">{{appName}}</router-link>
          </div>
          <div class="nav-links flex-row desktop--only">
              <HeaderNav :isMobile="false" />
          </div>
      </nav>
      <menuIcon @click="toggleShowingMobNav()" class="mob--menu--icon mobile--only" />
      <transition name="mobile--nav">
        <!-- mobile nav -->
          <div v-show="mobileNav" class="mobile--outer">
              <HeaderNav :isMobile="true" />
          </div>

      </transition>
     
  </header>
</template>

<script>
import menuIcon from "@/assets/Icons/bars-regular.svg";
import HeaderNav from "./HeaderNav/HeaderNav";
import appConfig from "../../../config/app-config.json";
export default {
    name: "Header",
    components: {
        menuIcon,
        HeaderNav
    },
    data(){
        return {
            appName: appConfig.title || "Blogiva",
            mobileNav: false,
            windowWidth: null
        }
    },
    watch: {
        mobileNav(isTrue){
           isTrue ? window.addEventListener("resize",  this.closeNavDynamically, false) : window.removeEventListener("resize", this.closeNavDynamically);
             
        }
    },
    methods: {
        closeNavDynamically() {
            this.windowWidth = window.innerWidth;
            if(this.windowWidth >= 750){
                this.mobileNav = false;
            }
        },
        toggleShowingMobNav(val){
            this.mobileNav = (typeof val !== "undefined") ? val : !this.mobileNav;
        }
    }
}
</script>

<style lang="scss">
    header#mainHeader{
        width: 100%;
        background-color: var(--white);
        padding: 0 25px;
        box-shadow: var(--slight-shadow);
        z-index: 99;
        min-height: 80px;
        .mobile--backdrop {
                background-color: transparent;
                width: 100%;
                height: 100vh;
                position: fixed;
                z-index:100;
        }
        .mob--menu--icon{
            cursor: pointer;
            position: absolute;
            top: 32px;
            height: 25px;
            right: 25px;
            width: auto;
        }
        .mobile--outer{
            user-select: none;
            -webkit-user-select: none;
            ul.mobile--nav{
                list-style: none;
                padding: 20px;
                width: 70%;
                max-width: 250px;
                position: fixed;
                height: 100vh;
                display: flex;
                flex-direction: column;
                top:0;
                left:0;
                background-color: var(--primary-clr);
                z-index: 150;
                li{
                    color: #dbdbdb;
                    padding: 15px 0;
                    transition: color 0.2s linear;
                    &:hover{
                        cursor: pointer;
                        color: var(--white);
                    }
                }
            }
        }

        nav{
            width: 100%;
            padding: 17px 0;
            .nav-links{
               
                position: relative;
                justify-content: flex-end;
                align-items: center;
                flex: 1;
                flex-wrap: nowrap;
                ul{ 
                    justify-content: flex-end;
                    list-style: none;
                    .link{
                        font-weight: 700;
                        padding: 16px 8px;
                        transition: 0.3s;
                        cursor: pointer;
                        margin-right: 32px;
                        text-transform: uppercase;
                        &:last-of-type{
                            margin-right:0;
                        }
                        &:hover{
                            color: var(--primary-clr);
                        }
                    }
                }
  
            }
            

            .branding{
                align-items:center;

                .logo{
                    font-weight: 900;
                    font-size: 24px;
                    color: var(--black);
                    text-decoration: none;
                }
            }
        }

        // .mobile--nav-enter-active,
        // .mobile--nav-leave-active{
        //     transition: all 1s ease;
        // }
        // .mobile--nav-enter{
            
        //     transform: translateX(-250px);
        // }
        // .mobile--nav-enter-to{
        //      transform: translateX(0);
        // }
        // .mobile--nav-leave-to{
        //     transform: translateX(-250px);
        // }
    }
</style>