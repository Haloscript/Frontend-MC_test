<template>
  <div>
    <div id="modal1" class="modal open modal-show" tabindex="0" style="">
      <div class="modal-content">
        <warning class="images" />
        <h4>Подтвердите удаление</h4>
      </div>
      <div class="modal-footer">
        <button
          @click="$emit('close')"
          class="waves-effect waves-light btn modal-close"
        >
          Отмена
        </button>

        <button @click="$emit('close')" class="waves-effect red lighten-1 btn">
          Удалить
        </button>
      </div>
    </div>
    <div class="modal-overlay modal-background"></div>
  </div>
</template>

<script>
import warning from "../../assets/images/warning";
export default {
  name: "deleteModal",
  components: {
    warning
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
