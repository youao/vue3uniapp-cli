<template>
  <view class="p-5">
    <view class="i-ep:circle-check-filled text-lg text-fuchsia"></view>
    <text class="i-ep:circle-check-filled inline-block"></text>
    <view class="size-50 bg-green mb-5 rounded-5 overflow-hidden"> 1231 </view>
    <view class="w-1/2 bg-yellow mb-20 rounded-10"> 1231 </view>
    <image class="w-50 h-50" src="/static/logo.png"></image>
    <view class="flex justify-between items-center">
      <text class="text-red text-24 font-600">Hello</text>
      <text class="text-gray">word</text>
    </view>
    <navigator url="/pages/demo/toast">toast</navigator>

  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello"
    };
  },
  onLoad() {
    const app = getApp();
    console.log(app.globalData.popupZIndex);

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
  },
  methods: {}
};
</script>

<style></style>
