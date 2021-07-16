import { db, auth, storageRef } from "./config/firebase";
import store from "./state/store";
import router from "./router/index";
import Vue from "vue";
import appConfig from "./config/app-config.json";
import * as Consts from "./Consts";

export const defaultErrMsg = "An error has occurred";
export const notify = ({ type, msg }) => {
    // The notification types are success, info, warning, error, default
    Vue.$toast.open({
      message: msg,
      type: type,
      duration: 6000,
      pauseOnHover: true,
    });
  };

export const generateNewId = () => `${Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 20)}_${Math.random() * 10}`;
export const handleLoading = (type, val) => {
    store.dispatch("toggleKeys/changeLoading", {type, val});
}
export const updateBlogs = () => {
    store.dispatch("blogList/updateBlogs");
} 
export const redirectUser = (name) => {
    router.push({name});
}
const catchCondition = (err) => {
    handleLoading('globalLoading', false);
    notify({ type: "error", msg: err.message || defaultErrMsg });
}
export const login = ({ email: email, password: password }) => {
    if(email && password){
        handleLoading('globalLoading', true);
        return new Promise((resolve, reject) => {
            auth.signInWithEmailAndPassword(email, password)
                .then(() => {
                    // success
                    handleLoading('globalLoading', false);
                    notify({ type: "info", msg: "Welcome back. We are glad to see you again."});
                    redirectUser(Consts.routeNames.home);
                    store.dispatch("user/updateUserState", true);
                    resolve();
                }).catch(err => {
                    // fail
                    catchCondition(err);
                    reject();
                })
        });
    }
};

export const signUp = ({email, password, firstName, lastName, userName}) => {
    if(email && password && firstName && lastName && userName){
        const capitalize = (word) => {
            return word ? `${word.slice(0,1).toUpperCase()}${word.slice(1)}` : '';
        };
        const capitalizedFirstName = capitalize(firstName);
        const capitalizedLastName = capitalize(lastName);
        handleLoading('globalLoading', true);
        return new Promise((resolve, reject) => {
            auth.createUserWithEmailAndPassword(email, password)
                .then((cred) => {
                    // succeeded to create an account
                    db.collection(Consts.mainCollection)
                        .doc(cred.user.uid)
                        .set({
                            uid: cred.user.uid,
                            blogs: [],
                            userInfo: {
                                firstName: capitalizedFirstName,
                                lastName: capitalizedLastName,
                                userName,
                                email,
                                registerMethod: "email",
                                themeMode: 'light'
                            }
                        }).then(() => {
                            // succeeded to add an initial data
                            handleLoading('globalLoading', false);
                            notify({ type: "info", msg: `Welcome to ${appConfig.title}, ${capitalizedFirstName} ${capitalizedLastName}. Start by adding new blog posts to your account.`});
                            redirectUser(Consts.routeNames.home);
                            store.dispatch("user/updateUserState", true);
                            resolve();
                        }).catch(err => {
                            // failed to create initial data
                            catchCondition(err);
                            reject();
                        });

                }).catch(err => {
                    // failed to sign up
                    catchCondition(err);
                    reject();
                })
        });
    }
}

export const resetPassword = ({email}) => {
    if(email){
        return new Promise((resolve, reject) => {
            auth.sendPasswordResetEmail(email)
                .then(() => {
                    notify({ type: "success", msg: "A reset message has been sent to your email. Please Check it out and follow the instructions to reset your password."});
                    redirectUser(Consts.routeNames.home);
                    resolve();
                }).catch(err => {
                    catchCondition(err);
                    reject();
                });
        });
    }
}

export const signOut = () => {
    handleLoading('globalLoading', true);
    return new Promise ((resolve, reject) => {
        auth.signOut().then(() => {
            handleLoading('globalLoading', false);
            store.dispatch("user/updateUserState", false);
            notify({ type: "default", msg: "You are now logged out."});
            store.dispatch("blogList/clearData");
            store.dispatch("user/updateUID", "");
            localStorage.clear();
            redirectUser(Consts.routeNames.home);
            resolve();
            // window.location.reload();
        }).catch(() => {
            handleLoading('globalLoading', false);
            reject();
        });
    });
}

export const updateParts = (baseKey, newState) => {
    return new Promise ((resolve, reject) => {
        const myUid = store.getters["user/getUID"];
        if( myUid && baseKey && newState && !Object.values(newState).some( key => key === 'undefined')){
                db.collection(Consts.mainCollection)
                    .doc(myUid)
                    .update({
                        [baseKey] : newState
                    }).then(() => {
                        resolve();
                    }).catch(err => {
                        notify({ type: "error", msg: err.message || defaultErrMsg });
                        reject();
                    })
        
        }else{
            reject();
            notify({type: "error", msg: defaultErrMsg});
        }
     })
}

export const updateUserInfo = (newForm) => {
    const myInfo = store.getters["blogList/getReceivedData"];
    let userInfoCopy = JSON.parse(JSON.stringify((myInfo && myInfo.userInfo) ? myInfo.userInfo : []));
    Object.keys( newForm ).map(key => {
        userInfoCopy[key] = newForm[key];
    })
    if(userInfoCopy && Object.keys(userInfoCopy).length > 0){
        updateParts("userInfo", userInfoCopy);
        store.dispatch("modals/updateModals", {level: 4, type: "message", val: true, data: "Profile Updated."});
        // store.dispatch("modals/updateModals", ({level: 3, type: "coverPreview", val: true,  }));
    }
}

export const uploadBlogPost = (payload) => {
    const generatdBlogIg = generateNewId();
        const myInfo = store.getters["blogList/getReceivedData"];
        const myUid = store.getters["user/getUID"];
        const { blogHTML, blogTitle , file, blogPhotoName, method = "create", blogId, uploadedCoverUrl, blogDate } = payload;

    return new Promise((resolve, reject) => {
        if(blogHTML && blogTitle && (file || uploadedCoverUrl) && blogPhotoName){
                if(myUid){
                    const storeOnFb = ({newObj, method}) => {
                        updateParts("blogs", newObj).then(() => {
                            resolve();
                            notify({ type: "success", msg: ` ${ method === 'create' ? "Blog has been added." : "Saved."}.` });
                            handleLoading('globalLoading', false);
                            if( blogId || generatdBlogIg){
                                router.push({name: Consts.routeNames.viewPost, params: {blogId: method === "create" ? generatdBlogIg : method === "update" ? blogId : generatdBlogIg}});
                            }else{
                                redirectUser(Consts.routeNames.home);
                            }
                        
                        }).catch(() => {
                            reject();
                            handleLoading('globalLoading', false);
                        });
                    // --res ---
                    }
                    const timestamp = Date.now();
                    let blogsCopy = (myInfo && myInfo.blogs) ? JSON.parse(JSON.stringify(myInfo?.blogs)) : null;
                    if(blogsCopy !== null){
                        if(method.toLowerCase() === "create"){
                            const metadata = {
                                contentType: file.type || "" ,
                            };
                                handleLoading('globalLoading', true);
                                const docRef = storageRef.child(`blogCoverPhotos/${myUid}/${blogPhotoName}`);
                                docRef.put(file, metadata).on(
                                "state_changed",
                                () => {
                                },
                                (err) => {
                                    handleLoading('globalLoading', false);
                                    notify({type: "error", msg: err});
                                },
                                async () => {
                                    handleLoading('globalLoading', false);
                                    const downloadURL = await docRef.getDownloadURL();
                                    //    res
                                    const ObjToUpload = {
                                        blogCoverPhoto: downloadURL,
                                        blogId: generatdBlogIg,
                                        blogPhotoName,
                                        blogHTML,
                                        blogTitle,
                                        blogDate: timestamp
                                    }
                                    blogsCopy.push(ObjToUpload);
                                    if(Object.keys(blogsCopy).length > 0){
                                            blogsCopy = Array.from(
                                                new Set(blogsCopy.map((itemId) => itemId.blogId))
                                            ).map((myId) => blogsCopy.find((el) => el.blogId === myId));
                                            storeOnFb({newObj: blogsCopy, method: 'create'});
                                    }else{
                                        reject();
                                    }
                                    // --res ---
                                    }
                                );
                        }else if(method.toLowerCase() === "update" && blogId){
                            const blogIndex = blogsCopy?.map(blog => blog.blogId).indexOf(blogId);
                            if(blogIndex  !== -1){
                                const updatedObj = {
                                    blogCoverPhoto: uploadedCoverUrl,
                                    blogTitle,
                                    blogHTML,
                                    blogPhotoName,
                                    blogId,
                                    blogDate
                                }
                               Object.keys(updatedObj).map((prop => {
                                    blogsCopy[blogIndex][prop] = updatedObj[prop]
                                }));
                                storeOnFb({newObj: blogsCopy, method: 'update'});
                            }else{
                                reject();
                                notify({type: "error", msg: "An error occurred while updating. Please try again later."});
                            }
                        
                        }
                    }else{
                        reject();
                    }

                }else{
                    reject();
                }
                // ----xxxx--xxxxx
        }else{
            reject();
        }
    })
}
export const deleteContentFromFB = (root, path) =>{
    const myUid = store.getters["user/getUID"];
    return new Promise((resolve, reject) => {
    myUid &&
      path &&
        root &&
        storageRef
          .child(`${root}/${myUid}/${path}`)
          .delete()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err.message);
          });
    });
  }
export const deletePost = (blogId) => {
    const myInfo = store.getters["blogList/getReceivedData"];
    return new Promise((resolve, reject) => {
        let blogsCopy = (myInfo && myInfo.blogs) ? JSON.parse(JSON.stringify(myInfo?.blogs)) : null;
        if(blogsCopy !== null && blogsCopy.length >0){
           const index = myInfo.blogs.map(post => post.blogId).indexOf(blogId);
           if(index !== -1 && myInfo.blogs[index]){
               const el = myInfo.blogs[index];
               deleteContentFromFB("blogCoverPhotos", el.blogPhotoName);
               blogsCopy.splice(index,1);
               updateParts("blogs", blogsCopy).then(() => {
                    notify({type: "success", msg: "Deleted."});
                    resolve();
               }).catch(() => {
                  notify({type: "error", msg: defaultErrMsg});
                   reject();
               });
              
           }else{
               reject();
           }
        }else{
            reject();
        }
    });
};