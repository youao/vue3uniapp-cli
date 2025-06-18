import { colorMix } from "../utils/color.js";

export const uiColors = {
  primary: "#409EFF",
  success: "#67C23A",
  warning: "#E6A23C",
  danger: "#F56C6C",
  info: "#909399"
};

export const colorChildren = [
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

export const colorChildrenMap = {
  dark: [2],
  light: [3, 5, 7, 8, 9]
};

export function getUnocssThemeColors() {
  const colors = {};
  for (let name in uiColors) {
    const color = uiColors[name];
    colors[name] = {
      DEFAULT: color
    };
    for (let k in colorChildrenMap) {
      const childs = colorChildrenMap[k];
      colors[name][k] = {};
      const mixTarget = k === "dark" ? "#000" : "#fff";
      for (let i = 0; i < childs.length; i++) {
        const child = childs[i];
        colors[name][k][child] = colorMix(color, mixTarget, child / 10);
      }
    }
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
