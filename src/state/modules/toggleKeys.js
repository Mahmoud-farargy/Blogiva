export const state = {
    loading: {
        auth: false,
        fetchingBlogs: false,
        globalLoading: false
    },
    profileMenu: false
}

export const mutations = {
    changeLoading: (state, payload) => {
        const { type, val } = payload;
        if(type) state.loading[type] = (typeof val !== 'undefined') ? val : ! state.loading[type];
    },
    changeKeys: (state, payload) => {
        const {key, val} = payload;
        state[key] = (typeof val !== 'undefined') ? val : ! state[key]
    }
}

export const actions = {
    changeLoading: (state, payload) => {
        state.commit("changeLoading", payload);
        return;
    },
    changeKeys: (state, payload) => {
        state.commit("changeKeys", payload);
        return;
    }
}


export const getters = {
    getLoadingState: state => {
        return state.loading;
    },
    getKeys: state => {
        return state;
    }
}