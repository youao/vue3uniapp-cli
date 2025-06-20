<template>
  <ui-page title="dialog">
    <view class="p-5">
      <button
        class="ui-button mb-5"
        type="primary"
        @click="openDialog('center')"
      >
        点击center
      </button>
      <button
        class="ui-button mb-5"
        type="primary"
        @click="openDialog('bottom')"
      >
        点击bottom
      </button>
      <button class="ui-button mb-5" type="primary" @click="openDialog('top')">
        点击top
      </button>
      <button
        class="ui-button mb-5"
        type="primary"
        @click="openDialog('right')"
      >
        点击right
      </button>
      <button class="ui-button mb-5" type="primary" @click="openDialog('left')">
        点击left
      </button>
      <Dialog
        v-model="show"
        title="弹窗标题"
        content="弹窗内容，告知当前状态、信息和解决方法，描述文字尽量控制在三行内"
        :position="position"
      ></Dialog>
    </view>
  </ui-page>
</template>
<script setup>
import { ref } from "vue";
import Dialog from "@/components/popup/Dialog.vue";

const show = ref(false);
const position = ref("center");

function openDialog(value) {
  position.value = value;
  show.value = true;
}
</script>
