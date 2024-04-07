import { type FC, useState } from "react";
import styles from "./colorpalette.module.css";
import { contrastRatio, hexToHsb, hsbToHex } from "./helpers";
import { InfoBox } from "./infobox.component";
import { Palette } from "./palette.component";
import { SampleCard } from "./samplecard.component";

interface ColorpickerProps {
  color: string;
  setColor: (color: string) => void;
}

const Colorpicker: FC<ColorpickerProps> = ({
  color,
  setColor,
}: ColorpickerProps) => {
  return (
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
    />
  );
};

function paletteGenerator(hue: number, background: string) {
  const saturationSteps = [57, 27, 23, 30, 10];
  const brightnessSteps = [24, 48, 65, 95, 100];
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

  const secondaryOutline = hsbToHex([hue, 30, 95]).slice(0, 7);
  const fill = hsbToHex([hue, 10, 100]).slice(0, 7);

  return {
    primaryText: colors[0],
    secondaryText: colors[1],
    primaryOutline: colors[2],
    secondaryOutline,
    fill,
  };
}

function paletteGeneratorDark(hue: number, background: string) {
  const saturationSteps = [55, 30, 25, 10, 2];
  const brightnessSteps = [90, 75, 80, 95, 98];
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

  const secondaryOutline = hsbToHex([hue, 30, 95]).slice(0, 7);
  const fill = hsbToHex([hue, 10, 100]).slice(0, 7);

  return {
    primaryText: colors[0],
    secondaryText: colors[1],
    primaryOutline: colors[2],
    secondaryOutline,
    fill,
  };
}

const Colorpalette = () => {
  const [theme, setTheme] = useState({ light: true });
  const [brand, setBrand] = useState("#8839ef");
  const background = theme.light ? "#eff1f5" : "#1e1e2e";
  const [open, setOpen] = useState(false);
  const [hue, saturation, brightness] = hexToHsb(brand);
  const normalizedHue = Math.round(hue);
  const normalizedSaturation = Math.round(saturation);
  const normalizedBrightness = Math.round(brightness);
  const { primaryText, secondaryText, primaryOutline, secondaryOutline, fill } =
    theme.light
      ? paletteGenerator(normalizedHue, background)
      : paletteGeneratorDark(normalizedHue, background);

  return (
    <div className={styles.container}>
      <InfoBox
        {...{
          theme,
          setTheme,
          normalizedHue,
          normalizedSaturation,
          normalizedBrightness,
          brand,
          fill,
        }}
      />
      <div>
        {contrastRatio(brand, fill) > 3 ? (
          <span className={styles.contrast}>✅</span>
        ) : (
          <span className={styles.contrast}>❌</span>
        )}
        <div
          className={styles.color}
          style={{ backgroundColor: `${hsbToHex(hexToHsb(brand))}` }}
          onClick={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && setOpen(true)}
          tabIndex={0}
          role="button"
          aria-label="Select brand color"
        >
          <span className={styles.text}>Brand</span>
        </div>
      </div>
      <Palette
        {...{
          primaryText,
          secondaryText,
          primaryOutline,
          secondaryOutline,
          fill,
          background,
        }}
      />
      <div
        style={{
          marginTop: "16px",
        }}
      >
        <SampleCard
          {...{
            brand,
            primaryText,
            secondaryText,
            primaryOutline,
            secondaryOutline,
            fill,
            background,
          }}
        />
      </div>
      <dialog open={open} className={styles.dialog}>
        <div className={styles.content}>
          <Colorpicker color={hsbToHex(hexToHsb(brand))} setColor={setBrand} />
          <button type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
      </dialog>
    </div>
  );
};

export { Colorpalette };
