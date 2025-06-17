<template>
  <ui-page>
    <view class="p-6">
      <button class="ui-button" type="primary">点击</button>
      <button class="ui-button" type="primary" loading>点击</button>
      <button class="ui-button" type="primary" disabled>点击</button>
      <button class="ui-button" type="primary" plain>点击</button>
      <button class="ui-button" type="primary" plain loading>点击</button>
      <button class="ui-button" type="primary" plain disabled>点击</button>
    </view>
  </ui-page>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";

onLoad((options) => {
  console.log(options);
});
</script>

<style lang="scss" scoped>
button {
  margin-bottom: 20rpx;
}
.ui-button[type="primary"] {
  background-color: $uni-color-primary;
}
</style>
