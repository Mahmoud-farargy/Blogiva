<template>
  <div id="homeBlogPost">
      <div v-if="isUserOnline ? index !== 0 : true " class="home--post--container">
        <div  class="blog--content flex-column" :class="{'no--user': index === 0 && !isUserOnline}">
           <div>
               <h2 v-if="post.blogTitle">{{post.blogTitle}}</h2>
               <p v-if="post.blogHTML" v-html="post.blogHTML"></p>
               <p class="content--preview" v-html="post.blogHTML"></p>
               <router-link class="link link-light" v-if="post.welcomeScreen" :to="{name: routeNames.auth, params: {type: 'login'}}">
                   Login/Register <Arrow class="arrow arrow-light" />
               </router-link>
               <router-link class="link" v-else :to="{name: post.link.name, params: {blogId: post.blogId}}">
                   View The Post <Arrow class="arrow" />
               </router-link>
               
           </div>
          
        </div>
        <div class="blog--photo">
            <img :src="require(`../../assets/blogPhotos/${post.photo}.jpg`)" :alt="post.blogTitle" />
                                    <!-- src will be changed later -->
            <!-- <img v-else :src="require(`../../assets/blogPhotos/${post.photo}.jpg`)" :alt="post.blogTitle" /> -->
        </div>   
      </div>

  </div>
</template>

<script>
import Arrow from "@/assets/Icons/arrow-right-light.svg";
import { routeNames } from "../../Consts";
import { mapGetters } from 'vuex';
export default {
    name: "blogPost",
    props: [
        "post",
        "index"
    ],
    data(){
        return {
            routeNames
        }
    },
    components: {
        Arrow
    },
    computed: {
        ...mapGetters("user", {isUserOnline: "getUserState"}),
    }
}
</script>

<style lang="scss" scoped>
    #homeBlogPost {
        width: 100%;
        overflow-x: hidden;
        &:nth-child(even){
            .home--post--container{
               flex-direction: row-reverse;
            }
        }
        .home--post--container{
            display: flex;
            flex-direction: row;
            
            box-shadow: var(--slight-shadow);
            .blog--content{
               justify-content: center;
               align-items:center;
               flex: 4;
                @media only screen and (min-width: 800px){
                    flex:3;
                }
                div{
                    max-width: 375px;
                    padding:72px 24px;
                    @media only screen and (min-width: 700px){
                        padding: 0 24px;
                    }

                    h2 {
                            font-size: 32px;
                            font-weight: 300;
                            text-transform: uppercase;
                            margin-bottom: 24px;
                            @media (min-width: 700px) {
                            font-size: 40px;
                            }
                        }

                        p {
                            font-size: 15px;
                            font-weight: 300;
                            line-height: 1.7;
                        }

                        .content--preview {
                            font-size: 13px;
                            max-height: 24px;
                            width: 250px;
                            white-space: nowrap;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        .link {
                            display: inline-flex;
                            align-items: center;
                            margin-top: 32px;
                            padding-bottom: 4px;
                            border-bottom: 1px solid transparent;
                            transition: 0.5s ease-in all;

                            &:hover {
                            border-bottom-color: #303030;
                            }
                        }

                        .link--light {
                            &:hover {
                            border-bottom-color: #ffff;
                            }
                        }
                }
            }
            .blog--photo{
                flex: 3;
                box-shadow: var(--slight-shadow);
                 img{
                     display: block;
                     width:100%;
                     min-height: 100%;
                     object-fit: cover;
                 }
                 @media only screen and (min-width: 800px) {
                     flex:4;
                 }

            }

            @media only screen and (min-width: 700px) {
                min-height: 670px;
                max-height: 670px;
            }
            @media only screen and (max-width: 700px) {
                flex-direction: column-reverse !important;
                flex-wrap: wrap;
            }
        }
        .no--user:nth-child(1){
            background-color:var(--primary-clr);
            color: var(--white);
        }
    }
</style>