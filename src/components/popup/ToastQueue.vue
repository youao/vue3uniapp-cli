<template>
  <view
    class="w-full h-full fixed top-0 left-0 z-999 flex flex-col text-sm pointer-events-none"
  >
    <view class="flex-1 flex flex-col justify-center items-center">
      <!-- <view
        class="max-w-4/5 bg-dark-800 text-white break-all px-3 py-2 rounded"
        >{{ message }}</view
      > -->
    </view>
    <view class="flex-1 flex flex-col justify-center items-center">
      <view
        class="max-w-4/5 bg-dark-800 text-white break-all px-3 py-2 rounded"
        >{{ message }}</view
      >
      <view
        class="max-w-4/5 bg-dark-800 text-white break-all px-3 py-2 rounded"
        >{{ message }}</view
      >
    </view>
    <view class="flex-1 flex flex-col justify-center items-center">
      <view
        class="max-w-4/5 bg-dark-800 text-white break-all px-3 py-2 rounded"
        >{{ message }}</view
      >
    </view>
  </view>
</template>

<script setup>
import ToastBar from "./ToastBar.vue";

const props = defineProps({
  message: String,
  position: {
    type: String,
    default: "bottom"
  }
});
</script>
