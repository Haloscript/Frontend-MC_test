<template>
  <div
    :class="['row', { 'table-head': thead }]"
    @dblclick="$emit('editGoodRow', tableElement)"
  >
    <div class="col s3 ">
      <p>{{ number }}</p>
    </div>
    <div class="col s3 ">
      <p>{{ tableElement.title }}</p>
    </div>
    <div class="col s2 ">
      <p>{{ date }}</p>
    </div>
    <div class="col s3">
      <p>
        {{ price }}
      </p>
    </div>
    <div class="col s1">
      <button
        @click="deleteThisItem(tableElement.id, indexItem)"
        v-if="!thead"
        class="waves-effect waves-light red btn"
      >
        <Delete class="img" />
      </button>
    </div>
  </div>
</template>

<script>
import Delete from "../../assets/images/delete";
export default {
  name: "goodTableRow",
  components: { Delete },
  props: {
    thead: {
      type: Boolean
    },
    tableElement: {
      type: Object
    },
    indexItem: {
      type: Number
    }
  },
  computed: {
    number() {
      return typeof this.tableElement.price == "string"
        ? this.tableElement.id
        : this.indexItem + 1;
    },
    price() {
      return typeof this.tableElement.price == "string"
        ? this.tableElement.price
        : `${this.tableElement.price.toLocaleString("ru")}₸`;
    },
    date() {
      if (
        typeof this.tableElement.registrationDate === "string" &&
        this.thead
      ) {
        return this.tableElement.registrationDate;
      }
      return `${new Date(
        this.tableElement.registrationDate
      ).getDate()}.${new Date(
        this.tableElement.registrationDate
      ).getMonth()}.${new Date(
        this.tableElement.registrationDate
      ).getFullYear()}`;
    }
  },
  methods: {
    deleteThisItem(id, index) {
      this.$emit("deleteItem", { id, index });
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 0px !important;
  text-align: center;
  &.highlight {
    background-color: rgba(242, 242, 242, 0.5);
  }
  & .btn {
    width: 45px;
    margin-top: 10px;
    & .img {
      width: 11px;
    }
  }
  & .table-head {
    font-weight: 800;
  }
}
</style>
