<template>
  <nav>
    <div class="nav-wrapper">
      <a class="brand-logo"> <MainHeaderLogo class="logo-img" /> Таблица МЦ </a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><router-link :to="{ name: 'Home' }">На Главную</router-link></li>
        <!--        <li><a href="badges.html">Components</a></li>-->
        <!--        <li><a href="collapsible.html">JavaScript</a></li>-->
      </ul>
    </div>
  </nav>
</template>

<script>
import MainHeaderLogo from "../../assets/images/mainHeaderLogo";
export default {
  name: "mainHeader",
  components: {
    MainHeaderLogo
  }
};
</script>

<style scoped lang="scss">
.brand-logo {
  .logo-img {
    width: 57px;
    height: 57px;
    padding: 5px;
  }
}
</style>
