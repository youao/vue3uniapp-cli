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
import { ref } from "vue";
import { onPageScroll } from "@dcloudio/uni-app";
export default {
  setup() {
    const scrollTop = ref(0);

    onPageScroll((event) => {
      scrollTop.value = event.scrollTop;
    });

    return {
      scrollTop
    };
  }
};
</script>
<script module="test" lang="wxs" src="../../utils/touch.js"></script>

<script module="test" lang="renderjs">
import touchs from "@/utils/touch.js";
export default {
  methods: {
    touchevent(e) {
      touchs.touchevent(e);
    }
  }
};
</script>
