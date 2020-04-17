<template>
  <div>
    <div id="modal1" class="modal open modal-show" tabindex="0" style="">
      <div class="modal-content">
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
        <Preloader />
      </div>
      <div class="modal-footer">
        <button
          @click="$emit('close')"
          class="modal-close waves-effect waves-green btn-flat"
        >
          Agree
        </button>
      </div>
    </div>
    <div class="modal-overlay modal-background"></div>
  </div>
</template>

<script>
import Preloader from "../preloader";
export default {
  name: "onePersonModal",
  components: {
    Preloader
  }
};
</script>

<style scoped lang="scss">

</style>
