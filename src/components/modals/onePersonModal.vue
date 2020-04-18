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
        <button @click="$emit('close')" class="waves-effect grey lighten-1 btn">
          Отмена
        </button>
        <button
          @click="saveUserData()"
          class="waves-effect green lighten-1 btn"
        >
          Сохранить
        </button>
      </div>
    </div>
    <div class="modal-overlay modal-background"></div>
  </div>
</template>

<script>
import Preloader from "../preloader";
import { mapGetters, mapMutations, mapActions } from "vuex";
import customInput from "../form_elements/customInput";
import GoodTable from "../table/goodTable";
export default {
  name: "onePersonModal",
  components: {
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
    }
  },
  methods: {
    ...mapMutations(["setBaseData", "setSelectedData"]),
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
