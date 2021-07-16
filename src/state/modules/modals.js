export const state = {
    modals: {
        lev4: {
            message: {
                state: false,
                payload: "hello"
            },
        },
        lev3: {
            coverPreview:{
                state: false,
                payload: ""
            }
        },
        lev2: {
            
        },
        lev1: {
            
        }

    }
}

export const mutations = {
    updateModals: (state, payload) => {
        const { level, type, val, data } = payload;
        if(type, level){
           state.modals['lev'+level][type].state = (typeof val !== "undefined") ? val : !state.modals['lev'+level][type].state;
           state.modals['lev'+level][type].payload = val ? data : "";
        }
    },
    closeModalLevel: (state, payload) => {
        const {level} = payload;
       
        if(payload, level){
            // Do not include a level of 0 here as it well be translated into false. Therefore, this code won't be reached.
            var currentLevel = state.modals['lev'+level];
            let modalsCopy = JSON.parse(JSON.stringify(currentLevel));
            Object.values(modalsCopy)?.map(el => {
                el.state = false;
                el.payload = "";
            });
            state.modals['lev'+level] = modalsCopy;
        }
    },
    closeAllModals: state => {
        let modalsCopy = JSON.parse(JSON.stringify(state.modals));
        Object.values(modalsCopy)?.map(level => Object.values(level).map(modal => {
            modal.state = false;
            modal.payload = "";
        }));
        state.modals = modalsCopy;
    }
}

export const actions = {
    updateModals: (state, payload) => {
        state.commit("updateModals", payload);
        return;
    },
    closeModalLevel: (state, payload) => {
        state.commit("closeModalLevel", payload) ;
        return;
    },
    closeAllModals: state => {
        state.commit("closeAllModals");
        return;
    }
}

export const getters = {
    getModals: state => {
        return state.modals;
    }
}