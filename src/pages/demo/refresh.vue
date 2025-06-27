<template>
  <view>
    <view class="p-5">
      <view v-for="n in 20" :key="n" class="h-50 bg-gray mb-5"></view>
    </view>
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
