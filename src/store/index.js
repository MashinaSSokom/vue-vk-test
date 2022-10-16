import {createStore} from 'vuex'
// import axios from "axios";

export default createStore({
    state: {
        users: [
            {
                id: 1,
                name: 'Ivan',
                friends: [2, 3]
            },
            {
                id: 2,
                name: 'Fedor',
                friends: [1]
            },
            {
                id: 3,
                name: 'Maria',
                friends: [1]
            }
        ],
        profile: null,
        accessToken: '',
        // isLoggedIn: false,

    },
    getters: {
        getAllUsers: (state) => {
            return state.users
        },
        isLoggedIn: (state) => {
            return !!state.accessToken
        },
        getProfile: (state) => {
            return state.profile
        }

    },
    mutations: {
        setAccessToken: (state, {token}) => {
            state.accessToken = token
        },
        setUsers: (state, {users}) => {
            state.users = users
        },
        profile: (state, {userInfo}) => {
            state.profile = userInfo
        }
    },
    actions: {
        loginVK: async (ctx, {appId}) => {
            window.location.href = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=http://localhost:8080&scope=friends&users&response_type=token&v=v=5.131`
        }
    },
    modules: {}
})
