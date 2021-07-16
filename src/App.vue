<template>
  <div id="app" class="flex-column">
    <!-- Loading -->
    <GlobalLoading v-if="getLoadingState && getLoadingState.globalLoading" />
    <!-- Modals -->
    <Modals v-if="getModals && Object.values(getModals).some( modal => Object.values(modal).some( el => el.state === true ))" />
    <!-- Header -->
    <Header v-if="!navigationDisabled" />
    <!-- Routes -->
    <keep-alive>
        <router-view/>
    </keep-alive>
  
    <!-- Footer -->
    <Footer v-if="!navigationDisabled"/>
  </div>
</template>
<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import GlobalLoading from "@/components/Loading/GlobalLoading";
import 'vue-toast-notification/dist/theme-sugar.css';
import { auth } from "@/config/firebase"; 
import { mapActions, mapGetters } from "vuex";
import Modals from "@/components/Modals/Modals";

export default {
  name: "App",
  data(){
    return {
      navigationDisabled: false 
    }
  },
  computed: {
    ...mapGetters("modals", ["getModals"]),
    ...mapGetters("toggleKeys", ["getLoadingState"])
  },
  methods: {
    ...mapActions("blogList", ["updateBlogs"]),
    ...mapActions("user", ["updateUserState", "updateUID"]),
    checkNavigation () {
        const currentRouteName = this.$route.name;
        if(currentRouteName === "Authentication"){
          this.navigationDisabled = true;
          return;
        }
        this.navigationDisabled = false;
    }
   },
  watch: {
     $route() {
       this.checkNavigation();
     }
  },
  components:{
    Header,
    Footer,
    Modals,
    GlobalLoading
  },
  mounted(){ 
    const { updateUserState, checkNavigation, updateUID, updateBlogs } = this;
  
    auth.onAuthStateChanged((authUser) => {
      if(authUser){ 
        updateUserState(true);
        // connected
        updateUID(authUser?.uid);
        updateBlogs();
      }else{
        // disconnected
        updateUserState(false);
      }
    });
    checkNavigation();
  },
}
</script>
