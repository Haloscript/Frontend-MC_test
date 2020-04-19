<template>
  <ul class="pagination">
    <li
      v-for="page in pages"
      :class="['waves-effect', { active: currentPage === page }]"
      :id="page"
      :key="page"
    >
      <a @click="$emit('changePage', page)">{{ page }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Paginate",
  props: {
    currentPage: {
      type: Number,
      require: true
    },
    pages: {
      type: Number,
      require: true
    }
  },
  method: {}
};
</script>

<style scoped></style>
