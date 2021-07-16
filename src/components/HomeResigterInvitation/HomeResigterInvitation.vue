 <template>
  <section id="regInvitation" >
      <div class="ref--invitation--inner container flex-row">
        <div class="title">
             <h2>never miss a post. Register for your free account today!</h2>
        </div>
        <div>
            <router-link class="router-button" :to="{name: routeNames.auth , params: {type: 'login'}}">Register to create blogs<Arrow class="arrow arrow-light" /></router-link>
        </div>
      </div>
  </section>
</template>

<script>
import Arrow from "@/assets/Icons/arrow-right-light.svg";
import { routeNames } from "../../Consts";
export default {
    name: "RegisterInvitation",
    data(){
        return {
            routeNames
        }
    },
    components: {
        Arrow
    }
}
</script>

<style lang="scss" scoped>
 #regInvitation{
     .ref--invitation--inner{
        justify-content:space-between;
        align-items:center;  
     }
  .container {
        padding: 100px 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (min-width: 800px) {
            padding: 125px 25px;
            flex-direction: row;
        }

        .router-button {
            display: flex;
            font-size: 14px;
            text-decoration: none;
            @media (min-width: 800px) {
                margin-left: auto;
            }
        }

        h2 {
            font-weight: 200;
            font-size: 32px;
            max-width: 425px;
            width: 100%;
            text-align: center;
            text-transform: uppercase;
            @media (min-width: 800px) {
                text-align: initial;
                font-size: 40px;
            }
        }
    
    }
 }
</style>