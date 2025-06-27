<template>
  <view
    :data-top="top"
    :data-bottom="bottom"
    @touchstart="bounce.touchHandler"
    @touchmove="bounce.touchHandler"
    @touchend="bounce.touchHandler"
    @touchcancel="bounce.touchHandler"
    :style="{ minHeight }"
  >
    <slot></slot>
  </view>
</template>
<script>
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    minHeight: String
  }
};
</script>
<script module="bounce" lang="wxs" src="../../renders/touch-bounce.js"></script>
<script module="bounce" lang="renderjs">
import touchs from "@/renders/touch-bounce.js";
export default {
  methods: {
    touchHandler(e) {
      touchs.touchHandler(e);
    }
  }
};
</script>
