<template>
  <div class="navbar">
    <router-link to="/">Home</router-link>
    |
    <router-link to="/about">About</router-link>
    |
    <a href="#" @click="loginHandler">Войти через ВК</a>
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
.vk-login{

}
</style>