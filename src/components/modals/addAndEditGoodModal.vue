<template>
  <div>
    <div id="modal1" class="modal open modal-show" tabindex="0" style="">
      <div class="modal-content">
        <h4>Добавление материальных ценностей</h4>
        <div class="col">
          <CustomInput
            name="goodName"
            title="Наименование"
            v-model="scopedData.goodName"
          />
          <CustomInput
            name="goodPrice"
            title="Цена"
            v-model="scopedData.goodPrice"
          />
          <CustomInput
            name="goodDate"
            title="Дата"
            v-model="scopedData.goodDate"
            :type="'date'"
          />
        </div>
      </div>
      <div class="modal-footer">
        <CustomButton
          class="modal-btn"
          @buttonClickEvt="$emit('openPerson')"
          title="Отмена"
          color="grey lighten-1"
        />
        <CustomButton
          class="modal-btn"
          @buttonClickEvt="addOnTable()"
          title="Добавить"
          color="green lighten-1"
        />
      </div>
    </div>
    <div class="modal-overlay modal-background"></div>
  </div>
</template>

<script>
import CustomInput from "../form_elements/CustomInput";
import { mapActions, mapGetters, mapMutations } from "vuex";
import CustomButton from "../form_elements/CustomButton";
export default {
  name: "addGoodModal",
  components: { CustomButton, CustomInput },
  data() {
    return {
      scopedData: {
        goodName: "",
        goodPrice: "",
        goodDate: ""
      }
    };
  },
  beforeMount() {
    if (this.edit) {
      this.scopedData.goodName = this.editableData.title;
      this.scopedData.goodPrice = String(this.editableData.price);
      this.scopedData.goodDate = this.currentData;
    }
  },
  computed: {
    ...mapGetters(["getBaseModal"]),
    edit() {
      return this.editableData != null;
    },
    editableData: {
      get() {
        return this.getBaseModal("editableData");
      },
      set(value) {
        this.setBaseModal({ type: "editableData", data: value });
      }
    },
    currentData() {
      return `${new Date(this.editableData.registrationDate).getFullYear()}-${
        new Date(this.editableData.registrationDate).getMonth() > 9 ? "" : 0
      }${new Date(this.editableData.registrationDate).getMonth()}-${
        new Date(this.editableData.registrationDate).getMonth() > 9 ? "" : 0
      }${new Date(this.editableData.registrationDate).getDay()}`;
    }
  },
  methods: {
    ...mapActions(["addDataOnGoodTable", "editDataOnGoodTable"]),
    ...mapMutations(["setBaseModal"]),
    addOnTable() {
      if (this.edit) {
        this.editDataOnGoodTable({
          ...this.scopedData,
          ...{ good_id: this.editableData.id }
        });
        return;
      }
      this.addDataOnGoodTable(this.scopedData);
    }
  }
};
</script>

<style scoped lang="scss">
.modal {
  width: 47%;
  /*  & .modal-content {*/
  /*    display: flex;*/
  /*    justify-content: space-between;*/
  /*    & .images {*/
  /*      width: 20px;*/
  /*      height: 20px;*/
  /*    }*/
  /*    & h4 {*/
  /*      font-size: 1.28rem;*/
  /*      text-align: center;*/
  /*    }*/
  /*  }*/
  /*  & .modal-footer {*/
  /*    text-align: center;*/
  & .modal-btn {
    margin: 6px 20px;
  }
  /*  }*/
}
</style>
