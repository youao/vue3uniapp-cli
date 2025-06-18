<template>
  <view
    class="break-all px-3 py-2 rounded pointer-events-auto toast-bar"
    :class="barClass"
    >{{ message }}</view
  >
</template>

<script setup>
import { onMounted, getCurrentInstance, computed } from "vue";

const props = defineProps({
  toastId: String,
  message: String,
  type: String
});

const emits = defineEmits(["load"]);
const instance = getCurrentInstance();

const typeClassMap = {
  dark: "bg-dark-800 text-white",
  light: "bg-white text-dark border-1 border-info-light-7",
  primary: "bg-primary-light-9 text-primary border-1 border-primary-light-5",
  warning: "bg-warning-light-9 text-warning border-1 border-warning-light-5",
  danger: "bg-danger-light-9 text-danger border-1 border-danger-light-5"
};

const barClass = computed(() => {
  return typeClassMap[props.type] || typeClassMap.dark;
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
