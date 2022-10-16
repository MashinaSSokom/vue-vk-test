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
        loggedUserId: null

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
        },
        getLoggedUserId: (state) => {
            return state.loggedUserId
        }

    },
    mutations: {
        setAccessToken: (state, {token}) => {
            state.accessToken = token
        },
        setUsers: (state, {users}) => {
            state.users = users
        },
        setProfile: (state, {userInfo}) => {
            state.profile = userInfo
        },
        setLoggedUserId: (state, {userId}) => {
            state.loggedUserId = userId
        }
    },
    actions: {
        loginVK: async (ctx, {appId}) => {
            window.location.href = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=http://localhost:8080&scope=friends&users&response_type=token&v=v=5.131`
        },
        getUserFriends: async (ctx, {userId}) => {
            console.log(userId)
        }
    },
    modules: {}
})
