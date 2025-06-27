<template>
  <view
    class="flex items-center px-1 py-2 rounded pointer-events-auto toast-bar"
    :class="barClass"
  >
    <view v-if="iconName" class="ml-1">
      <UiIcon :name="iconName" />
    </view>
    <view class="px-2 break-all">{{ message }}</view>
  </view>
</template>

<script setup>
import { onMounted, getCurrentInstance, computed } from "vue";
import UiIcon from "../icon/Icon.vue";

const props = defineProps({
  toastId: String,
  message: String,
  type: String,
  icon: String
});

const emits = defineEmits(["load"]);
const instance = getCurrentInstance();

const typeClassMap = {
  dark: "bg-dark-800 text-white",
  light: "bg-white text-dark border-1 border-info-light-7",
  primary: "bg-primary-light-9 text-primary border-1 border-primary-light-5",
  success: "bg-success-light-9 text-success border-1 border-success-light-5",
  warning: "bg-warning-light-9 text-warning border-1 border-warning-light-5",
  danger: "bg-danger-light-9 text-danger border-1 border-danger-light-5"
};

const iconClassMap = [
  "success",
  "warning",
  "error",
  "danger",
  "info",
  "loading"
];

const barClass = computed(() => {
  return typeClassMap[props.type] || typeClassMap.dark;
});

const iconName = computed(() => {
  if (props.icon && iconClassMap.includes(props.icon)) return props.icon;
  if (!props.icon && iconClassMap.includes(props.type)) return props.type;
  return "";
});

onMounted(() => {
  setTimeout(() => {
    uni
      .createSelectorQuery()
      .in(instance)
      .select(".toast-bar")
      .fields({ size: true }, (data) => {
        const options = {
          id: props.toastId,
          data
        };
        emits("load", options);
      })
      .exec();
  }, 50);
});
</script>
