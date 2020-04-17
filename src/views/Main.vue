<template>
  <div class="container">
    <div class="next-button">
      <button
        class="waves-effect waves-light btn"
        @click="$router.push({ name: 'table' })"
      >
        Перейти к таблице
      </button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home"
};
</script>
<style lang="scss">
.next-button {
  width: 100%;
  margin: 0 auto;
}
</style>
