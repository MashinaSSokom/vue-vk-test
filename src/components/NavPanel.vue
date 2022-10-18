<template>
  <div class="navbar">
    <router-link to="/">Главная</router-link>
    |
    <a href="#" @click="loginHandler">Войти через ВК</a>
<!--    todo: Кнопка выйти, если пользователь залогинен-->
  </div>
</template>

<script>
import {mapActions, mapMutations, mapGetters} from "vuex";

export default {
  name: "NavPanel",
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
    ...mapMutations(['setAccessToken','setLoggedUserId']),
    ...mapActions(['loginVK']),
    loginHandler() {
      const appId = 51450674
      this.loginVK({appId: appId})
    },
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