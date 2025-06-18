<template>
  <text v-if="name == 'success'" class="i-weui:done2-filled"></text>
  <text v-else-if="name == 'warning'" class="i-weui:error-filled"></text>
  <text v-else-if="name == 'error'" class="i-weui:close2-filled"></text>
  <text
    v-else-if="name == 'danger'"
    class="i-weui:report-problem-filled"
  ></text>
  <text v-else-if="name == 'info'" class="i-weui:info-filled"></text>
  <text v-else-if="name == 'loading'" class="i-ep:loading ui-rotate"></text>
</template>

<script setup>
defineProps({
  name: String
});
</script>
