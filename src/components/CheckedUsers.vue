<template>
  <div class="checked-users">
    <my-button class="checked-users__counter" @click="handleClick">{{ `Выбрано: ${this.getCheckedUsers.length}` }}
    </my-button>
    <div class="checked-users__list" v-show="showCheckedUsers">
      <div class="checked-users__item" v-for="user in this.getCheckedUsers" :key="user.id">
        <p><router-link :to="`/profile/${user.id}`">{{ user.id }}</router-link></p>
        <p>{{ user.name }}</p>
        <button @click="clickDeleteUserHandler(user.id)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from "vuex";
import MyButton from "@/components/UI/MyButton";

export default {
  name: "CheckedUsers",
  components: {MyButton},
  data() {
    return {
      showCheckedUsers: false
    }
  },
  computed: {
    ...mapGetters(['getCheckedUsers'])
  },
  methods: {
    ...mapMutations(['setCheckedUsers']),
    handleClick() {
      this.showCheckedUsers = !this.showCheckedUsers
    },
    clickDeleteUserHandler(userId) {
      const index = this.getCheckedUsers.findIndex(el => el.id === userId)
      let checkedUsers = [...this.getCheckedUsers]
      checkedUsers.splice(index, 1)
      this.setCheckedUsers({checkedUsers: checkedUsers})
    }
  }
}
</script>

<style scoped lang="scss">
.checked-users {
  position: relative;

  .checked-users__counter {
    width: 80px;
    height: 20px;
    font-size: 10px;
    background: #fff;
    color: $main-color;
  }

  .checked-users__list {
    position: absolute;
    z-index: 3;
    background: #fff;

    .checked-users__item {
      color: #000;
      display: flex;
      width: 300px;
      padding: 5px;
      border: 1px solid grey;
      p:first-child{
        margin-right: 10px;
      }

      button {
        position: absolute;
        margin-left: 10px;
        background: none;
        border: none;
        cursor: pointer;
        color: red;
        right: 10px;
      }
    }
  }
}
</style>