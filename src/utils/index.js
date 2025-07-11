export function isArray(val) {
  return Object.prototype.toString.call(val) === "[object Array]";
}

export function tirmAll(str) {
  if (typeof str !== "string") return str;
  return str.replace(/\s+/g, "");
}

export function rpxToPx(val) {
  if (isNaN(val)) return val;
  return (val * uni.getWindowInfo().windowWidth) / 750;
}
