<template>
  <div v-if="showContent" class="main-table">
    <TableRow :thead="true" :tableElement="staticData" />
    <TableRow
      v-for="(user, index) in userListData.users"
      :tableElement="user"
      :key="user.id"
      :indexItem="index"
      @getFullInfo="openPersonModal"
      @getDelete="openDeleteModal"
    />
    <MainModal />
  </div>
</template>

<script>
import TableRow from "../../components/table/UserTableRow";
import { UserTable } from "../../app/tableConfig";
import { mapGetters, mapActions, mapMutations } from "vuex";
import MainModal from "../../components/modals";
export default {
  name: "Table",
  components: {
    TableRow,
    MainModal
  },
  data() {
    return {
      staticData: UserTable,
      showContent: false
    };
  },
  created() {
    Promise.all([this.getTenUsers()]).then(() => (this.showContent = true));
  },

  computed: {
    ...mapGetters(["getBaseData", "getBaseModal"]),
    userListData: {
      get() {
        return this.getBaseData("userListData");
      }
    },
    showModal: {
      get() {
        return this.getBaseModal("type");
      },
      set(val) {
        this.setBaseModal({ type: "type", data: val });
      }
    }
  },
  methods: {
    ...mapActions(["getTenUsers"]),
    ...mapMutations(["seBaseData", "setBaseModal"]),

    openPersonModal(id) {
      console.log(id);
      this.showModal = "onePerson";
    },
    openDeleteModal(id) {
      console.log(id);
      this.showModal = "delete";
    }
  }
};
</script>

<style scoped lang="scss">
.main-table {
  width: 800px;
  margin: 0 auto;
  padding-top: 40px;
}
</style>
