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

const uiNormalColors = [
  {
    name: "text",
    cssKey: "color",
    data: {
      base: "#303133",
      regular: "#606266",
      secondary: "#909399",
      placeholder: "#a8abb2",
      disabled: "#c0c4cc"
    }
  },
  {
    name: "text",
    cssKey: "font-size",
    data: {
      md: "16px"
    }
  },
  {
    name: "border",
    cssKey: "border-color",
    data: {
      base: "#dcdfe6",
      light: "#e4e7ed",
      lighter: "#ebeef5",
      extralight: "#f2f6fc",
      dark: "#d4d7de",
      darker: "#cdd0d6"
    }
  },
  {
    name: "rounded",
    cssKey: "border-radius",
    data: {
      DEFAULT: "6px"
    }
  },
  {
    name: "bg",
    cssKey: "background-color",
    data: {
      base: "#ffffff",
      page: "#f2f3f5",
      overlay: "#ffffff"
    }
  },
  {
    name: "fill",
    cssKey: "background-color",
    data: {
      base: "#f0f2f5",
      light: "#f5f7fa",
      lighter: "#fafafa",
      dark: "#ebedf0",
      darker: "#e6e8eb"
    }
  },
  {
    name: "overlay",
    cssKey: "background-color",
    data: {
      base: "rgba(0, 0, 0, .8)",
      light: "rgba(0, 0, 0, .7)",
      lighter: "rgba(0, 0, 0, .5)"
    }
  },
  {
    name: "mask",
    cssKey: "background-color",
    data: {
      base: "rgba(255, 255, 255, .9)",
      light: "rgba(255, 255, 255, .3)"
    }
  },
  {
    name: "shadow",
    cssKey: "box-shadow",
    data: {
      base: "0px 12px 32px 4px rgba(0, 0, 0, .04), 0px 8px 20px rgba(0, 0, 0, .08)",
      light: "0px 0px 12px rgba(0, 0, 0, .12)",
      lighter: "0px 0px 6px rgba(0, 0, 0, .12)",
      dark: "0px 16px 48px 16px rgba(0, 0, 0, .08), 0px 12px 32px rgba(0, 0, 0, .12), 0px 8px 16px -8px rgba(0, 0, 0, .16)"
    }
  }
];

export function getNormalColorsData() {
  const obj = {};
  for (let i = 0; i < uiNormalColors.length; i++) {
    const { name, data } = uiNormalColors[i];
    if (!obj[name]) {
      obj[name] = data;
    } else {
      for (const key in data) {
        obj[name][key] = data[key];
      }
    }
  }
  return obj;
}

export function getNormalColorsUnocssRules() {
  const rules = [];
  for (let i = 0; i < uiNormalColors.length; i++) {
    const { name, cssKey, data } = uiNormalColors[i];
    for (const key in data) {
      rules.push([
        key === "DEFAULT" ? name : `${name}-${key}`,
        {
          [cssKey]: data[key]
        }
      ]);
    }
  }
  return rules;
}
