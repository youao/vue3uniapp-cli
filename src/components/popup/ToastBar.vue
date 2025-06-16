<template>
  <view
    class="bg-dark-800 text-white break-all px-3 py-2 rounded pointer-events-auto toast-bar"
    >{{ message }}</view
  >
</template>

<script setup>
import { onMounted, getCurrentInstance } from "vue";

const props = defineProps({
  toastId: String,
  message: String
});

const emits = defineEmits(["load"]);
const instance = getCurrentInstance();

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
  }, 100);
});
</script>
