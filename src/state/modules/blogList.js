import { db } from "../../../config/firebase";
import { mainCollection } from "@/Consts";
import { handleLoading } from "@/utilities.js";
import store from "../store";
export const state = {
  receivedData: [],
  profileInitials: "",
  blog: {
    file: {},
    blogTitle: "",
    blogHTML: "",
    blogPhotoFileURL: "",
    blogPhotoPreview: null,
    blogPhotoName: "",
  }
};

export const mutations = {
  updateBlogs: (state, payload) => {
    state.receivedData = payload;
    const info = payload.userInfo;
    if(info?.firstName && info?.lastName){
      state.profileInitials = info?.firstName.match(/(\b\S)?/g).join("") + info?.lastName.match(/(\b\S)?/g).join("");
    }
  },
  clearData: state => {
    state.receivedData = [],
    state.profileInitials = "";
    state.blog ={
      file: {},
      blogTitle: "",
      blogHTML: "",
      blogPhotoFileURL: "",
      blogPhotoPreview: null,
      blogPhotoName: "",
    }
  },
  updateBlogObj: (state, payload) => {
    const { newObj } = payload;
    if(newObj) {
      state.blog = newObj
    }
  },
};

export const actions = {
  updateBlogs: ({commit}) => {
    const uid = store.getters["user/getUID"];
    if (uid) {
     handleLoading("globalLoading", true);
    new Promise((resolve, reject) => {
        db.collection(mainCollection)
          .doc(uid)
          .onSnapshot((res) => {
            const actualData = res?.data();
            handleLoading("globalLoading", false);
            if (res && actualData) {
              commit("updateBlogs", actualData);
              resolve();
            } else {
              reject();
            }
          });
      });
    }
    return; //end of execution
  },
  clearData: state => {
      state.commit("clearData");
  },
  updateBlogObj: (state, payload) => {
    state.commit("updateBlogObj", payload);
  }
};

export const getters = {
  getReceivedData: state => {
    return state.receivedData;
  },
  profileInitials: state => {
    return state.profileInitials;
  },
  getBlogItem: state => {
    return state.blog;
  }
};
