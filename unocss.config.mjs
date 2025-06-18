import presetWeapp from "unocss-preset-weapp";
import { transformerClass } from "unocss-preset-weapp/transformer";
import presetIcons from "@unocss/preset-icons";
import {
  getUnocssThemeColors,
  getThemeCssVarText,
  getNormalColorsData,
  getNormalColorsUnocssRules
} from "./src/config/theme";

const platform = process.env.UNI_PLATFORM;
const colors = getUnocssThemeColors();
const normalColors = getNormalColorsData();

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
        const root = platform === "mp-weixin" ? "page" : ":root";
        const themeCssVarText = getThemeCssVarText(colors, "--ui");
        const normalCssVarText = getThemeCssVarText(normalColors, "--ui");
        return `${root} {${themeCssVarText}${normalCssVarText}}`;
      }
    }
  ],
  rules: [...getNormalColorsUnocssRules()],
  shortcuts: [
    {
      "border-base": "border border-gray-500_10"
    }
  ],
  transformers: [transformerClass()]
};
