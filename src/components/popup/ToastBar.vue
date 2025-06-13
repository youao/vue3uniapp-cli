<template>
  <view
    class="bg-dark-800 text-white break-all px-3 py-2 rounded pointer-events-auto"
    >{{ message }}</view
  >
</template>

<script setup>
const props = defineProps({
  message: String
});
</script>
