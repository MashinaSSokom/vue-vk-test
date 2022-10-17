<template>
  <div class="profile">
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
  },
  computed: {
    ...mapGetters(['getFetchedWall']),
  },
  methods: {
    ...mapActions(['fetchUserWall'])
  }
}
</script>

<style scoped lang="scss">
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
</style>