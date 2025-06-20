<template>
  <ui-page title="主题">
    <view class="px-3 text-white mb-5">
      <view v-for="(item, key) in uiColors" :key="key">
        <view
          class="h-20 mt-6"
          :style="'background-color: var(--ui-' + key + ')'"
          >{{ key }}:{{ item }}</view
        >
        <view
          v-for="(child, index) in colorChildren"
          :key="index"
          class="h-10 mt-2"
          :style="
            'background-color: var(--ui-' +
            key +
            '-' +
            child.type +
            '-' +
            child.ratio +
            ')'
          "
        >
        </view>
      </view>
    </view>
  </ui-page>
</template>

<script setup>
import { uiColors, colorChildren } from "@/config/theme.js";
</script>
