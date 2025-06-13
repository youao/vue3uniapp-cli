<template>
  <Popup v-model="show" :mask="0" :position="position" noPointer @show="onShow">
    <view class="w-80vw h-33vh flex justify-center items-center m-a">
      <ToastBar :message="message"></ToastBar>
    </view>
  </Popup>
</template>

<script setup>
import ToastBar from "./ToastBar.vue";
import Popup from "./Popup.vue";

const show = defineModel({
  type: Boolean,
  default: false
});

const props = defineProps({
  message: String,
  position: {
    type: String,
    default: "bottom"
  },
  duration: {
    type: Number,
    default: 2000
  }
});

function onShow() {
  if (props.duration) {
    setTimeout(() => {
      show.value = false;
    }, props.duration);
  }
}
</script>
