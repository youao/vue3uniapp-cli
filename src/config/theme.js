import { colorMix } from "../utils/color.js";

export const uiColors = {
  primary: "#409EFF",
  success: "#67C23A",
  warning: "#E6A23C",
  danger: "#F56C6C",
  info: "#909399"
};

const colorChildren = [
  {
    type: "dark",
    ratio: 2
  },
  {
    type: "light",
    ratio: 3
  },
  {
    type: "light",
    ratio: 5
  },
  {
    type: "light",
    ratio: 7
  },
  {
    type: "light",
    ratio: 8
  },
  {
    type: "light",
    ratio: 9
  }
];

export function getUnocssThemeColors() {
  const colors = {};
  for (let name in uiColors) {
    const color = uiColors[name];
    colors[name] = {
      DEFAULT: color
    };
    colorChildren.forEach((item) => {
      const mixTarget = item.type === "dark" ? "#000" : "#fff";
      colors[name][`${item.type}-${item.ratio}`] = colorMix(
        color,
        mixTarget,
        item.ratio / 10
      );
    });
  }
  return colors;
}

export function getThemeCssVarText(theme, base) {
  let text = "";
  for (let name in theme) {
    const data = theme[name];
    if (data instanceof Object) {
      text += getThemeCssVarText(data, base + "-" + name);
    } else if (typeof data === "string") {
      if (name === "DEFAULT") {
        text += `${base}: ${data};\n`;
      } else {
        text += `${base}-${name}: ${data};\n`;
      }
    }
  }
  return text;
}
