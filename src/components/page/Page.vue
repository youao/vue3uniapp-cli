<template>
  <view class="ui-page">
    <slot></slot>

    <!-- toast -->
    <ToastQueue ref="toastQueue"></ToastQueue>
  </view>
</template>
<script setup>
import { ref } from "vue";
// import { onLoad } from "@dcloudio/uni-app";
import ToastQueue from "../popup/ToastQueue.vue";

const toastQueue = ref(null);

function toast(message) {
  return toastQueue.value?.openToast(message);
}

defineExpose({ toast });
</script>
