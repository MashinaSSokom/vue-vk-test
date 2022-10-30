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
          <p>Количество друзей: {{ `${this.getProfile.friends_count}` }}</p>
          <a :href="`https://vk.com/id${this.getProfile.id}`">Профиль в ВК</a>
        </div>
        <div class="user-info__friends">
          <tempplate v-for="user in this.getFetchedUserFriends" :key="user.id">
            <div class="user-info__item">
              <div class="user-item__avatar">
                <img :src="user.photo" alt="avatar">
              </div>
              <div class="user-item__description">
                <p>Имя: {{ `${user.last_name} ${user.first_name}` }}</p>
                <p>Пол: {{ user.sex === 2 ? 'Мужчина' : 'Женщина' }}</p>
                <a :href="`https://vk.com/id${user.id}`">Профиль в ВК</a>
              </div>
            </div>
          </tempplate>
        </div>
      </div>
    </template>
    <div class="wall-info">
      <p style="margin-right: 10px">Посты:</p>
      <template v-if="this.getFetchedWall.length !== 0">
        <div class="wall-info__posts">
          <!--TODO: Сделать подгрузку следующих 10 постов-->
          <!--TODO: Проработать другие типы постов (link, репост-есть поле copy_history)-->
          <template v-for="post in this.getFetchedWall" :key="post.id">
            <template v-if="post.text.length!==0 || post.attachments">
              <div class="post">
                <div class="post__attachments">
                  <template v-if="post?.attachments?.length > 0 && post?.attachments[0]?.type === 'photo'">
                    <template v-for="attachment in post.attachments" :key="attachment?.photo?.id">
                      <template v-if="attachment.type === 'photo'">
                        <img :src="post?.attachments[0]?.photo.sizes[1].url" alt="">
                      </template>
                    </template>
                  </template>
                </div>
                <div class="post__description">
                  <p>{{ post?.text.length > 200 ? post?.text.slice(0, 200) + '...' : post?.text }}</p>
                  <a :href="`https://vk.com/id${this.$route.params.id}?w=wall${this.$route.params.id}_${post.id}`">Перейти к посту</a>
                </div>
              </div>
            </template>
          </template>
        </div>
      </template>
      <template v-else>
        <p>У пользователя нет постов на стене...</p>
      </template>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "ProfileView",
  async beforeMount() {
    const userId = this.$route.params.id
    await this.fetchUserWall({userId: userId})
    await this.fetchUserFriends({userIds: this.getProfile.checkedUserInFriends})
  },
  computed: {
    ...mapGetters(['getFetchedWall', 'getFetchedUserFriends', 'getProfile', 'getUserFriendsOffset']),
  },
  methods: {
    ...mapActions(['fetchUserWall', 'fetchUserFriends', 'fetchProfile']),
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
    margin-bottom: 20px;

    .user-info__avatar {
      margin-right: 15px;
    }

    .user-info__description {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-right: 30px;
    }

    .user-info__friends {
      max-height: 200px;
      overflow-y: scroll;
      justify-content: left;

      .user-info__item-next {
        cursor: pointer;
        background: white;
        border: 1px solid grey;
      }

      .user-info__item {
        padding: 10px;
        display: flex;
        width: 450px;
        border: 1px solid grey;

        .user-item__avatar {
          margin-right: 25px;
        }

        .user-item__description {
          display: flex;
          flex-direction: column;
          align-items: start;
        }
      }
    }
  }

  .wall-info {
    display: flex;
    flex-direction: column;
    align-items: start;

    .wall-info__posts {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;

      .post {
        width: 250px;
        padding: 5px;
        border: 1px solid grey;
      }
    }

  }
}

</style>