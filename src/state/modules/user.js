export const state = {
    uid: "",
    userState: false
}

export const mutations = {
    updateUID: (state, newUid) => {
        state.uid = newUid;
    },
    updateUserState: (state, bool) => {
        state.userState = bool;
    }
}

export const actions = {
    updateUID: (state, payload) => {
        state.commit("updateUID", payload);
    },
    updateUserState: (state, bool) => {
        state.commit("updateUserState", bool);
       
    }
}


export const getters = {
    getUID: state => {
        return state.uid;
    },
    getUserState: state => {
        return state.userState;
    }
}