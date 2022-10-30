<template>
  <div class="search">
    <template v-if="this.isLoggedIn">
      <div class="search__wrapper">
        <template v-if="this.getFetchedUsers">
          <div class="search__menu">
            <div class="search__container">
              <my-input v-model="this.searchQuery"
                        @input="handleInput"
                        @focus="() => this.searchActive=true"
                        @focusout="() => this.searchActive=false"/>
              <my-button class="search__button" @click="clickSearchButtonHandler">Найти</my-button>
              <template v-if="showSearchedUsers">
                <p class="search__close-results" @click="closeSearchResults">Скрыть
                  результаты...</p>
              </template>
              <template v-else>
                <p class="search__close-results" v-show="this.getFetchedUsers.length!==0" @click="openSearchResults">Показать
                  результаты...</p>
              </template>

            </div>
            <div class="search-list" v-show="showSearchedUsers">
              <template v-for="user in this.getFetchedUsers" :key="user.id">
                <div class="search-list__user" @click="() => userClickHandler(user)">
                  <!--                  <img :src="user.photo" alt="">-->
                  <p>id:
                    <router-link :to="`/profile/${user.id}`">{{ user.id }}</router-link>
                  </p>
                  <p>{{ `${user.first_name} ${user.last_name}` }}</p>
                  <p>Общих друзей: {{ user.common_count }}</p>
                </div>
              </template>
              <div class="search-list__next-users" @click="clickSearchNextUsers">
                <p>Загрузить следующие 20 записей...</p>
              </div>
            </div>
          </div>

        </template>
      </div>
      <my-button class="compute__button" @click="clickComputeButtonHandler">Построить</my-button>
      <template v-if="this.getFetchedCheckedUsersFriends.length !== 0">
        <div class="fetched-users">
          <p>Найденные друзья выбранных пользователей:</p>
          <div class="fetched-users__container">
            <template v-for="user in this.getFetchedCheckedUsersFriends" :key="user.id">
              <div class="user-card" :style="{background: `hsl(120, ${Math.floor(user.countCheckedUserMatch / this.getCheckedUsers.length * 100)}%, 50%)`}">
                <img :src="user.photo_200_orig" class="user-card__avatar" alt="Avatar">
                <p>ID:
                  <router-link :to="`/profile/${user.id}`">{{ user.id }}</router-link>
                </p>
                <p>{{ `${user.last_name} ${user.first_name}` }}</p>
                <p>Возраст: {{computeBDate(user.bdate) }}</p>
                <p>Пол: {{ user.sex === 2 ? 'Мужчина' : 'Женщина' }}</p>
                <p>Друзей среди выбранных пользователей: {{ user.countCheckedUserMatch }}</p>
              </div>
            </template>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <p>Для начала войдите через ВК</p>
    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";

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
  computed: {
    ...mapGetters(['getUsersOffset', 'getAllUsers', 'getCheckedUsers', 'isLoggedIn', "getLoggedUserId", 'getFetchedUsers', 'getFetchedCheckedUsersFriends']),
  },
  methods: {
    ...mapMutations(['setCheckedUsers', 'setUsersOffset']),
    ...mapActions(['fetchUserFriends', 'fetchCheckedUsersFriends', "fetchUsers"]),
    handleInput(e) {
      this.searchQuery = e.target.value
    },
    computeBDate(dateString) {
      if (dateString) {
        let d = dateString.split('.')
        if (d.length === 3) {
          const bDate = new Date(d[2], d[1] - 1, d[0])
          return Math.floor((Date.now() - bDate) / (1000 * 60 * 60 * 24 * 365))
        }
      }
      return 'Нет информации'
    },
    closeSearchResults() {
      this.showSearchedUsers = false
    },
    openSearchResults() {
      this.showSearchedUsers = true
    },
    findUsers(searchQuery) {
      this.foundUsers = this.getAllUsers.filter((user) =>
          user.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      )
    },
    clickSearchButtonHandler() {
      this.setUsersOffset({offset: 0})
      this.fetchUsers({q: +this.searchQuery ? `id${this.searchQuery}` : this.searchQuery})
      this.showSearchedUsers = true
    },
    clickSearchNextUsers() {
      this.setUsersOffset({offset: this.getUsersOffset + 20})
      this.fetchUsers({q: +this.searchQuery ? `id${this.searchQuery}` : this.searchQuery})
    },
    clickComputeButtonHandler() {
      if (this.getCheckedUsers.length !== 0) {
        this.fetchCheckedUsersFriends({userIds: this.getCheckedUsers.map(el => el.id)})
      }
    },
    userClickHandler(user) {
      const index = this.getCheckedUsers.findIndex(el => el.id === user.id)
      let checkedUsers = [...this.getCheckedUsers]
      if (index === -1) {
        checkedUsers.push({id: user.id, name: `${user.last_name} ${user.first_name}`})
      } else {
        checkedUsers.splice(index, 1)
      }
      this.setCheckedUsers({checkedUsers: checkedUsers})
    }
  },
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
    margin-bottom: 40px;
  }

  .search__menu {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .search__button {
    background: $light-color;
    color: #000;
  }

  .compute__button {
    margin-bottom: 10px;
  }

  .search__container {
    position: relative;
    display: flex;

    .search__close-results {
      position: absolute;
      font-size: 10px;
      width: 120px;
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
    max-height: 200px;
    overflow-y: scroll;
    position: absolute;
    top: 30px;
    z-index: 2;

    .search-list__user {
      display: flex;
      flex-direction: column;
      width: 500px;
      border: 1px solid grey;
      background: #fff;
      padding: 5px;

      &:hover {
        background: greenyellow;
      }
    }
    .search-list__next-users{
      cursor: pointer;
      border: 1px solid grey;
      background: #fff;
      padding: 5px;
      &:hover{
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
        height: 320px;
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