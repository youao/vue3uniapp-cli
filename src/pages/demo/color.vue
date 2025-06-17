<template>
  <ui-page ref="page">
    <view class="p-3">
      <view
        v-for="item in colorList"
        class="h-20"
        :style="'background-color:' + item"
      ></view>
    </view>
  </ui-page>
</template>

<script setup>
import { ref } from "vue";
import { colorMix } from "@/utils/color.js";

const page = ref(null);

const color = "#007aff";
const colorList = [];
for (let i = 9; i > 0; i--) {
  colorList.push(colorMix(color, "#000", i / 10));
}
colorList.push(color);
for (let i = 1; i < 10; i++) {
  colorList.push(colorMix(color, "#fff", i / 10));
}
</script>
