<template>
    <div class="modal--container flex-row" :style="{zIndex: `calc(var(--backdrop-lev-${level}) + 40)`}">
      <div class="modal--inner">
        <div class="modal--content flex-column" >
            <div id="message--modal">
                <p>{{modalsState.lev4.message.payload}}</p>
                <button @click="closeModal">Close</button>
            </div>
        </div>
      </div>
    </div>

</template>

<script>
export default {
    name: "MessageModal",
    props:[
        "modalsState",
        "updateModals",
        "level"
    ],
    methods: {
        closeModal(){
            this.updateModals({level: this.level, type: 'message',val: false});
        }
    }
}
</script>

<style lang="scss" scoped>
    #message--modal{
        text-align:center;
        button{
            margin-left: auto;
            margin-right: auto;  
        }

    }
    .modal--inner {
        justify-content: center;
        border-radius: 8px;
        width: 300px;
        padding: 40px 30px;
        background-color: #fff;
        
        .modal--content {
            justify-content: center;
            align-items: center;
            p {
                text-align: center;
            }

            button {
                align-self: center;
            }
        }
    }
</style>