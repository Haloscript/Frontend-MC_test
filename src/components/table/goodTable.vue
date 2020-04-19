<template>
  <div class="good-main-table">
    <div v-if="showTable">
      <goodTableRow :thead="true" :tableElement="staticData" />
      <goodTableRow
        v-for="(good, index) in goodList"
        :key="good.id"
        :tableElement="good"
        :indexItem="index"
        @deleteItem="deleteRow"
        @editGoodRow="editGoodRow"
      />
      <goodTableRowTotal :total_price="totalPriceCalc" />
    </div>

    <button
      @click="showModal = 'addGood'"
      class="btn-floating btn-large waves-effect waves-light 9 add-btn"
    >
      <i class="material-icons"> <add /> </i>
    </button>
  </div>
</template>

<script>
import goodTableRow from "./goodTableRow";
import goodTableRowTotal from "./goodTableRowTotal";
import add from "../../assets/images/add";
import { GoodTable } from "../../app/tableConfig";
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "goodTable",
  components: {
    goodTableRow,
    goodTableRowTotal,
    add
  },
  props: {
    goodList: {
      type: Array
    }
  },
  data() {
    return {
      staticData: GoodTable
    };
  },
  computed: {
    ...mapGetters(["getSelectedData", "getBaseModal"]),
    showTable() {
      return this.goodList && this.goodList.length > 0;
    },
    totalPriceCalc() {
      console.log("GOOD", this.goodList);
      return this.goodList.reduce((prev, good) => prev + good.price, 0);
    },
    showModal: {
      get() {
        return this.getBaseModal("type");
      },
      set(value) {
        this.setBaseModal({ type: "type", data: value });
      }
    },
    editableData: {
      get() {
        return this.getBaseModal("editableData");
      },
      set(value) {
        this.setBaseModal({ type: "editableData", data: value });
      }
    }
  },
  methods: {
    ...mapMutations(["setSelectedData", "setBaseModal"]),
    ...mapActions(["deleteOneGoodOnState"]),
    deleteRow(data) {
      this.deleteOneGoodOnState(data);
      console.log(data);
    },
    editGoodRow(data) {
      this.editableData = data;
      this.showModal = "addGood";
    }
  }
};
</script>

<style scoped lang="scss">
.good-main-table {
  width: 100%;
  margin: 0 auto;
  padding-top: 40px;
}
</style>
