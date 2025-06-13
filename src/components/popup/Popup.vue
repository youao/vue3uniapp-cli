<template>
  <view
    v-if="isBe"
    class="size-full fixed top-0 left-0"
    :class="popClassName"
    :style="popStyle"
    @click="tapMask"
  >
    <view class="absolute" :class="wrapClassName" @click.stop>
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const app = getApp();

const value = defineModel({
  type: Boolean,
  default: false
});

const props = defineProps({
  position: {
    type: String,
    default: "center"
  },
  mask: {
    type: Number,
    default: 50
  },
  noPointer: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(["show", "hide"]);

const positionMap = ["center", "top", "bottom", "left", "right"];

const isBe = ref(false);
const isShow = ref(false);
const position = computed(() => {
  return positionMap.includes(props.position) ? props.position : "center";
});
const popClassName = computed(() => {
  return [
    isShow.value ? "opacity-100" : "opacity-0",
    { "pointer-events-none": props.noPointer }
  ];
});
const zIndex = ref(app.globalData.popupZIndex);
const popStyle = computed(() => {
  return {
    backgroundColor: props.mask ? `rgba(0,0,0,${props.mask / 100})` : "",
    zIndex: zIndex.value
  };
});
const wrapClassName = computed(() => {
  return ["ui-transition-popup-" + position.value, { on: isShow.value }];
});

watch(
  () => value.value,
  (val) => {
    if (val) {
      zIndex.value = app.usePopupZIndex();
      isBe.value = true;
      setTimeout(() => {
        isShow.value = true;
        setTimeout(() => emits("show"), 300);
      }, 50);
    } else {
      isShow.value = false;
      setTimeout(() => {
        isBe.value = false;
        emits("hide");
      }, 300);
    }
  }
);

function tapMask() {
  value.value = false;
}
</script>

<style lang="scss"></style>
