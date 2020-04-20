<template>
  <button
    @click="$emit('buttonClickEvt')"
    :class="['waves-effect', 'btn', 'modal-close', color]"
  >
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    title: {
      type: String
    },
    color: {
      type: String
    }
  }
};
</script>

<style scoped></style>
