<template>
  <div id="globalLoading">
      <span></span>
  </div>
</template>

<script>
export default {
    name: "GlobalLoading",
    methods: {
        manageScrolling(condition){
            if(condition){
                document.body.style.overflow = "hidden";
            }else{
                document.body.style.overflow = "visible";
            }
        }
    },
    mounted(){
        this.manageScrolling(true);
    },
    beforeDestroy(){
        this.manageScrolling(false);
    }
}
</script>

<style lang="scss" scoped>
#globalLoading {
    top: 0;
    z-index: 101;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    @keyframes spin {
        to {
        transform: rotateZ(360deg);
        }
    }
  span {
    display: block;
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border: 3px solid transparent;
    border-top-color: #fff;
    border-bottom-color: #fff;
    border-radius: 50%;
    animation: spin ease 1000ms infinite;
    -o-animation: spin ease 1000ms infinite;
    -moz-animation: spin ease 1000ms infinite;
    -webkit-animation: spin ease 1000ms infinite;
  }
}
</style>