<template>
  <view
    class="w-4/5 fixed top-10vh left-1/10 flex flex-col justify-start items-center pointer-events-none"
  >
    <view
      v-for="(item, key) in list"
      :key="key"
      class="overflow-hidden ui-transition-toast flex items-center"
      :style="item.style"
    >
      <ToastBar
        :toastId="key"
        :message="item.message"
        :type="item.type"
        @load="onToastBarLoad"
      ></ToastBar>
    </view>
  </view>
</template>

<script setup>
import { ref } from "vue";
import ToastBar from "./ToastBar.vue";

const app = getApp();

const list = ref({});

const defaultOptions = {
  duration: 2000
};

function openToast(message) {
  if (!message) return;
  let opts = {};
  if (typeof message == "string") {
    opts.message = message;
  } else if (message instanceof Object) {
    opts = message;
  }
  if (!opts.message) return;
  const toastId = getToastId();
  const options = {
    ...defaultOptions,
    ...opts,
    style: getToastBarStyle(0)
  };
  list.value[toastId] = options;
}

function getToastBarStyle(h) {
  return {
    height: h + "px",
    opacity: h > 0 ? 1 : 0,
    zIndex: h > 0 ? app.usePopupZIndex() : 0
  };
}

function onToastBarLoad(options) {
  const { id, data } = options;
  if (!id || !list.value[id] || !data || !data.height) return;
  const item = list.value[id];
  item.style = getToastBarStyle(data.height + 16);
  if (item.duration > 0) {
    setTimeout(() => {
      setTimeout(() => closeToast(id), item.duration);
    }, 300);
  }
}

function getToastId() {
  const t = new Date().getTime();
  const random = Math.random().toString(16).substring(2);
  return "_ui_toast_" + t + "_" + random;
}

function closeToast(key) {
  if (key && key in list.value) {
    list.value[key].style = getToastBarStyle(0);
    setTimeout(() => {
      delete list.value[key];
    }, 300);
  }
}

defineExpose({ openToast, closeToast });
</script>
