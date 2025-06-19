<template>
  <view class="p-5">
    <navigator url="/pages/demo/color">color</navigator>
    <navigator url="/pages/demo/toast">toast</navigator>
    <navigator url="/pages/demo/button">button</navigator>

    <view class="h-10 bg-primary hover">
      <text class="relative">点击</text>
    </view>
    <view class="h-10 bg-primary" hover-class="uni-hover light">
      <text class="relative">点击</text>
    </view>
    <view class="h-10 bg-primary" hover-class="uni-hover">
      <text class="relative">点击</text>
    </view>
  </view>
</template>

<script setup>
// const app = getApp();
// console.log(app.globalData.popupZIndex);

// const res1 = uni.request({
//   url: "https://cnodejs.org/api/v1/topics"
// });
// const res2 = uni.request({
//   url: "https://cnodejs.org/api/v1/topics",
//   success: (res) => {
//     console.log(res);
//   }
// });
// console.log(res1, res2);
</script>

<style scoped>
.hover:active {
  background-color: red;
}
</style>