<template>
  <button
    @click="$emit('addEvent')"
    class="btn-floating btn-large waves-effect waves-light 9 add-btn"
  >
    <i class="material-icons"> <add /> </i></button
></template>

<script>
import add from "../../assets/images/add";

export default {
  name: "AddButton",
  components: {
    add
  }
};
</script>

<style scoped></style>
