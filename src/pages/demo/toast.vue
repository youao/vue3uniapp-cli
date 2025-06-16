<template>
  <view class="p-3">
    <button @click="tapClick">点击</button>
    <button class="mt-5" @click="fntoast">点击 fntoast</button>
    <Toast
      v-model="show"
      position="bottom"
      message="XLaunchMiniProgram.RespXLaunchMiniProgramXLaunchMiniProgramXLaunchMiniProgram"
      :duration="1500"
    ></Toast>
    <ToastQueue ref="queue"></ToastQueue>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import Toast from "@/components/popup/Toast.vue";
import ToastQueue from "@/components/popup/ToastQueue.vue";

const queue = ref(null);

onLoad((options) => {
  console.log(options);
});

const show = ref(false);

function tapClick() {
  show.value = true;
}

function fntoast() {
  queue.value.openToast("fntoast");
}
</script>
