<template>
   <div class="modal--container flex-row" :style="{zIndex: `calc(var(--backdrop-lev-${level}) + 40)`}">
      <div class="modal--inner">
            <div class="modal--content">
                <close @click="closePreview" class="icon" />
                <img v-if="getBlogItem.blogPhotoFileURL" :src="getBlogItem.blogPhotoFileURL" alt="" />
            </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import close from "@/assets/Icons/times-circle-light.svg";
export default {
    props:[
        "modalsState",
        "updateModals",
        "level"
    ],
    components: {
        close
    },
    methods: {
        closePreview() {
            this.updateModals({level: this.level, type:  "coverPreview",val: false});
        }
    },
    computed: {
        ...mapGetters("blogList", ["getBlogItem"]),
    }
}
</script>

<style lang="scss" scoped>
    .modal--container {

        .modal--inner{
            margin: 0 auto;
            .modal--content {
                display: flex;
                justify-content: center;
                position: relative;
                border-radius: 12px;
                background-color: #fff;
                height: 400px;
                width: 600px;
                padding: 50px;
               
                box-shadow: var(--slight-shadow);
                .icon {
                width: 24px;
                height: auto;
                cursor: pointer;
                font-size: 24px;
                position: absolute;
                top: 15px;
                right: 15px;
                color: var(--primary-clr);
                }

                img {
                margin-top: 16px;
                display: block;
                width: auto;
                height: 100%;
                box-shadow: var(--slight-shadow);
                }
            }
        } 
        @media only screen and (max-width: 700px) {
            width: 90%;
           .modal--inner .modal--content{
                 width: 100%;
            }
        }
    }


</style>