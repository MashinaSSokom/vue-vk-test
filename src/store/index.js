import {createStore} from 'vuex'
import {jsonp} from "vue-jsonp";

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
        fetchedUsers: [],
        loggedUserId: null

    },
    getters: {
        getAllUsers: (state) => {
            return state.users
        },
        getFetchedUsers: (state) => {
            return state.fetchedUsers
        },
        isLoggedIn: (state) => {
            return !!state.accessToken
        },
        getProfile: (state) => {
            return state.profile
        },
        getAccessToken: (state) => {
            return state.accessToken
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
        setFetchedUsers: (state, {fetchedUsers}) => {
            state.fetchedUsers = fetchedUsers
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
        fetchUserFriends: async (ctx, {userId}) => {
            const res = await jsonp(`https://api.vk.com/method/friends.get`, {
                user_id: userId,
                fields: 'name,photo,bdate',
                access_token: ctx.state.accessToken,
                count: '20',
                v: 5.131
            })
            const payload = res.response.items
            ctx.commit('setFetchedUsers', {fetchedUsers: payload})
        }
    },
    modules: {}
})
