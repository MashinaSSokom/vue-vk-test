<template>
  <div class="profile">
    <router-link to="/">Назад</router-link>
    <template v-if="this.getProfile">
      <div class="user-info">
        <div class="user-info__avatar">
          <img :src="this.getProfile.photo_200_orig" alt="">
        </div>
        <div class="user-info__description">
          <p>Имя: {{ `${this.getProfile.last_name} ${this.getProfile.first_name}` }}</p>
          <p>Возраст:
            {{ computeBDate(this.getProfile.bdate) }}</p>
          <p>Пол: {{ this.getProfile.sex === 2 ? 'Мужчина' : 'Женщина' }}</p>
          <p>Количество друзей: {{ `${this.getProfile.counters.friends}` }}</p>
          <a :href="`https://vk.com/id${this.getProfile.id}`">Профиль в ВК</a>
        </div>
        <div class="user-info__friends">

        </div>
      </div>
    </template>
    <template v-if="this.getFetchedWall">
      <div class="posts">
        <!--TODO: Сделать подгрузку следующих 10 постов-->
        <!--TODO: Проработать другие типы постов (link, репост-есть поле copy_history)-->
        <template v-for="post in this.getFetchedWall" :key="post.id">
          <div class="post">
            <div class="post__attachments">
              <template v-if="post?.attachments?.length > 0 && post?.attachments[0]?.type === 'photo'">
                <template v-for="attachment in post.attachments" :key="attachment.photo.id">
                  <template v-if="attachment.type === 'photo'">
                    <img :src="post?.attachments[0]?.photo.sizes[1].url" alt="">
                  </template>
                </template>
              </template>
            </div>
            <div class="post__description">
              <p>{{ post?.text.length > 200 ? post?.text.slice(0, 200) + '...' : post?.text }}</p>
            </div>
          </div>
        </template>
      </div>

    </template>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfileView",
  beforeMount() {
    const userId = this.$route.params.id
    this.fetchUserWall({userId: userId})
    this.fetchUserFriends({userId: userId})
    this.fetchProfile({userId: userId})
  },
  computed: {
    ...mapGetters(['getFetchedWall', 'getFetchedUserFriends', 'getProfile']),
  },
  methods: {
    ...mapActions(['fetchUserWall', 'fetchUserFriends', 'fetchProfile']),
    computeBDate(dateString) {
      if (dateString) {
        let d = dateString.split('.')
        if (d.length === 3) {
          const bDate = new Date(d[2], d[1]-1, d[0])
          return Math.floor((Date.now() - bDate)/(1000*60*60*24*365))
        }
      }
      return 'Нет информации'
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  display: flex;
  flex-direction: column;
  align-items: start;

  .user-info {
    display: flex;
    margin-top: 20px;

    .user-info__avatar {
      margin-right: 15px;
    }

    .user-info__description {
      display: flex;
      flex-direction: column;
      align-items: start;
    }
  }

  .posts {
    width: 75%;
    display: flex;
    flex-wrap: wrap;

    .post {
      width: 25%;
      padding: 5px;
      border: 1px solid grey;
    }
  }
}

</style>