<template>
  <div>
    <div id="modal1" class="modal open modal-show" tabindex="0" style="">
      <div class="modal-content">
        <h4>Полная информация работника</h4>
        <Preloader v-if="!dataOnForm" />
        <div v-else>
          <customInput name="last_name" title="Фамилия" v-model="lastName" />
          <customInput name="firs_name" title="Имя" v-model="firstName" />
          <customInput
            name="middle_name"
            title="Отчество"
            v-model="middleName"
          />
          <customInput name="position" title="Должность" v-model="position" />
          <h4>Список выданных материальных ценностей:</h4>
          <GoodTable :goodList="goodsList" />
        </div>
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
          @buttonClickEvt="saveUserData()"
          title="Сохранить"
          color="green lighten-1"
        />
      </div>
    </div>
    <div class="modal-overlay modal-background"></div>
  </div>
</template>

<script>
import Preloader from "../preloader";
import { mapGetters, mapMutations, mapActions } from "vuex";
import customInput from "../form_elements/CustomInput";
import GoodTable from "../table/goodTable";
import CustomButton from "../form_elements/CustomButton";
export default {
  name: "editOnePersonalModal",
  components: {
    CustomButton,
    GoodTable,
    Preloader,
    customInput
  },
  computed: {
    ...mapGetters(["getBaseData", "getBaseModal", "getSelectedData"]),
    dataOnForm() {
      return this.getBaseData("selectUserData") !== null;
    },
    lastName: {
      get() {
        return this.getSelectedData("lastName");
      },
      set(value) {
        this.setSelectedData({ type: "lastName", data: value });
      }
    },
    firstName: {
      get() {
        return this.getSelectedData("firstName");
      },
      set(value) {
        this.setSelectedData({ type: "firstName", data: value });
      }
    },
    middleName: {
      get() {
        return this.getSelectedData("middleName");
      },
      set(value) {
        this.setSelectedData({ type: "middleName", data: value });
      }
    },
    position: {
      get() {
        return this.getSelectedData("position");
      },
      set(value) {
        this.setSelectedData({ type: "position", data: value });
      }
    },
    goodsList: {
      get() {
        return this.getSelectedData("user_good");
      }
    },
    placeCall: {
      get() {
        return this.getBaseModal("placeCall");
      },
      set(value) {
        this.setBaseModal({ type: "placeCall", data: value });
      }
    }
  },
  created() {
    this.placeCall = "editUserModal";
  },
  methods: {
    ...mapMutations(["setBaseData", "setSelectedData", "setBaseModal"]),
    ...mapActions(["saveUserAllData"]),
    saveUserData() {
      this.saveUserAllData().then(() => {
        this.$emit("close");
      });
    }
  },
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
.modal {
  width: 90%;
  & .btn {
    margin: 6px 20px;
  }
}
</style>
