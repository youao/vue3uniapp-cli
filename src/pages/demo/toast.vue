<template>
  <ui-page ref="page">
    <view class="p-3">
      <button class="mt-5" @click="fntoast" native>点击 fntoast</button>
    </view>
  </ui-page>
</template>

<script setup>
import { ref } from "vue";

const page = ref(null);

function fntoast() {
  page.value.toast({
    message: "fntoast",
    duration: 2000
  });
}
</script>
