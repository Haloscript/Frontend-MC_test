<template>
  <div>
    <div id="modal1" class="modal open modal-show" tabindex="0" style="">
      <div class="modal-content">
        <h4>Полная информация работника</h4>
        <div>
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import customInput from "../form_elements/customInput";
import GoodTable from "../table/goodTable";
export default {
  name: "createOnePersonalModal",
  components: {
    GoodTable,
    customInput
  },
  computed: {
    ...mapGetters(["getBaseData", "getBaseModal", "getCreateUserData"]),
    lastName: {
      get() {
        return this.getCreateUserData("lastName");
      },
      set(value) {
        this.setCreateUserData({ type: "lastName", data: value });
      }
    },
    firstName: {
      get() {
        return this.getCreateUserData("firstName");
      },
      set(value) {
        this.setCreateUserData({ type: "firstName", data: value });
      }
    },
    middleName: {
      get() {
        return this.getCreateUserData("middleName");
      },
      set(value) {
        this.setCreateUserData({ type: "middleName", data: value });
      }
    },
    position: {
      get() {
        return this.getCreateUserData("position");
      },
      set(value) {
        this.setCreateUserData({ type: "position", data: value });
      }
    },
    goodsList: {
      get() {
        return this.getCreateUserData("user_good");
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
    this.placeCall = "createUserModal";
  },
  methods: {
    ...mapMutations(["setBaseData", "setCreateUserData", "setBaseModal"]),
    ...mapActions(["saveUserAllData"]),
    saveUserData() {
      this.saveUserAllData("create").then(() => {
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
