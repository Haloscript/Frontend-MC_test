<template>
  <div id="app">
    <MainHeader />
    <router-view />
  </div>
</template>
<script>
import MainHeader from "./components/header_footer/MainHeader";

export default {
  name: "App",
  components: { MainHeader }
};
</script>
<style lang="scss"></style>
