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
  return [255 * f(5), 255 * f(3), 255 * f(1)].map(Math.round);
};

const rgbToHex = (rgb: number[]) => {
  const [r, g, b] = rgb.map((value) => Math.round(value));
  return `${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
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

const lightThemeSteps = {
  saturationSteps: [57, 27, 23, 30, 10],
  brightnessSteps: [24, 48, 65, 95, 100],
};

const darkThemeSteps = {
  saturationSteps: [55, 30, 25, 10, 2],
  brightnessSteps: [90, 75, 80, 95, 98],
};

function paletteGenerator(hue: number, background: string, isLight: boolean) {
  const saturationSteps = isLight
    ? lightThemeSteps.saturationSteps
    : darkThemeSteps.saturationSteps;
  const brightnessSteps = isLight
    ? lightThemeSteps.brightnessSteps
    : darkThemeSteps.brightnessSteps;
  const colors = saturationSteps.map((saturation, index) =>
    hsbToHex([hue, saturation, brightnessSteps[index]]).slice(0, 7),
  );

  for (let i = 0; i < colors.length; i++) {
    while (contrastRatio(colors[i], background) < 4.5) {
      saturationSteps[i] += 1;
      brightnessSteps[i] -= 1;
      colors[i] = hsbToHex([hue, saturationSteps[i], brightnessSteps[i]]).slice(
        0,
        7,
      );
      if (saturationSteps[i] > 100 || brightnessSteps[i] < 0) {
        break;
      }
    }
  }

  const accent = hsbToHex([hue, 30, 95]).slice(0, 7);
  const fill = hsbToHex([hue, 10, 100]).slice(0, 7);

  return {
    textPrimary: colors[0],
    textSecondary: colors[1],
    stroke: colors[2],
    accent,
    fill,
  };
}

export {
  contrastRatio,
  hexToHsb,
  hexToRgb,
  hsbToHex,
  hsbToRgb,
  paletteGenerator,
  rgbToHex,
  rgbToHsb,
};
