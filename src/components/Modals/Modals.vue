<template>
  <div id="modalOuterContainer">
    <!-- Backdrops -->
    <div v-if="Object.values(modalsState.lev1).some( modal => modal.state === true )" @click="closeModal(1)" class="backdrop--lev--1 backdrop"></div>
    <div v-if="Object.values(modalsState.lev2).some( modal => modal.state === true )" @click="closeModal(2)" class="backdrop--lev--2 backdrop"></div>
    <div v-if="Object.values(modalsState.lev3).some( modal => modal.state === true )" @click="closeModal(3)" class="backdrop--lev--3 backdrop"></div>
    <div v-if="Object.values(modalsState.lev4).some( modal => modal.state === true )" @click="closeModal(4)" class="backdrop--lev--4 backdrop"></div>
    <!-- Modals -->
    <Message v-if="modalsState.lev4.message.state"
                :modalsState="modalsState"
                :updateModals="updateModals"
                :level="4" />
    <BlogCoverPreview 
                v-if="modalsState.lev3.coverPreview.state"
                :modalsState="modalsState"
                :updateModals="updateModals"
                :level="3" 
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Message from "./Types/Message";
import BlogCoverPreview from "./Types/BlogCoverPreview";

export default {
  name: "Modals",
  computed: {
    ...mapGetters("modals", { modalsState: "getModals" }),
  },
  methods: {
    ...mapActions("modals", ["updateModals", "closeModalLevel"]),
    closeModal(level){
        this.closeModalLevel({level});
    },
    manageScrolling(condition){
        const controlOverflow = (val) => {
            if(val){
                document.body.style.overflow = "hidden";
            }else{
                document.body.style.overflow = "visible";
            }
        }
        const isAnyModalOpen = Object.values(this.modalsState).some( modal => Object.values(modal).some( el => el.state === true));
        controlOverflow(typeof condition !== "undefined" ? condition : isAnyModalOpen);
    }
  },
  components: {
    Message,
     BlogCoverPreview
  },
  watch: {
      modalsState(){
        this.manageScrolling();
      }
  },
  mounted(){
      this.manageScrolling();
  },
  beforeDestroy(){
      this.manageScrolling(false);
      
  }
};
</script>

<style lang="scss">
#modalOuterContainer {
  .modal--container{
    position: fixed;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>