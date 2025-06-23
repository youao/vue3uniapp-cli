<template>
  <view class="ui-page" :style="pageStyle">
    <!-- header -->
    <Fixed
      fixed-id="header"
      :blank="headerHeight"
      :z-index="pageLayerZIndex.navigation"
    >
      <PageHeader
        :titleAlign="titleAlign"
        :isLaunch="isLaunch"
        :hideLeft="hideLeft || isTabbar"
        @tap-left="onTapLeft"
      >
        <slot name="title">{{ title }}</slot>
      </PageHeader>
    </Fixed>
    <!-- content -->
    <slot></slot>
    <!-- tabbar -->
    <Fixed
      v-if="isTabbar && TabbarConfig?.list"
      fixed-id="tabbar"
      type="bottom"
      :z-index="pageLayerZIndex.navigation"
    >
      <Tabbar
        :config="TabbarConfig"
        :path="currentPagePath"
        @tap-item="onTapTabbarItem"
      />
    </Fixed>
    <!-- toast -->
    <ToastQueue ref="toastQueue" />
  </view>
</template>
<script setup>
import { ref, provide } from "vue";
import { TabbarPathList, TabbarConfig } from "@/config/app.js";
import { rpxToPx } from "@/utils/index.js";
// import { onLoad } from "@dcloudio/uni-app";
import PageHeader from "./PageHeader.vue";
import Fixed from "./Fixed.vue";
import Tabbar from "./Tabbar.vue";
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
pageStyle["--mp-menu-width"] = menuRect.width + "px";
pageStyle["--mp-menu-height"] = menuRect.height + "px";
const spaceTop = menuRect.top - safe.top;
pageStyle["--mp-menu-top"] = spaceTop + "px";
const spaceRight = windowInfo.windowWidth - menuRect.right;
pageStyle["--mp-menu-right"] = spaceRight + "px";
pageStyle["--ui-header-between"] = menuRect.width + spaceRight + "px";
// #endif
const headerHeight = rpxToPx(88) + safe.top + "px";
pageStyle["--ui-header-height"] = headerHeight;

const pages = getCurrentPages();
// console.log(pages);
const isLaunch = pages.length === 1;
const currentPage = pages[pages.length - 1];
const currentPagePath = currentPage.route;
const isTabbar = TabbarPathList.indexOf(currentPage.route) > -1;
if (isTabbar) {
  uni.hideTabBar();
}

function onTapLeft() {
  if (isLaunch) {
    uni.switchTab({
      url: "/" + TabbarPathList[0]
    });
  } else {
    uni.navigateBack();
  }
}

const pageLayerZIndex = {
  popout: 999,
  navigation: 699,
  fixed: 399,
  content: 99
};

function getPageLayerZIndex(layer) {
  return ++pageLayerZIndex[layer];
}

function onTapTabbarItem(item) {
  uni.switchTab({ url: "/" + item.pagePath });
}

const toastQueue = ref(null);

function toast(message) {
  return toastQueue.value?.openToast(message);
}

defineExpose({ toast, getPageLayerZIndex });
provide("ui-page", {
  currentPage,
  pageLayerZIndex,
  getPageLayerZIndex
});
</script>
