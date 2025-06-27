<template>
  <ui-page titleAlign="left">
    <template #title>
      <view class="size-full bg-gray"></view>
    </template>
    <view class="p-5 text-primary">
      <navigator url="/pages/demo/toast">toast</navigator>
      <navigator url="/pages/demo/dialog">dialog</navigator>
      <navigator url="/pages/demo/button">button</navigator>
    </view>
  </ui-page>
</template>

<script setup>
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

<style scoped></style>
