<template>
  <view :style="'height:' + blankHeight">
    <view :id="useId" :style="fixedStyle">
      <slot></slot>
    </view>
  </view>
</template>
<script setup>
import { ref, computed, onMounted, getCurrentInstance } from "vue";

const randomNum = new Date().getTime() + "" + Math.floor(Math.random() * 1000);

const props = defineProps({
  fixedId: String,
  fixed: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    default: "top"
  },
  value: {
    type: Number,
    default: 0
  },
  blank: {
    type: [Number, String],
    default: "auto"
  },
  zIndex: Number
});

const emits = defineEmits(["load"]);

const instance = getCurrentInstance();

const useId = computed(() => {
  return (props.fixedId || "fixed") + "-" + randomNum;
});

const fixedStyle = computed(() => {
  return {
    position: props.fixed ? "fixed" : "relative",
    zIndex: props.zIndex,
    [props.type]: props.value + "px",
    right: 0,
    left: 0
  };
});
const fixedHeight = ref(0);
const blankHeight = computed(() => {
  if (!isNaN(props.blank)) return props.blank + "px";
  if (props.blank == "auto") return fixedHeight.value + "px";
  return props.blank;
});

onMounted(() => {
  if (props.blank == "auto") {
    setTimeout(setContentHeight, 300);
  }
});

function setContentHeight() {
  uni
    .createSelectorQuery()
    .in(instance)
    .select("#" + useId.value)
    .boundingClientRect((data) => {
      //   console.log("setContentHeight", data);
      if (data?.height) {
        fixedHeight.value = data.height;
        emits("load", data);
      }
    })
    .exec();
}
</script>
