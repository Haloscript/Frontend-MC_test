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
    <div :class="['col', 's3', { 'sort-elem': thead }]">
      <p>{{ tableElement.good_count }}</p>
      <div>
        <p
          v-if="sortCount === 'desc'"
          @click="$emit('startingSort', { type: 'count', value: 'asc' })"
        >
          <i class="arrow up"></i>
        </p>
        <p
          v-if="sortCount === 'asc'"
          @click="$emit('startingSort', { type: 'count', value: 'desc' })"
        >
          <i class="arrow down"></i>
        </p>
      </div>
    </div>
    <div :class="['col', 's4', { 'sort-elem': thead }]">
      <p>
        {{ price }}
      </p>

      <div>
        <p
          v-if="sortPrice === 'desc'"
          @click="$emit('startingSort', { type: 'price', value: 'asc' })"
        >
          <i class="arrow up"></i>
        </p>
        <p
          v-if="sortPrice === 'asc'"
          @click="$emit('startingSort', { type: 'price', value: 'desc' })"
        >
          <i class="arrow down"></i>
        </p>
      </div>
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
import { mapGetters, mapMutations } from "vuex";
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
    },
    sorted: {
      type: String
    },
    sortedType: {
      type: String
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
    ...mapGetters(["getBaseData"]),
    price() {
      return typeof this.tableElement.total_price == "string"
        ? this.tableElement.total_price
        : `${this.tableElement.total_price.toLocaleString("ru")}₸`;
    },
    sortPrice: {
      get() {
        return this.getBaseData("sortPrice");
      },
      set(value) {
        this.setBaseData({ type: "sortPrice", data: value });
      }
    },
    sortCount: {
      get() {
        return this.getBaseData("sortCount");
      },
      set(value) {
        this.setBaseData({ type: "sortCount", data: value });
      }
    }
  },

  methods: {
    ...mapMutations(["setBaseData"]),
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
  & .col {
    &.sort-elem {
      display: flex;
      flex-direction: row;
      & i {
        border: solid black;
        border-width: 0 3px 3px 0;
        display: inline-block;
        padding: 3px;
        margin-left: 5px;

      }
      & .up {
        transform: rotate(-135deg);
        -webkit-transform: rotate(-135deg);
      }

      & .down {
        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
      }
    }
  }

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
