<template>
  <view class="p-3">
    <button @click="tapClick">点击</button>
    <Toast
      v-model="show"
      position="bottom"
      message="XLaunchMiniProgram.RespXLaunchMiniProgramXLaunchMiniProgramXLaunchMiniProgram"
      :duration="3000"
    ></Toast>
  </view>
</template>

<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import Toast from "@/components/popup/Toast.vue";

onLoad((options) => {
  console.log(options);
});

const show = ref(false);

function tapClick() {
  show.value = true;
}
</script>
