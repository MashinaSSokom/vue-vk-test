<template>
  <button class="my-button">
    <slot>

    </slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped lang="scss">
.my-button{
  color: $text-color;
  padding: 5px;
  height: 25px;
  background: $main-color;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 1px 1px #2c3e50;

  &:hover{
    background: lighten($main-color, 5%);
  }
  &:active{
    box-shadow: none;
    transform: translate(0em, 1px);
  }
}
</style>