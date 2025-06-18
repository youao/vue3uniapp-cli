<template>
  <ui-page ref="page">
    <view class="p-3">
      <button class="mt-5 ui-button" @click="fntoast('dark')">
        点击 fntoast dark
      </button>
      <button class="mt-5 ui-button" @click="fntoast('light')">
        点击 fntoast light
      </button>
      <button class="mt-5 ui-button" type="primary" @click="fntoast('primary')">
        点击 fntoast primary
      </button>
      <button class="mt-5 ui-button" type="warning" @click="fntoast('warning')">
        点击 fntoast warning
      </button>
      <button class="mt-5 ui-button" type="danger" @click="fntoast('danger')">
        点击 fntoast danger
      </button>
      <!-- <view class="h-50 bg-primary-light-9"></view> -->
    </view>
  </ui-page>
</template>

<script setup>
import { ref } from "vue";

const page = ref(null);

function fntoast(type) {
  page.value.toast({
    message: "fntoast" + type,
    type,
    duration: 2000
  });
}
</script>
