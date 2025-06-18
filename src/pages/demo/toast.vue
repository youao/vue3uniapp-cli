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
      <button class="mt-5 ui-button" type="success" @click="fntoast('success')">
        点击 fntoast success
      </button>
      <button class="mt-5 ui-button" type="warning" @click="fntoast('warning')">
        点击 fntoast warning
      </button>
      <button class="mt-5 ui-button" type="danger" @click="fntoast('danger')">
        点击 fntoast danger
      </button>
      <button class="mt-5 ui-button" type="primary" @click="toastLoading()">
        点击 open toastLoading
      </button>
      <button class="mt-5 ui-button" type="primary" @click="closeLoading()">
        点击 close toastLoading
      </button>
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
    duration: 20000
  });
}

let close = null;
function toastLoading() {
  close = page.value.toast({
    message: "toastLoading",
    type: "primary",
    duration: 0,
    icon: "loading"
  });
}

function closeLoading() {
  close && close();
}
</script>

<style></style>
