import {createStore} from 'vuex'
import {jsonp} from "vue-jsonp";
import createPersistedState from "vuex-persistedstate";

export default createStore({
    state: {
        checkedUsers: [],
        profile: null,
        accessToken: '',
        fetchedWall: [],
        loggedUserId: null,
        fetchedUsers: [],
        fetchedUserFriends: [],
        fetchedCheckedUsersFriends: []
    },
    getters: {
        getAllUsers: (state) => {
            return state.users
        },
        getCheckedUsers: (state) => {
            return state.checkedUsers
        },
        getFetchedUsers: (state) => {
            return state.fetchedUsers
        },
        getFetchedUserFriends: (state) => {
            return state.fetchedUserFriends
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
        setCheckedUsers: (state, {checkedUsers}) => {
            state.checkedUsers = checkedUsers
        },
        setFetchedUsers: (state, {fetchedUsers}) => {
            state.fetchedUsers = fetchedUsers
        },
        setFetchedUserFriends: (state, {fetchedUserFriends}) => {
            state.fetchedUserFriends = fetchedUserFriends
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
        },
        logout: (state) => {
            state.checkedUsers = []
            state.profile = null
            state.accessToken = ''
            state.fetchedWall = []
            state.loggedUserId = null
            state.fetchedUsers = []
            state.fetchedUserFriends = []
            state.fetchedCheckedUsersFriends = []
        }
    },
    actions: {
        loginVK: async (ctx, {appId}) => {
            window.location.href = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=http://localhost:8080&scope=friends&users&response_type=token&v=v=5.131`
        },
        fetchUsers: async (ctx, {q}) => {
            const res = await jsonp(`https://api.vk.com/method/users.search`, {
                q: q,
                access_token: ctx.state.accessToken,
                count: '20',
                v: 5.131
            })
            const payload = res.response.items
            ctx.commit('setFetchedUsers', {fetchedUsers: payload})
        },
        fetchUserFriends: async (ctx, {userId}) => {
            const res = await jsonp(`https://api.vk.com/method/friends.get`, {
                user_id: userId,
                fields: 'name,photo,bdate,common_count, sex',
                access_token: ctx.state.accessToken,
                count: '20',
                v: 5.131
            })
            const payload = res.response.items
            ctx.commit('setFetchedUserFriends', {fetchedUserFriends: payload})
        },
        fetchCheckedUsersFriends: async (ctx, {userIds}) => {
            function sleep(ms) {
                return new Promise(resolve => setTimeout(resolve, ms));
            }
            let allFriendsList = []
            let resultFriendsList = []
            let checkedUserIds = {}
            for (const id of userIds) {
                const res = await jsonp(`https://api.vk.com/method/friends.get`, {
                    user_id: id,
                    fields: 'name,photo_200_orig,bdate,sex',
                    access_token: ctx.state.accessToken,
                    v: 5.131
                })
                if (!res.error) {
                    allFriendsList = [...allFriendsList, ...res.response.items]
                }
                await sleep(400)
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
            resultFriendsList.sort((a, b) => {
                return a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase())
            })
            console.log(resultFriendsList)
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
