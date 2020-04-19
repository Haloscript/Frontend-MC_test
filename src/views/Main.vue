<template>
  <div>

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
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",

};
</script>
<style lang="scss">
.next-button {
  width: 100%;
  & .btn{
    display: block;
    margin: 60px auto;
  }


}
</style>
