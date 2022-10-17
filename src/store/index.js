import {createStore} from 'vuex'
import {jsonp} from "vue-jsonp";
import createPersistedState from "vuex-persistedstate";

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
        fetchedWall: [],
        loggedUserId: null,
        fetchedCheckedUsersFriends: []

    },
    getters: {
        getAllUsers: (state) => {
            return state.users
        },
        getFetchedUsers: (state) => {
            return state.fetchedUsers
        },
        getFetchedCheckedUsersFriends: (state) => {
            return state.fetchedCheckedUsersFriends
        },
        getFetchedWall: (state) => {
            return state.fetchedWall
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
        setFetchedCheckedUsersFriends: (state, {fetchedCheckedUsersFriends}) => {
            state.fetchedCheckedUsersFriends = fetchedCheckedUsersFriends
        },
        setFetchedWall: (state, {fetchedWall}) => {
            state.fetchedWall = fetchedWall
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
                fields: 'name,photo,bdate,common_count',
                access_token: ctx.state.accessToken,
                count: '20',
                v: 5.131
            })
            const payload = res.response.items
            ctx.commit('setFetchedUsers', {fetchedUsers: payload})
        },
        fetchCheckedUsersFriends: async (ctx, {userIds}) => {
            let allFriendsList = []
            let resultFriendsList = []
            let checkedUserIds = {}
            for (const id of userIds) {
                const res = await jsonp(`https://api.vk.com/method/friends.get`, {
                    user_id: id,
                    fields: 'name,photo_200_orig,bdate,common_count',
                    access_token: ctx.state.accessToken,
                    v: 5.131
                })
                allFriendsList = [...allFriendsList, ...res.response.items]
            }
            allFriendsList.forEach((user) => {
                if (checkedUserIds[user.id]) {
                    checkedUserIds[user.id] += 1
                } else {
                    checkedUserIds[user.id] = 1
                }
            })
            allFriendsList.forEach((user) => {
                if (checkedUserIds[user.id] && user.first_name !== "DELETED") {
                    user.countCheckedUserMatch = checkedUserIds[user.id]
                    resultFriendsList.push(user)
                    delete checkedUserIds[user.id]
                }
            })
            resultFriendsList.sort((a,b) => {
                return a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase())
            })
            ctx.commit('setFetchedCheckedUsersFriends', {fetchedCheckedUsersFriends: resultFriendsList})
        },
        fetchUserWall: async (ctx, {userId}) => {
            const res = await jsonp(`https://api.vk.com/method/wall.get`, {
                owner_id: userId,
                access_token: ctx.state.accessToken,
                count: '10',
                v: 5.131
            })
            const payload = res.response.items
            ctx.commit('setFetchedWall', {fetchedWall: payload})
        }
    },
    modules: {},
    plugins: [createPersistedState()],
})
