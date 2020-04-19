<template>
  <div v-if="showModal">
    <onePersonModal
      v-if="showModal === 'onePerson'"
      @close="showModal = null"
    />
    <deleteModal v-if="showModal === 'delete'" @close="showModal = null" />
    <addGoodModal
      v-if="showModal === 'addGood'"
      @close="showModal = null"
      @openPerson="showModal = 'onePerson'"
    />
    <createOnePersonalModal
      v-if="showModal === 'addUser'"
      @close="showModal = null"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "index",
  components: {
    createOnePersonalModal: () => import("./createOnePersonalModal"),
    addGoodModal: () => import("./addAndEditGoodModal"),
    onePersonModal: () => import("./editOnePersonModal"),
    deleteModal: () => import("./deleteModal")
  },
  computed: {
    ...mapGetters(["getBaseModal"]),
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
    ...mapMutations(["setBaseModal"])
  }
};
</script>

<style scoped></style>
