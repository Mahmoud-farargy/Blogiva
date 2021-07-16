"use strict"
export const routeNames = Object.freeze({
    blogs: "Blogs",
    home: "Home",
    auth: "Authentication",
    admin: "Admin",
    profile: "Profile",
    createPost: "CreatePost",
    blogPreview: "BlogPreview",
    viewPost: "ViewPost",
    updatePost: "UpdatePost"
});

export const authTypes = Object.freeze({
    login: "login",
    register: "register",
    forgotPassword: "forgot_password"
});

export const mainCollection = "users";