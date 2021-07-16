
import Home from '@/views/Home.vue'
import * as Consts from "@/Consts";

export const routes = [
    {
      path: '/',
      name: Consts.routeNames.home,
      component: Home,
      meta: {
        title: "Home",
        requiresAuth: false
      }
    },
    {
      path: '/blogs',
      name: Consts.routeNames.blogs,
      meta: {
        title: "Blogs",
        requiresAuth: false
      },
      component: () => import('../views/Blogs.vue'),
    },
    {
      path: '/profile',
      name: Consts.routeNames.profile,
      meta: {
        title: "Profile",
        requiresAuth: true
      },
      component: () => import('../views/Profile.vue'),
    },
    {
        path: '/createpost',
        name: Consts.routeNames.createPost,
        meta: {
          title: "Create a post",
          requiresAuth: true
        },
        component: () => import('../views/CreatePost.vue'),
      },
      {
        path: '/updatepost/:blogId',
        name: Consts.routeNames.updatePost,
        meta: {
          title: "Update post",
          requiresAuth: true
        },
        component: () => import('../views/CreatePost.vue'),
      },
    {
      path: '/admin',
      name: Consts.routeNames.admin,
      meta: {
        title: "Admin",
        requiresAuth: true
      },
      component: () => import('../views/Admin.vue'),
    },
    {
      path: '/blogpreview',
      name: Consts.routeNames.blogPreview,
      meta: {
        title: "Blog preview",
        requiresAuth: true
      },
      component: () => import('../views/BlogPreview.vue'),
    },
    {
      path: '/authentication/:type',
      name: Consts.routeNames.auth,
      meta: {
        title: "Authentication",
        requiresAuth: false
      },
      props: () => ({type: "login"}),
      component: () => import('../views/Authentication/Authentication.vue'),
    },
    {
      path: '/viewblog/:blogId',
      name: Consts.routeNames.viewPost,
      meta: {
        title: "View Post",
        requiresAuth: false
      },
      component: () => import('../views/ViewBlog.vue'),
    },
  ]