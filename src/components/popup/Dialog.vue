<template>
  <Popup
    v-model="show"
    :position="position"
    :mask="mask"
    @show="onShow"
    @hide="onHide"
    @tap-mask="onTapMask"
  >
    <view class="bg-overlay text-md flex flex-col" :style="useWrapStyles">
      <slot name="header">
        <view v-if="!hideHeader" class="relative pt-8 px-6 pb-4">
          <slot name="title">
            <view
              v-if="title"
              class="text-base text-center font-500"
              :style="'text-align:' + titleAlign"
              >{{ title }}</view
            >
          </slot>
          <view
            v-if="!hideColse && closeAble"
            class="absolute top-4 right-4 text-5 text-gray"
            @click="onClose"
          >
            <ui-icon name="close"></ui-icon>
          </view>
        </view>
      </slot>
      <view class="flex-1 overflow-y-auto">
        <slot name="content">
          <view class="px-6 pb-4">
            <slot>
              <view class="text-regular">{{ content }}</view>
            </slot>
          </view>
        </slot>
      </view>
      <slot name="footer">
        <view v-if="!hideFooter" class="flex p-4">
          <button
            v-if="!hideCancel"
            class="flex-1 ui-button circle mr-4"
            :type="cancelType"
            @click="onCancel"
          >
            {{ cancelText }}
          </button>
          <button
            class="flex-1 ui-button circle"
            :type="confirmType"
            @click="onConfirm"
          >
            {{ confirmText }}
          </button>
        </view>
      </slot>
    </view>
  </Popup>
</template>
<script setup>
import { computed } from "vue";
import Popup from "./Popup.vue";

const show = defineModel({
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
  tapMaskClose: {
    type: Boolean,
    default: false
  },
  wrapStyle: {
    type: Object,
    default: () => {
      return {};
    }
  },
  title: String,
  hideHeader: {
    type: Boolean,
    default: false
  },
  hideColse: {
    type: Boolean,
    default: false
  },
  customerCloseTap: {
    type: Boolean,
    default: false
  },
  content: String,
  hideFooter: {
    type: Boolean,
    default: false
  },
  hideCancel: {
    type: Boolean,
    default: false
  },
  cancelText: {
    type: String,
    default: "取消"
  },
  cancelType: String,
  customerCancelTap: {
    type: Boolean,
    default: false
  },
  confirmText: {
    type: String,
    default: "确定"
  },
  confirmType: {
    type: String,
    default: "primary"
  },
  tapConfirmClose: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits([
  "show",
  "hide",
  "tap-mask",
  "confirm",
  "cancel",
  "close"
]);

const defaultWrapStyles = {
  center: {
    width: "640rpx",
    maxHeight: "80vh",
    borderRadius: "16rpx"
  },
  top: {
    width: "750rpx",
    maxHeight: "80vh",
    margin: "auto",
    borderRadius: "0 0 16rpx 16rpx"
  },
  bottom: {
    width: "750rpx",
    maxHeight: "80vh",
    margin: "auto",
    borderRadius: "16rpx 16rpx 0 0"
  },
  right: {
    width: "640rpx",
    height: "100vh",
    borderRadius: "0"
  },
  left: {
    width: "640rpx",
    height: "100vh",
    borderRadius: "0"
  }
};

const useWrapStyles = computed(() => {
  const dft = defaultWrapStyles[props.position] || defaultWrapStyles.center;
  return {
    ...dft,
    ...props.wrapStyle
  };
});

const closeAble = computed(() => {
  // #ifdef MP-WEIXIN
  return ["center", "bottom"].includes(props.position);
  // #endif
  // #ifndef MP-WEIXIN
  return true;
  // #endif
});

const titleAlign = computed(() => {
  return ["left", "right"].includes(props.position) ? "left" : "center";
});

function onShow() {
  emits("show");
}

function onHide() {
  emits("hide");
}

function onTapMask() {
  if (props.tapMaskClose) {
    onClose();
  } else {
    emits("tap-mask");
  }
}

function onClose() {
  if (props.customerCloseTap) {
    emits("close");
  } else {
    show.value = false;
  }
}

function onCancel() {
  if (props.customerCancelTap) {
    emits("cancel");
  } else {
    onClose();
  }
}

function onConfirm() {
  if (props.tapConfirmClose) {
    onClose();
  } else {
    emits("confirm");
  }
}
</script>
