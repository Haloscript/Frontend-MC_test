<template>
  <div class="row table-head">
    <!--    <div class="col s3 ">-->
    <!--      <p>{{ tableElement.id }}</p>-->
    <!--    </div>-->
    <!--    <div class="col s3 ">-->
    <!--      <p>{{ // tableElement.title }}</p>-->
    <!--    </div>-->
    <div class="col s8">
      <p>Итого</p>
    </div>
    <div class="col s3">
      <p>
        {{ total_price.toLocaleString("ru") }}&#8376;
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodTableRowTotal",
  props: {
    total_price: {
      type: Number
    }
  }
};
</script>

<style scoped lang="scss">
.row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  margin-bottom: 0px !important;
  text-align: center;
  &.highlight {
    background-color: rgba(242, 242, 242, 0.5);
  }
  & .table-head {
    font-weight: 800;
  }
}
</style>
