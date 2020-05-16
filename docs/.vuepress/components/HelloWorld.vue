<template>
  <div>
    <h1>Hello {{ hello }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    hello: "World from TS land!!"
  })
});
</script>

<style scoped>
h1 {
  color: red;
}
</style>
