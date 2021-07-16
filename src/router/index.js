import Vue from 'vue'
import VueRouter from 'vue-router'
import appConfig from "@/config/app-config.json";
import { routes } from "./routes.js";
import store from "@/state/store";
import { routeNames } from "@/Consts";

Vue.use(VueRouter)


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, _, next ) => {
  document.title = to.meta.title ? `${to.meta.title } | ${appConfig.title}` : appConfig.title ;
  return next();
})

router.beforeEach((to, _, next) => {
  const isUserOnline = store.getters["user/getUserState"];
  if(to.name === routeNames.auth){
    if(to.params.type === "login" || to.params.type === "register" || to.params.type === "forgot_password"){
        return next();
      }else{
          return next({name: routeNames.home });
      } 
  }
  // ROUTE GUARDS
  if(to.matched.some(route => route.meta.requiresAuth)){
    // checks if the "requiresAuth" elements exists in meta, if not found then the user will be directed anywhere
    // but if found then it will run the next condition
      if(to.meta.requiresAuth){
        //Next, checks whether that "requiredAuth" property is true so they will be cheked for the next condition or false to be directed normally wherever they want
          if(isUserOnline){
            // if online then keep going the path you're willing to go to
            //and if not, you will be redirected to the homepage
            return next();
          }
          return next({name: routeNames.home});
      }
      return next();
  }
  return next();
});

router.beforeEach((to, _, next) => {
  if(to.name === routeNames.auth){
    next(false);
    // if(to.params.type === "login" || to.params.type === "register" || to.params.type === "forgot_password"){
    //     return next();
    //   }else{
    //       return next({name: routeNames.home });
    //   } 
  }
  return next();
});
export default router
