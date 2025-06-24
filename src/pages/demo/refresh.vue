<template>
  <view
    class="p-5"
    :data-scrolltop="scrollTop"
    @touchstart="test.touchevent"
    @touchmove="test.touchevent"
    @touchend="test.touchevent"
    @touchcancel="test.touchevent"
  >
    <view v-for="n in 20" :key="n" class="h-50 bg-gray mb-5"></view>
  </view>
</template>

<script>
// import { ref } from "vue";
// import { onPageScroll } from "@dcloudio/uni-app";
export default {
  data() {
    return {
      scrollTop: 0
    };
  },
  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  }
};
</script>
<script module="test" lang="wxs">
/**
 * https://uniapp.dcloud.net.cn/tutorial/miniprogram-subject.html#wxs
 * https://developers.weixin.qq.com/miniprogram/dev/framework/view/interactive-animation.html
 * 直接运行在视图层，避免使用es6语法
 */

var canMove = false;
var startY = 0;
var moveY = 0;
function touchevent(event) {
  var type = event.type;
  switch (event.type) {
    case "touchstart":
      onTouchStart(event);
      break;
    case "touchmove":
      onTouchMove(event);
      break;
    case "touchend":
    case "touchcancel":
      onTouchEnd(event);
      break;
  }
  //   return false;
}

function onTouchStart(event) {
  var instance = event.instance;
  var dataset = instance.getDataset();
  var scrollTop = dataset.scrolltop;
  canMove = scrollTop === 0;
  var touch = event.touches[0] || event.changedTouches[0];
  startY = touch.clientY;
  moveY = 0;
}

function onTouchMove(event) {
  if (!canMove) return;
  var touch = event.touches[0] || event.changedTouches[0];
  var clientY = touch.clientY;
  if (clientY < startY) return;
  var distance = clientY - startY;
  console.log(distance);
  event.instance.setStyle({
    transform: "translateY(" + distance + "px)"
  });
}

function onTouchEnd(event) {
  if (!canMove) return;
  event.instance.setStyle({
    transform: "translateY(0px)",
    transition: "transform 0.5s ease"
  });
}

function log(params) {
  console.log(JSON.stringify(params));
}
module.exports = {
  touchevent: touchevent
};
</script>

<script module="test" lang="renderjs">
/**
 * https://uniapp.dcloud.net.cn/tutorial/renderjs.html
 */

export default {
  data() {
    return {
      canMove: false,
      startY: 0,
      scrollTop: 0
    };
  },
  onPageScroll(event) {
    this.scrollTop = event.scrollTop;
  },
  methods: {
    touchevent(event) {
      var type = event.type;
      switch (event.type) {
        case "touchstart":
          this.onTouchStart(event);
          break;
        case "touchmove":
          this.onTouchMove(event);
          break;
        case "touchend":
        case "touchcancel":
          this.onTouchEnd(event);
          break;
      }
    },
    onTouchStart(event) {
      var instance = event.instance;
      var dataset = instance.getDataset();
      var scrollTop = dataset.scrolltop;

      this.canMove = scrollTop == 0;
      var touch = event.touches[0] || event.changedTouches[0];
      this.startY = touch.clientY;
    },
    onTouchMove(event) {
      if (!this.canMove) return;
      var touch = event.touches[0] || event.changedTouches[0];
      var clientY = touch.clientY;
      if (clientY < this.startY) return;
      var distance = clientY - this.startY;
      event.instance.setStyle({
        transform: "translateY(" + distance + "px)"
      });
    },
    onTouchEnd(event) {
      if (!this.canMove) return;
      event.instance.setStyle({
        transform: "translateY(0px)",
        transition: "transform 0.5s ease"
      });
    }
  }
};
</script>
