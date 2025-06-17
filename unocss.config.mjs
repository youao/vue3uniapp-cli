import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import presetIcons from "@unocss/preset-icons";
import { getUnocssThemeColors, getThemeCssVarText } from "./src/config/theme";

const platform = process.env.UNI_PLATFORM;
console.log(platform);
const colors = getUnocssThemeColors();

export default {
  presets: [
    presetWeapp({
      whRpx: false
    }),
    presetIcons()
  ],
  theme: {
    colors
  },
  preflights: [
    {
      getCSS: () => {
        const root = platform === 'mp-weixin' ? 'page' : ':root'
        const cssVarText = getThemeCssVarText(colors, '--ui')
        return `${root} {${cssVarText}}`
      }
    }
  ],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10"
    }
  ],
  transformers: [transformerClass()]
};
