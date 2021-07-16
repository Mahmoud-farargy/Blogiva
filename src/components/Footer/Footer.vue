<template>
  <footer>
    <!-- <img class="wavy--footer" src="https://www.macmillandictionary.com/us/external/images/bg-wave-white.svg?version=4.0.54" alt="" /> -->
    <div class="container">
      <div class="left">
        <div class="col-1">
          <router-link class="header" :to="{ name: routeNames.home }">{{
            appTitle
          }}</router-link>
          <ul>
            <li>
              <a href="#">
                <i class="fab fa-youtube svg-icon"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-twitter svg-icon"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-instagram svg-icon"></i>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="fab fa-linkedin svg-icon"></i>
              </a>
            </li>
          </ul>
        </div>
        <div class="col-2">
          <ul>
            <router-link tag="li" class="link" :to="{ name: routeNames.home }"
              >Home</router-link
            >
            <router-link tag="li" class="link" :to="{ name: routeNames.blogs }"
              >Blogs</router-link
            >
            <router-link
              tag="li"
            
              class="link"
              :to="{ name: routeNames.createPost }"
              >Create Post</router-link
            >
             <!-- v-if="admin" -->
            <router-link
              tag="li"
              v-if="!isUserOnline"
              class="link"
              :to="{ name: routeNames.auth, params: {type: 'login'}}"
              >Login In / Register</router-link
            >
          </ul>
        </div>
      </div>
      <div class="right">
        <p>Copyright Mahmoud Farargy 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import appConfig from "@/config/app-config.json";
import { routeNames } from "../../Consts";
import { mapGetters } from 'vuex';

export default {
  name: "Footer",
  data() {
    return {
      appTitle: appConfig.title || "Blogiva",
      routeNames
    };
  },
  computed: {
    ...mapGetters("user", {isUserOnline:"getUserState"}),
  },
};
</script>

<style lang="scss" scoped>
footer {
  .wavy--footer {
    width: 100%;
    fill:#fff;
  }
  margin-top: auto;
  padding: 100px 25px;
  background-color: var(--primary-clr);
  .container {
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (min-width: 800px) {
      flex-direction: row;
      gap: 0px;
    }

    > div {
      display: flex;
      flex: 1;
    }

    .left {
      gap: 32px;
      color: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      @media (min-width: 800px) {
        flex-direction: row;
        align-items: initial;
        gap: 0;
      }

      .header {
        text-align: center;
        font-size: 24px;
        color: #fff;
        margin-bottom: 16px;
        text-decoration: none;
        font-weight: 600;
        @media (min-width: 800px) {
          text-align: initial;
        }
      }
      ul {
        gap: 16px;
        list-style: none;
        display: flex;
      }

      .col-1,
      .col-2 {
        gap: 32px;
        display: flex;
        flex: 1;
        @media (min-width: 800px) {
          gap: 0;
        }
      }

      .col-1 {
        flex-direction: column;

        h2 {
          text-align: center;
          @media (min-width: 800px) {
            text-align: initial;
          }
        }
        ul {
          margin-top: auto;

          li {
            display: flex;
            align-items: center;
            .svg-icon {
              font-size: 24px;
              height: auto;
              color: #fff;
              transition: 0.5s ease all;
              cursor: pointer;

              &:hover {
                color: var(--secondary-clr);
                transform: translateY(-2px);
              }
            }
          }
        }
      }

      .col-2 {
        ul {
          height: 100%;
          justify-content: center;
          flex-direction: row;
          flex-wrap: wrap;
          @media (min-width: 800px) {
            flex-direction: column;
          }
          .link {
            font-size: 16px;
            font-weight: 500;
            color: #fff;
            text-decoration: none;
            text-transform: capitalize;
            transition: 0.5s ease all;
            &:hover{
                 color: var(--secondary-clr);
            }
          }
        }
      }
    }

    .right {
      gap: 32px;
      color: #fff;
      align-items: center;
      flex-direction: column;
      @media (min-width: 800px) {
        align-items: flex-end;
        gap: 0;
      }
    }

    p {
      margin-top: auto;
    }
  }
}
</style>
