<template>
  <div class="search">
    <template v-if="this.isLoggedIn">

      <button class="search__button" @click="clickSearchButtonHandler">Построить</button>
      <div class="search__wrapper">
        <template v-if="this.getFetchedUsers">
          <div class="search__container">
            <input v-model="searchString" @input="() => findUsers(searchString)"/>
            <div class="search-list">
              <template v-for="user in this.getFetchedUsers" :key="user.id">
                <div class="search-list__user" @click="() => userClickHandler(user.id)">
                  <img :src="user.photo" alt="">
                  <p>id: {{ user.id }}</p>
                  <router-link :to="`/profile/${user.id}`"><p>{{ `${user.first_name} ${user.last_name}` }}</p>
                  </router-link>
                  <p>Общих друзей: {{ user.common_count }}</p>
                </div>
                <!--TODO: Подгрузка следующих 20-->
              </template>
            </div>
          </div>

        </template>
        <div class="search__checked-users">
          <p>ID выбранных пользователей:</p>
          <ul>
            <template v-for="id in checkedUsersIds" :key="id">
              <li>{{ id }}</li>
            </template>
          </ul>
        </div>
        <div class="fetched-users">
          <p>Найденные друзья выбранных пользователей:</p>
          <div class="fetched-users__container">
            <template v-for="user in this.getFetchedCheckedUsersFriends" :key="user.id">
              <div class="user-card">
                <img :src="user.photo_200_orig" class="user-card__avatar" alt="Avatar">
                <p>{{ `${user.last_name} ${user.first_name}` }}</p>
                <p>Общих выбранных друзей: {{ user.countCheckedUserMatch }}</p>
              </div>
            </template>
          </div>
        </div>
      </div>

    </template>
    <template v-else>
      <p>Для начала войдите через ВК</p>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "SearchUsers",
  data() {
    return {
      searchString: '',
      foundUsers: [],
      checkedUsersIds: [],
      searchActive: false
    }
  },
  beforeMount() {
    // Первоначально заполняем первыми 20-тью пользователями
    this.foundUsers = this.getAllUsers.slice(0, 20)
  },
  computed: {
    ...mapGetters(['getAllUsers', 'isLoggedIn', "getLoggedUserId", 'getFetchedUsers', 'getFetchedCheckedUsersFriends']),
  },
  methods: {
    ...mapActions(['fetchUserFriends', 'fetchCheckedUsersFriends']),
    findUsers(searchString) {
      this.foundUsers = this.getAllUsers.filter((user) =>
          user.name.toLowerCase().startsWith(searchString.toLowerCase())
      )
    },
    clickSearchButtonHandler() {
      if (this.checkedUsersIds.length === 0) {
        this.fetchUserFriends({userId: this.getLoggedUserId})
      } else {
        this.fetchCheckedUsersFriends({userIds: this.checkedUsersIds})
      }
    },
    userClickHandler(userId) {

      const index = this.checkedUsersIds.indexOf(userId)
      if (index === -1) {
        this.checkedUsersIds.push(userId)
      } else {
        this.checkedUsersIds.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search {
  //display: flex;
  //flex-direction: column;;
  //justify-content: center;
  .search__wrapper {
    display: flex;
  }

  .search__container {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-right: 20px;
  }

  .search__checked-users {
    min-width: 200px;
    height: 250px;
    border: 1px solid grey;
    overflow-y: scroll;
  }

  .search-list {
    display: flex;
    justify-content: center;
    flex-direction: column;
    //width: 75%;
    height: 500px;
    overflow-y: scroll;

    .search-list__user {
      display: flex;
      flex: 1;
      width: 500px;
      border: 1px solid grey;
    }

    .search-list__user:hover {
      background: greenyellow;
    }

  }

  .fetched-users {

    //width: 750px;


    .fetched-users__container {
      display: flex;
      flex-wrap: wrap;

      .user-card {
        width: 210px;
        height: 350px;
        border: 1px solid grey;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        padding: 5px;
        margin: 2px;

        .user-card__avatar {
          border-radius: 15px;
          width: 200px;
          height: 200px;
        }
      }
    }
  }

}


</style>