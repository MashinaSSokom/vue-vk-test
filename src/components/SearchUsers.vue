<template>
  <div class="search">
    <template v-if="this.isLoggedIn">
      <div class="search__wrapper">
        <template v-if="this.getFetchedUsers">
          <div class="search__menu">
            <div class="search__container">
              <my-input v-model="this.searchQuery"
                        @change="handleChange"
                        @focus="() => this.searchActive=true"
                        @focusout="() => this.searchActive=false"/>
              <my-button @click="clickSearchButtonHandler">Найти</my-button>
              <p class="search__close-results" v-show="showSearchedUsers" @click="closeSearchResults">Скрыть
                результаты...</p>
            </div>
            <div class="search-list" v-show="showSearchedUsers" v-click-outside="clickOutsideSearchMenuHandler">
              <template v-for="user in this.getFetchedUsers" :key="user.id">
                <div class="search-list__user" @click="() => userClickHandler(user)">
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
        <my-button class="search__button" @click="clickComputeButtonHandler">Построить</my-button>
        <div class="search__checked-users">
          <p>ID выбранных пользователей:</p>
          <ul>
            <template v-for="user in checkedUsersIds" :key="user.id">
              <li>
                <p>{{ user.id }}</p>
                <p>{{ user.name }}</p>
              </li>
            </template>
          </ul>
        </div>
        <div v-show="false">

          <div class="fetched-users">
            <p>Найденные друзья выбранных пользователей:</p>
            <div class="fetched-users__container">
              <template v-for="user in this.getFetchedCheckedUsersFriends" :key="user.id">
                <div class="user-card">
                  <img :src="user.photo_200_orig" class="user-card__avatar" alt="Avatar">
                  <p>{{ `${user.last_name} ${user.first_name}` }}</p>
                  <p>Друзей среди выбранных пользователей: {{ user.countCheckedUserMatch }}</p>
                </div>
              </template>
            </div>
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
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";
import ClickOutside from 'vue-click-outside'

export default {
  name: "SearchUsers",
  components: {MyInput, MyButton},
  data() {
    return {
      foundUsers: [],
      checkedUsersIds: [],
      searchActive: false,
      searchQuery: '',
      showSearchedUsers: false
    }
  },
  beforeMount() {
    // Первоначально заполняем первыми 20-тью пользователями
    this.foundUsers = this.getAllUsers.slice(0, 20)
  },
  computed: {
    ...mapGetters(['getAllUsers', 'isLoggedIn', "getLoggedUserId", 'getFetchedUsers', 'getFetchedUserFriends', 'getFetchedCheckedUsersFriends']),
  },
  methods: {
    ...mapActions(['fetchUserFriends', 'fetchCheckedUsersFriends', "fetchUsers"]),
    handleChange(e) {
      this.searchQuery = e.target.value
    },
    closeSearchResults() {
      this.showSearchedUsers = false
    },
    findUsers(searchQuery) {
      this.foundUsers = this.getAllUsers.filter((user) =>
          user.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    },
    clickSearchButtonHandler() {
      console.log(this.searchQuery)
      this.fetchUsers({q: +this.searchQuery ? `id${this.searchQuery}` : this.searchQuery})
      this.showSearchedUsers = true
    },
    clickComputeButtonHandler() {
      if (this.checkedUsersIds.length === 0) {
        this.fetchUserFriends({userId: this.getLoggedUserId})
      } else {
        this.fetchCheckedUsersFriends({userIds: this.checkedUsersIds})
      }
    },
    userClickHandler(user) {

      const index = this.checkedUsersIds.findIndex(el => el.id === user.id)
      if (index === -1) {
        this.checkedUsersIds.push({id: user.id, name: `${user.last_name} ${user.first_name}`})
      } else {
        this.checkedUsersIds.splice(index, 1)
      }
    }
  },
  directives: {
    ClickOutside
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
    justify-content: center;
  }

  .search__menu {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .search__container {
    position: relative;
    display: flex;

    .search__close-results {
      position: absolute;
      font-size: 10px;
      width: 100px;
      right: 70px;
      top: 15px;
      cursor: pointer;
      text-underline: black;
    }

    input {
      width: 435px;
      position: relative;
    }

    button {
      margin-left: 5px;
      height: 30px;
      width: 60px;
    }
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
    height: 500px;
    overflow-y: scroll;
    position: absolute;
    top: 30px;
    z-index: 2;

    .search-list__user {
      display: flex;
      flex: 1;
      width: 500px;
      border: 1px solid grey;

      &:hover {
        background: greenyellow;

      }
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