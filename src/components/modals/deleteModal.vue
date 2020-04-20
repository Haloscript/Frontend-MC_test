<template>
  <div>
    <div id="modal1" class="modal open modal-show" tabindex="0" style="">
      <div class="modal-content">
        <warning class="images" />
        <h4>Подтвердите удаление</h4>
      </div>
      <div class="modal-footer">
        <CustomButton
          class="modal-btn"
          @buttonClickEvt="$emit('close')"
          title="Отмена"
          color="grey lighten-1"
        />
        <CustomButton
          class="modal-btn"
          @buttonClickEvt="deleteEvent"
          title="Удалить"
          color="red lighten-1"
        />
      </div>
    </div>
    <div class="modal-overlay modal-background"></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import warning from "../../assets/images/warning";
import CustomButton from "../form_elements/CustomButton";
export default {
  name: "deleteModal",
  components: {
    CustomButton,
    warning
  },
  computed: {
    ...mapGetters(["getBaseModal"]),
    editableData: {
      get() {
        return this.getBaseModal("editableData");
      }
    }
  },
  methods: {
    ...mapActions(["deleteSelectUserData"]),
    deleteEvent() {
      this.deleteSelectUserData();
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  width: 20%;
  & .modal-content {
    display: flex;
    justify-content: space-between;
    & .images {
      width: 20px;
      height: 20px;
    }
    & h4 {
      font-size: 1.28rem;
      text-align: center;
    }
  }
  & .modal-footer {
    text-align: center;
    & .btn {
      margin: 6px 20px;
    }
  }
}
</style>
