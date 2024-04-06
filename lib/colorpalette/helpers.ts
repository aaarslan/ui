const hexToRgb = (hex: string) => {
  let h = hex.slice(hex.startsWith("#") ? 1 : 0);
  if (h.length === 3) {
    h = [...h].map((x) => x + x).join("");
  }
  const r = Number.parseInt(h.substring(0, 2), 16);
  const g = Number.parseInt(h.substring(2, 4), 16);
  const b = Number.parseInt(h.substring(4, 6), 16);
  if (h.length === 8) {
    const a = Number.parseInt(h.substring(6, 8), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHsb = (r: number, g: number, b: number) => {
  const normalizedR = r / 255;
  const normalizedG = g / 255;
  const normalizedB = b / 255;
  const v = Math.max(normalizedR, normalizedG, normalizedB);
  const n = v - Math.min(normalizedR, normalizedG, normalizedB);
  const h =
    n === 0
      ? 0
      : n && v === normalizedR
        ? (normalizedG - normalizedB) / n
        : v === normalizedG
          ? 2 + (normalizedB - normalizedR) / n
          : 4 + (normalizedR - normalizedG) / n;
  return [60 * (h < 0 ? h + 6 : h), v && (n / v) * 100, v * 100];
};

const hexToHsb = (hex: string) => {
  const rgb = hexToRgb(hex);
  const [r, g, b] = rgb
    .slice(rgb.startsWith("rgba") ? 5 : 4, -1)
    .split(",")
    .map((x) => Number.parseInt(x.trim()));
  return rgbToHsb(r, g, b);
};

const hsbToRgb = (hsb: number[]) => {
  const [h, s, b] = hsb;
  const updatedS = s / 100;
  const updatedB = b / 100;
  const k = (n: number) => (n + h / 60) % 6;
  const f = (n: number) =>
    updatedB * (1 - updatedS * Math.max(0, Math.min(k(n), 4 - k(n), 1)));
  return [255 * f(5), 255 * f(3), 255 * f(1)];
};

const rgbToHex = (rgb: number[]) => {
  const [r, g, b] = rgb;
  return ((r << 16) + (g << 8) + b).toString(16).padStart(6, "0");
};

const hsbToHex = (hsb: number[]) => {
  return `#${rgbToHex(hsbToRgb(hsb))}`;
};

const contrastRatio = (color1: string, color2: string) => {
  const [r1, g1, b1] = hexToRgb(color1)
    .slice(hexToRgb(color1).startsWith("rgba") ? 5 : 4, -1)
    .split(",")
    .map((x) => Number.parseInt(x.trim()));
  const [r2, g2, b2] = hexToRgb(color2)
    .slice(hexToRgb(color2).startsWith("rgba") ? 5 : 4, -1)
    .split(",")
    .map((x) => Number.parseInt(x.trim()));
  const l1 =
    0.2126 * (r1 / 255) ** 2.2 +
    0.7152 * (g1 / 255) ** 2.2 +
    0.0722 * (b1 / 255) ** 2.2;
  const l2 =
    0.2126 * (r2 / 255) ** 2.2 +
    0.7152 * (g2 / 255) ** 2.2 +
    0.0722 * (b2 / 255) ** 2.2;
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
};

export {
  contrastRatio,
  hexToHsb,
  hexToRgb,
  hsbToHex,
  hsbToRgb,
  rgbToHex,
  rgbToHsb,
};
