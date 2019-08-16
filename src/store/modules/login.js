const state = {
    username: null,
    password: null,
};

const getters = {
    loginInfo: (state) => {
        return state
    },
    isLoggedIn: (state) => {
        return (state.username && state.password)
    }
};

const actions = {
    doLogin ({commit}, {username, password}) {
        commit('setLogin', {
            username,
            password
        })
    },
    logout ({commit}) {
        commit('setLogin', {
            username: '',
            password: ''
        })
    }
};

const mutations = {
    setLogin: (state, loginInfo) => {
        state.username = loginInfo.username;
        state.password = loginInfo.password;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}