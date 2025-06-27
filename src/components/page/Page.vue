<template>
  <view class="ui-page" :style="pageStyle">
    <!-- header -->
    <Fixed
      fixed-id="header"
      :blank="headerHeight + 'px'"
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
    <BounceView
      :top="headerHeight"
      :bottom="contentBottom"
      :minHeight="contentHeight + 'px'"
    >
      <slot></slot>
    </BounceView>
    <!-- tabbar -->
    <Fixed
      v-if="isTabbar"
      fixed-id="tabbar"
      type="bottom"
      :blank="tabbarHeight"
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
import PageHeader from "./PageHeader.vue";
import Fixed from "./Fixed.vue";
import Tabbar from "./Tabbar.vue";
import BounceView from "../touch/BounceView.vue";
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
const { screenHeight } = windowInfo;
const safe = windowInfo.safeAreaInsets;
const safeTop = windowInfo.statusBarHeight || safe.top;
const pageStyle = {
  width: windowInfo.screenWidth + "px",
  height: +"px"
};
if (safeTop) {
  pageStyle["--ui-safe-area-top"] = safeTop + "px";
}
if (safe.bottom) {
  pageStyle["--ui-safe-area-bottom"] = safe.bottom + "px";
}
// #ifdef MP-WEIXIN
const menuRect = uni.getMenuButtonBoundingClientRect();
// console.log(menuRect);
pageStyle["--mp-menu-width"] = menuRect.width + "px";
pageStyle["--mp-menu-height"] = menuRect.height + "px";
const spaceTop = menuRect.top - safeTop;
pageStyle["--mp-menu-top"] = spaceTop + "px";
const spaceRight = windowInfo.windowWidth - menuRect.right;
pageStyle["--mp-menu-right"] = spaceRight + "px";
pageStyle["--ui-header-between"] = menuRect.width + spaceRight + "px";
// #endif
const headerHeight = rpxToPx(88) + safeTop;
pageStyle["--ui-header-height"] = headerHeight + "px";

const pages = getCurrentPages();
// console.log(pages);
const isLaunch = pages.length === 1;
const currentPage = pages[pages.length - 1];
const currentPagePath = currentPage.route;
const isTabbar = TabbarPathList.indexOf(currentPage.route) > -1;
if (isTabbar) {
  uni.hideTabBar();
}
const tabbarHeight = TabbarConfig.height + safe.bottom;
const contentHeight =
  screenHeight - headerHeight - (isTabbar ? tabbarHeight : 0);
const contentBottom = isTabbar ? screenHeight - tabbarHeight : screenHeight;

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
