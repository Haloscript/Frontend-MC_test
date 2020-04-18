<template>
  <div v-if="showModal">
    <onePersonModal
      v-if="showModal === 'onePerson'"
      @close="showModal = null"
    />
    <deleteModal v-if="showModal === 'delete'" @close="showModal = null" />
    <add-good-modal
      v-if="showModal === 'addGood'"
      @close="showModal = null"
      @openPerson="showModal = 'onePerson'"
    />
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import AddGoodModal from "./addAndEditGoodModal";
export default {
  name: "index",
  components: {
    AddGoodModal,
    onePersonModal: () => import("./onePersonModal"),
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
