import {createStore} from 'vuex'
import {jsonp} from "vue-jsonp";
import createPersistedState from "vuex-persistedstate";
import {sleep} from "@/utils/utils";


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
            console.log(userInfo)
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
            try {
                const res = await jsonp(`https://api.vk.com/method/users.search`, {
                    q: q,
                    access_token: ctx.state.accessToken,
                    count: '20',
                    offset: ctx.state.usersOffset,
                    fields: 'name,common_count,sex,photo',
                    v: 5.131
                })
                const payload = res.response.items
                await sleep(200)
                if (ctx.state.usersOffset === 0) {
                    ctx.commit('setFetchedUsers', {fetchedUsers: payload})
                } else {
                    ctx.commit('setFetchedUsers', {fetchedUsers: [...ctx.state.fetchedUsers, ...payload]})
                }
            } catch (e) {
                console.log(e)
            }
        },
        fetchUserFriends: async (ctx, {userIds}) => {
            try {
                let friends = []
                for (const userId of userIds) {
                    const res = await jsonp(`https://api.vk.com/method/users.get`, {
                        user_id: userId,
                        fields: 'name,sex,photo,bdate,counters',
                        access_token: ctx.state.accessToken,
                        offset: ctx.state.userFriendsOffset,
                        v: 5.131
                    })
                    await sleep(200)
                    if (!res.error) {
                        friends.push(res.response[0])
                    }
                }
                ctx.commit('setFetchedUserFriends', {fetchedUserFriends: friends})
            } catch (e) {
                console.log(e)
            }
        },
        fetchCheckedUsersFriends: async (ctx, {userIds}) => {
            try {
                let allFriendsList = []
                let resultFriendsList = []
                let checkedUserIds = {}
                for (const id of userIds) {
                    const res = await jsonp(`https://api.vk.com/method/friends.get`, {
                        user_id: id,
                        fields: 'name,photo_200_orig,bdate,sex,list_id',
                        access_token: ctx.state.accessToken,
                        v: 5.131
                    })
                    if (!res.error) {
                        for (const user of res.response.items) {
                            user['checkedUserId'] = id
                        }
                        allFriendsList = [...allFriendsList, ...res.response.items]
                        console.log(res.response.items)
                    }
                }
                allFriendsList.forEach((user) => {
                    if (checkedUserIds[user.id]) {
                        checkedUserIds[user.id] = [...checkedUserIds[user.id], user.checkedUserId]
                    } else {
                        checkedUserIds[user.id] = [user.checkedUserId]
                    }
                })
                allFriendsList.forEach((user) => {
                    if (checkedUserIds[user.id] && user.first_name !== "DELETED" && user.can_access_closed && !user.is_closed) {
                        user.countCheckedUserMatch = checkedUserIds[user.id].length
                        user.checkedUserInFriends = checkedUserIds[user.id]
                        resultFriendsList.push(user)
                        delete checkedUserIds[user.id]
                    }
                })
                resultFriendsList.sort((a, b) => {
                    return a.last_name.toLowerCase().localeCompare(b.last_name.toLowerCase())
                })
                for (const user of resultFriendsList) {
                    const user_res = await jsonp(`https://api.vk.com/method/users.get`, {
                        user_ids: user.id,
                        access_token: ctx.state.accessToken,
                        fields: 'counters',
                        v: 5.131
                    })
                    // Пришлось добавить задержку в 300мс, так как VK API начинает ругаться на слишком большой rps :(
                    await sleep(300)
                    if (!user_res.error) {
                        user['friends_count'] = user_res.response[0].counters.friends
                    } else {
                        user['friends_count'] = 'Нет информации...'
                    }
                }
                await sleep(200)
                ctx.commit('setFetchedCheckedUsersFriends', {fetchedCheckedUsersFriends: resultFriendsList})
            } catch (e) {
                console.log(e)
            }
        },
        fetchUserWall: async (ctx, {userId}) => {
            try {
                const res = await jsonp(`https://api.vk.com/method/wall.get`, {
                    owner_id: userId,
                    access_token: ctx.state.accessToken,
                    // count: '10',
                    v: 5.131
                })
                const payload = res.response.items
                await sleep(200)
                ctx.commit('setFetchedWall', {fetchedWall: payload})
            } catch (e) {
                console.log(e)
            }

        },
        fetchProfile: async (ctx, {userId}) => {
            try {
                const res = await jsonp(`https://api.vk.com/method/users.get`, {
                    user_ids: userId,
                    access_token: ctx.state.accessToken,
                    fields: 'name,sex,photo_200_orig,bdate,counters',
                    v: 5.131
                })
                const payload = res.response[0]
                await sleep(200)
                ctx.commit('setProfile', {userInfo: payload})
            } catch (e) {
                console.log(e)
            }
        }
    },
    modules: {},
    plugins: [createPersistedState()],
})
