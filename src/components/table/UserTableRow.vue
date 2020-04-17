<template>
  <div
    :class="['row', { 'table-head': thead }, { highlight: selected && !thead }]"
    @click="selected = !selected"
    @dblclick="$emit('getFullInfo', tableElement.id)"
    @contextmenu.prevent="handleClick($event, tableElement.id)"
  >
    <div class="col s1 ">
      <p>{{ tableElement.id }}</p>
    </div>
    <div class="col s2 ">
      <p>{{ tableElement.fullName }}</p>
    </div>
    <div class="col s2 ">
      <p>{{ tableElement.position }}</p>
    </div>
    <div class="col s3">
      <p>{{ tableElement.good_count }}</p>
    </div>
    <div class="col s4">
      <p>
        {{ price }}
      </p>
    </div>
    <vue-simple-context-menu
      :elementId="String(tableElement.id)"
      :options="options"
      :ref="'ContextMenu'"
      @option-clicked="optionClicked"
    />
  </div>
</template>

<script>
import VueSimpleContextMenu from "vue-simple-context-menu";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";

export default {
  name: "TableElement",
  components: {
    "vue-simple-context-menu": VueSimpleContextMenu
  },
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
  data() {
    return {
      selected: false,
      options: [
        {
          name: "Удалить",
          slug: "delete"
        }
      ]
    };
  },
  computed: {
    price() {
      return typeof this.tableElement.total_price == "string"
        ? this.tableElement.total_price
        : `${this.tableElement.total_price.toLocaleString("ru")}₸`;
    }
  },
  methods: {
    handleClick(event, item) {
      this.$refs.ContextMenu.showMenu(event, item);
    },
    optionClicked(event) {
      this.$emit("getDelete", event.item);
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
  & .table-head {
    font-weight: 800;
  }
}
</style>
