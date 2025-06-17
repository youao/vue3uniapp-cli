import { tirmAll } from "./index.js";

const regRgb = /^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)$/;
const regRgba = /^rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),(0\.\d+)\)$/;
const regHsl = /^hsl\((\d{1,3}),(\d{1,3})%,(\d{1,3})%\)$/;
const regHsla = /^hsla\((\d{1,3}),(\d{1,3})%,(\d{1,3})%,(0\.\d+)\)$/;
const regHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i;
const regHex3 = /^#?([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i;

export function parseColor(text) {
  text = tirmAll(text);
  if (regHex.test(text)) {
    const match = text.match(regHex);
    return {
      mode: "hex",
      original: text,
      value: [match[1], match[2], match[3], match[4] || "ff"]
    };
  }

  if (regHex3.test(text)) {
    const match = text.match(regHex3);
    return {
      mode: "hex",
      original: text,
      value: [match[1], match[2], match[3], match[4] || "f"].map(
        (item) => item + item
      )
    };
  }

  if (regRgb.test(text)) {
    const match = text.match(regRgb);
    return {
      mode: "rgb",
      original: text,
      value: [match[1], match[2], match[3], 1]
    };
  }

  if (regRgba.test(text)) {
    const match = text.match(regRgba);
    return {
      mode: "rgb",
      original: text,
      value: [match[1], match[2], match[3], match[4]]
    };
  }

  if (regHsl.test(text)) {
    const match = text.match(regHsl);
    return {
      mode: "hsl",
      original: text,
      value: [match[1], match[2], match[3], 1]
    };
  }

  if (regHsla.test(text)) {
    const match = text.match(regHsla);
    return {
      mode: "hsl",
      original: text,
      value: [match[1], match[2], match[3], match[4]]
    };
  }

  return null;
}

export function getRgbValue(text) {
  const data = parseColor(text);
  if (!data) {
    return [0, 0, 0, 0];
  }
  switch (data.mode) {
    case "hex":
      return hexToRgb(data.value);
    case "rgb":
      return data.value;
    case "hsl":
      return hslToRgb(...data.value);
    default:
      return [0, 0, 0, 0];
  }
}

export function colorMix(base, target, ratio) {
  ratio = Math.max(Math.min(Number(ratio), 1), 0);
  const [r, g, b, a] = getRgbValue(target);
  if (!a) return base;
  const baseArr = getRgbValue(base);
  const mix = [r, g, b].map((item, index) => {
    return Math.round(baseArr[index] * (1 - ratio) + item * ratio);
  });
  const baseA = baseArr[3];
  return baseA == 1
    ? `rgb(${mix.join(",")})`
    : `rgba(${mix.join(",")},${baseArr[3]})`;
}

function hexToRgb(hexs) {
  const [r, g, b, a] = hexs.map((item) => parseInt(item, 16));
  return [r, g, b, formatRatio(a / 255)];
}

function hslToRgb(h, s, l, a = 1) {
  // 标准化输入（允许超出范围，自动取模/截断）
  h = h % 360; // 确保色相在 0°~360°
  s = Math.max(0, Math.min(100, s)); // 饱和度限制在 0%~100%
  l = Math.max(0, Math.min(100, l)); // 亮度限制在 0%~100%

  // 转换为小数
  h /= 360;
  s /= 100;
  l /= 100;

  let r, g, b;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
  const m = l - c / 2;

  // 确定区间
  const i = Math.floor(h * 6);
  const f = h * 6 - i; // 区间内的位置（0~1）

  // 根据区间分配分量
  switch (i) {
    case 0:
      r = c;
      g = x;
      b = 0;
      break;
    case 1:
      r = x;
      g = c;
      b = 0;
      break;
    case 2:
      r = 0;
      g = c;
      b = x;
      break;
    case 3:
      r = 0;
      g = x;
      b = c;
      break;
    case 4:
      r = x;
      g = 0;
      b = c;
      break;
    case 5:
      r = c;
      g = 0;
      b = x;
      break;
    default:
      r = g = b = 0;
  }

  // 计算最终 RGB 值并取整
  const to255 = (n) => Math.round((n + m) * 255);
  return [to255(r), to255(g), to255(b), a];
}

function formatRatio(val) {
  if (val >= 1) return 1;
  if (val <= 0) return 0;
  return +(+val).toFixed(3).slice(0, -2);
}
