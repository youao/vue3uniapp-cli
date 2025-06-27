<template>
  <view :style="tabbarContainerStyle" class="border-base">
    <view class="flex box-border" :style="tabbarStyle">
      <view
        v-for="item in tabbarList"
        :key="item.pagePath"
        class="flex-1 flex flex-col items-center justify-center"
        :style="item.itemStyle"
        @click="tapItem(item)"
      >
        <image :src="item.iconPath" :style="item.iconStyle"></image>
        <view>{{ item.text }}</view>
      </view>
    </view>
    <view class="ui-safe-bottom-bar"></view>
  </view>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  config: {
    type: Object,
    default: () => {}
  },
  path: String
});
const emits = defineEmits(["tap-item"]);

const tabbarContainerStyle = computed(() => {
  const { backgroundColor } = props.config;
  return {
    backgroundColor
  };
});

const tabbarStyle = computed(() => {
  const { height } = props.config;
  return {
    height: height + "px"
  };
});

const tabbarList = computed(() => {
  if (!props.config || !props.config.list) return [];
  const { color, selectedColor, fontSize, iconWidth, spacing } = props.config;
  const iconStyle = {
    width: iconWidth,
    height: iconWidth,
    marginBottom: spacing
  };
  return props.config.list.map((item) => {
    const { pagePath, text, iconPath, selectedIconPath } = item;
    const isActive = pagePath === props.path;
    return {
      text,
      iconPath: isActive ? selectedIconPath : iconPath,
      itemStyle: {
        color: isActive ? selectedColor : color,
        fontSize
      },
      iconStyle,
      pagePath
    };
  });
});

function tapItem(item) {
  emits("tap-item", item);
}
</script>
