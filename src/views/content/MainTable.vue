<template>
  <div v-if="showContent" class="main-table">
    <TableRow
      :thead="true"
      :tableElement="staticData"
      @startingSort="sortingOnData"
    />
    <TableRow
      v-for="(user, index) in userListData.users"
      :tableElement="user"
      :key="user.id"
      :indexItem="index"
      @getFullInfo="openPersonModal"
      @getDelete="openDeleteModal"
    />
    <Paginate
      :currentPage="userListData.this_page"
      :pages="userListData.pages"
      @changePage="nextPage"
    />
    <!--    @click="showModal = 'addGood'"-->
    <button
      @click="showModal = 'addUser'"
      class="btn-floating btn-large waves-effect waves-light 9 add-btn"
    >
      <i class="material-icons"> <add /> </i>
    </button>
    <MainModal />
  </div>
</template>

<script>
import TableRow from "../../components/table/UserTableRow";
import { UserTable } from "../../app/tableConfig";
import { mapGetters, mapActions, mapMutations } from "vuex";
import MainModal from "../../components/modals";
import add from "../../assets/images/add";
import Paginate from "../../components/Paginate";
export default {
  name: "Table",
  components: {
    Paginate,
    TableRow,
    MainModal,
    add
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
    },
    page: {
      get() {
        return this.getBaseData("page");
      },
      set(value) {
        this.setBaseData({ type: "page", data: value });
      }
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
    },
    sorted: {
      get() {
        return this.getBaseData("sorted");
      },
      set(value) {
        this.setBaseData({ type: "sorted", data: value });
      }
    },
    editableData:{
      get() {
        return this.getBaseModal("editableData");
      },
      set(value) {
        this.setBaseModal({ type: "editableData", data: value });
      }
    }
  },
  methods: {
    ...mapActions(["getTenUsers", "getOneUser", "deleteSelectUSerData"]),
    ...mapMutations(["setBaseData", "setBaseModal"]),

    openPersonModal(id) {
      this.getOneUser(id);
      this.showModal = "onePerson";
    },
    openDeleteModal(id) {
      this.editableData = { id: id, type: "user" };
      this.showModal = "delete";
    },
    nextPage(pageNum) {
      this.page = pageNum;
      this.getTenUsers();
    },
    sortingOnData(data) {
      if (data.type === "count") this.sortCount = data.value;
      if (data.type === "price") this.sortPrice = data.value;
      this.sorted = data.type;
      this.getTenUsers(true);
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
