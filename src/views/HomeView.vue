<template>
  <div class="home">
    <Search/>
  </div>
</template>

<script>
// @ is an alias to /src
import Search from "@/components/SearchUsers";

export default {
  name: 'HomeView',
  components: {
    Search
  }
}
</script>
