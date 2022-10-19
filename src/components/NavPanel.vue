<template>
  <div class="navbar">
    <router-link to="/">Главная</router-link>
    |
    <template v-if="!this.isLoggedIn">
      <a href="#" @click="loginHandler">Войти через ВК</a>
    </template>
    <template v-else>
      <a href="/" @click="clickExitHandler">Выйти</a>
      <checked-users/>
    </template>
  </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from "vuex";
import CheckedUsers from "@/components/CheckedUsers";

export default {
  name: "NavPanel",
  components: {CheckedUsers},
  beforeMount() {
    const hash = window.location.hash
    if (hash.toString().includes('access_token')) {
      const token = hash.split('&')[0].slice(14)
      const userId = hash.split('&')[2].slice(8)
      this.setAccessToken({token})
      this.setLoggedUserId({userId})
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  },
  methods: {
    ...mapMutations(['setAccessToken','setLoggedUserId', 'logout']),
    ...mapActions(['loginVK']),
    loginHandler() {
      const appId = 51450674
      this.loginVK({appId: appId})
    },
    clickExitHandler() {
      this.logout()
    }
  }
}
</script>

<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: lighten($main-color, 10%);
  margin-bottom: 20px;
  color: $text-color;
  * {
    margin: 0 5px;
    color: inherit;
  }
}
.vk-login{

}
</style>