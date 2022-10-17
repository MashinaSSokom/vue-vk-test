<template>
  <div class="search">
    <template v-if="this.isLoggedIn">
      <input v-model="searchString" @input="() => findUsers(searchString)"/>
      <button class="search__button" @click="clickSearchButtonHandler">Построить</button>
      <div class="search-list">
        <template v-for="user in foundUsers" :key="user.id">
          <div class="search-list__user">
            <p>name: {{ user.id }}</p>
            <p>name: {{ user.name }}</p>
            <!--          <p>friends: {{ user.friends }}</p>-->
          </div>
        </template>
        <!--      {{ foundUsers }}-->
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
      checkedUsersId: []
    }
  },
  beforeMount() {
    // Первоначально заполняем первыми 20-тью пользователями
    this.foundUsers = this.getAllUsers.slice(0, 20)
  },
  computed: {
    ...mapGetters(['getAllUsers', 'isLoggedIn', "getLoggedUserId"]),
  },
  methods: {
    ...mapActions(['fetchUserFriends']),
    findUsers(searchString) {
      this.foundUsers = this.getAllUsers.filter((user) =>
          user.name.toLowerCase().startsWith(searchString.toLowerCase())
      )
    },
    clickSearchButtonHandler() {
      if (this.checkedUsersId.length===0) {
        this.fetchUserFriends({userId: this.getLoggedUserId})
      } else {
        console.log('checkedUsers search')
      }

    }
  }
}
</script>

<style scoped lang="scss">
.search{
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