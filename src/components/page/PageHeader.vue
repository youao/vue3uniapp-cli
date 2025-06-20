<template>
  <view class="bg-white">
    <view class="ui-safe-top-bar"></view>
    <view
      class="flex text-md font-600"
      :class="
        hideLeft && titleAlign === 'left'
          ? 'ui-header-contrainer-fill'
          : 'ui-header-contrainer'
      "
    >
      <view
        v-if="!hideLeft"
        class="ui-header-left ui-mp-menu-light"
        hover-class="uni-hover"
        @click="tapLeft"
      >
        <ui-icon :name="isLaunch ? 'home' : 'left'"></ui-icon>
      </view>
      <view
        class="flex-1 flex items-center ui-header-title overflow-hidden"
        :class="titleAlign === 'left' ? 'justify-start' : 'justify-center'"
      >
        <slot>
          {{ title }}
        </slot>
      </view>
    </view>
  </view>
</template>
<script setup>
defineProps({
  title: String,
  titleAlign: {
    type: String,
    default: "center" // left, center
  },
  isLaunch: {
    type: Boolean,
    default: false
  },
  hideLeft: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(["tap-left"]);

function tapLeft() {
  emits("tap-left");
}
</script>
