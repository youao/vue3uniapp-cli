import presetWeapp from "unocss-preset-weapp";
import {
  extractorAttributify,
  transformerClass
} from "unocss-preset-weapp/transformer";
import presetIcons from "@unocss/preset-icons";

const { presetWeappAttributify, transformerAttributify } =
  extractorAttributify();

export default {
  presets: [
    presetWeapp({
      whRpx: false
    }),
    presetWeappAttributify(),
    presetIcons()
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10"
    }
  ],
  transformers: [transformerAttributify(), transformerClass()]
};
