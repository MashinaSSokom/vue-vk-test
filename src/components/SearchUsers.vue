<template>
  <div class="search">
    <template v-if="this.isLoggedIn">
      <input v-model="searchString" @input="() => findUsers(searchString)"/>
      <button class="search__button" @click="clickSearchButtonHandler">Построить</button>
      <template v-if="this.getFetchedUsers">
        <ul class="search-list">

          <template v-for="user in this.getFetchedUsers" :key="user.id">

            <li class="search-list__user">
              <img :src="user.photo" alt="">
              <p>id: {{ user.id }}</p>
              <router-link :to="`/profile/${user.id}`"><p>{{ `${user.first_name} ${user.last_name}` }}</p></router-link>
              <p>Общих друзей: {{ user.common_count }}</p>
            </li>
            <!--TODO: Подгрузка следующих 20-->

          </template>
        </ul>
      </template>
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
      checkedUsersId: []
    }
  },
  beforeMount() {
    // Первоначально заполняем первыми 20-тью пользователями
    this.foundUsers = this.getAllUsers.slice(0, 20)
  },
  computed: {
    ...mapGetters(['getAllUsers', 'isLoggedIn', "getLoggedUserId", 'getFetchedUsers']),
  },
  methods: {
    ...mapActions(['fetchUserFriends']),
    findUsers(searchString) {
      this.foundUsers = this.getAllUsers.filter((user) =>
          user.name.toLowerCase().startsWith(searchString.toLowerCase())
      )
    },
    clickSearchButtonHandler() {
      if (this.checkedUsersId.length === 0) {
        this.fetchUserFriends({userId: this.getLoggedUserId})
      } else {
        console.log('checkedUsers search')
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

  .search-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: column;

    .search-list__user {
      border: 1px solid grey;
    }

    .search-list__user:hover {
      background: greenyellow;
    }
  }
}


</style>