<template>
  <!--<div style="height: 84px; background-color: #f2f2f2; margin-bottom: 30px"></div>-->
  <div class="c-option-bar">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "option-bar"
};
</script>

<style scoped>
.c-option-bar {
  padding: 24px 30px;
  height: 36px;
  background-color: #f2f2f2;
  margin-bottom: 30px;
}
</style>
