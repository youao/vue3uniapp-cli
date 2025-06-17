<template>
  <view>
    <slot></slot>

    <!-- toast -->
    <ToastQueue ref="toastQueue"></ToastQueue>
  </view>
</template>
<script setup>
import { ref } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import ToastQueue from "../popup/ToastQueue.vue";

const toastQueue = ref(null);

function toast(message) {
  toastQueue.value?.openToast(message);
}

defineExpose({ toast });
</script>
