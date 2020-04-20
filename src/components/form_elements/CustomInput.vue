<template>
  <div class="row">
    <div class="input-field col s6">
      <input :id="name" :type="type" v-model="value" />
      <label class="active" :for="name">{{ title }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "customInput",
  model: {
    prop: "stateValue",
    event: "change"
  },
  props: {
    name: {
      type: String
    },
    title: {
      type: String
    },
    stateValue: {
      type: String,
      required: true
    },
    type: {
      default() {
        return "text";
      }
    }
  },
  computed: {
    value: {
      get() {
        return this.stateValue;
      },
      set(value) {
        this.$emit("change", value);
      }
    }
  }
};
</script>

<style scoped></style>
