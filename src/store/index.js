import {createStore} from 'vuex'
import {jsonp} from "vue-jsonp";
import createPersistedState from "vuex-persistedstate";


const redirectUri = `http://localhost:8080`

export default createStore({
    state: {
        searchQuery: '',
        checkedUsers: [],
        profile: null,
        accessToken: '',
        fetchedWall: [],
        loggedUserId: null,
        fetchedUsers: [],
        fetchedUserFriends: [],
        fetchedCheckedUsersFriends: [],
        usersOffset: 0,
        userFriendsOffset: 0,
        checkedUsersFriendsOffset: 0,
        postOffset: 0,
    },
    getters: {
        getSearchQuery: (state) => {
            return state.searchQuery
        },
        getAllUsers: (state) => {
            return state.users
        },
        getCheckedUsersFriendsOffset: (state) => {
            return state.checkedUsersFriendsOffset
        },
        getPostOffset: (state) => {
            return state.postOffset
        },
        getUsersOffset: (state) => {
            return state.usersOffset
        },
        getUserFriendsOffset: (state) => {
            return state.userFriendsOffset
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
        setSearchQuery: (state, {q}) => {
            state.searchQuery = q
        },
        setUsersOffset: (state, {offset}) => {
            state.usersOffset = offset
        },
        setUserFriendsOffset: (state, {offset}) => {
            state.userFriendsOffset = offset
        },
        setCheckedUsersOffset: (state, {offset}) => {
            state.checkedUsersFriendsOffset = offset
        },
        setPostOffset: (state, {offset}) => {
            state.postOffset = offset
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
            state.usersOffset = 0
            state.checkedUsersFriendsOffset = 0
            state.postOffset = 0
        }
    },
    actions: {
        loginVK: async (ctx, {appId}) => {
            window.location.href = `https://oauth.vk.com/authorize?client_id=${appId}&display=popup&redirect_uri=${redirectUri}&scope=friends&users&response_type=token&v=v=5.131`
        },
        fetchUsers: async (ctx, {q}) => {
            console.log(ctx.state.usersOffset)
            const res = await jsonp(`https://api.vk.com/method/users.search`, {
                q: q,
                access_token: ctx.state.accessToken,
                count: '20',
                offset: ctx.state.usersOffset,
                fields: 'name,common_count,sex,photo',
                v: 5.131
            })
            const payload = res.response.items
            if (ctx.state.usersOffset === 0) {
                ctx.commit('setFetchedUsers', {fetchedUsers: payload})
            } else {
                ctx.commit('setFetchedUsers', {fetchedUsers: [...ctx.state.fetchedUsers, ...payload]})
            }
        },
        fetchUserFriends: async (ctx, {userId}) => {
            const res = await jsonp(`https://api.vk.com/method/friends.get`, {
                user_id: userId,
                fields: 'name,photo,bdate,common_count,sex',
                access_token: ctx.state.accessToken,
                count: '20',
                offset: ctx.state.userFriendsOffset,
                v: 5.131
            })
            if (res.response.items.length !== 0) {
                const payload = res.response.items
                if (ctx.state.usersOffset === 0) {
                    ctx.commit('setFetchedUserFriends', {fetchedUserFriends: payload})
                } else {
                    ctx.commit('setFetchedUserFriends', {fetchedUserFriends: [...ctx.state.fetchedUserFriends, ...payload]})
                }
            }
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
        },
        fetchProfile: async (ctx, {userId}) => {
            const res = await jsonp(`https://api.vk.com/method/users.get`, {
                user_ids: userId,
                access_token: ctx.state.accessToken,
                fields: 'name,sex,photo_200_orig,bdate,counters',
                v: 5.131
            })
            const payload = res.response[0]
            ctx.commit('setProfile', {userInfo: payload})
        }
    },
    modules: {},
    plugins: [createPersistedState()],
})
