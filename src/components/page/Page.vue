<template>
  <view class="ui-page" :style="pageStyle">
    <PageHeader
      :titleAlign="titleAlign"
      :isLaunch="isLaunch"
      :hideLeft="hideLeft || isTabbar"
      @tap-left="onTapLeft"
    >
      <slot name="title">{{ title }}</slot>
    </PageHeader>
    <slot></slot>

    <!-- toast -->
    <ToastQueue ref="toastQueue" />
  </view>
</template>
<script setup>
import { ref } from "vue";
import { TabbarPathList } from "@/config/app.js";
// import { onLoad } from "@dcloudio/uni-app";
import PageHeader from "./PageHeader.vue";
import ToastQueue from "../popup/ToastQueue.vue";

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  titleAlign: String,
  hideLeft: {
    type: Boolean,
    default: false
  }
});

const windowInfo = uni.getWindowInfo();
// console.log(windowInfo);
const safe = windowInfo.safeAreaInsets;
const pageStyle = {};
if (safe.top) {
  pageStyle["--ui-safe-area-top"] = safe.top + "px";
}
if (safe.bottom) {
  pageStyle["--ui-safe-area-bottom"] = safe.bottom + "px";
}
// #ifdef MP-WEIXIN
const menuRect = uni.getMenuButtonBoundingClientRect();
// console.log(menuRect);
// 87px
pageStyle["--mp-menu-width"] = menuRect.width + "px";
// 32px
pageStyle["--mp-menu-height"] = menuRect.height + "px";
// 4px
const spaceTop = menuRect.top - safe.top;
pageStyle["--mp-menu-top"] = spaceTop + "px";
// 7px
const spaceRight = windowInfo.windowWidth - menuRect.right;
pageStyle["--mp-menu-right"] = spaceRight + "px";
pageStyle["--ui-header-between"] = menuRect.width + spaceRight + "px";
// #endif

const pages = getCurrentPages();
console.log(pages);
const isLaunch = pages.length === 1;
const currentPage = pages[pages.length - 1];
const isTabbar = TabbarPathList.indexOf(currentPage.route) > -1;

function onTapLeft() {
  if (isLaunch) {
    uni.reLaunch({
      url: TabbarPathList[0]
    });
  } else {
    uni.navigateBack();
  }
}

const toastQueue = ref(null);

function toast(message) {
  return toastQueue.value?.openToast(message);
}

defineExpose({ toast });
</script>
