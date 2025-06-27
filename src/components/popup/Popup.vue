<template>
  <view
    v-if="isBe"
    class="size-full fixed top-0 left-0 ui-transition-opacity"
    :class="isShow ? 'opacity-100' : 'opacity-0'"
    :style="popStyle"
    @click="tapMask"
  >
    <view :class="wrapClassName" @click.stop>
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, watch, inject } from "vue";

const page = inject("ui-page");

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

const emits = defineEmits(["show", "hide", "tap-mask"]);

const positionMap = ["center", "top", "bottom", "left", "right"];

const isBe = ref(false);
const isShow = ref(false);
const position = computed(() => {
  return positionMap.includes(props.position) ? props.position : "center";
});
const zIndex = ref(page?.pageLayerZIndex.popout || 999);
const popStyle = computed(() => {
  return {
    backgroundColor: props.mask ? `rgba(0,0,0,${props.mask / 100})` : "",
    zIndex: zIndex.value,
    pointerEvents: props.noPointer ? "none" : "auto"
  };
});
const wrapClassName = computed(() => {
  return ["ui-transition-popup-" + position.value, { on: isShow.value }];
});

watch(
  () => value.value,
  (val) => {
    if (val) {
      zIndex.value = page.getPageLayerZIndex("popout") || 999;
      isBe.value = true;
      setTimeout(() => {
        isShow.value = true;
        setTimeout(() => emits("show"), 300);
      }, 50);
    } else {
      isShow.value = false;
      setTimeout(destroy, 300);
    }
  }
);

function tapMask() {
  emits("tap-mask");
}

function destroy() {
  isBe.value = false;
  emits("hide");
}

defineExpose({ destroy });
</script>
