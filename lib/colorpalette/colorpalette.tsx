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

function paletteGenerator(hue: number) {
  const primaryText = hsbToHex([hue, 57, 24]).slice(0, 7);
  const secondaryText = hsbToHex([hue, 27, 48]).slice(0, 7);
  const primaryOutline = hsbToHex([hue, 23, 65]).slice(0, 7);
  const secondaryOutline = hsbToHex([hue, 5, 94]).slice(0, 7);
  const fill = hsbToHex([hue, 2, 98]).slice(0, 7);
  return { primaryText, secondaryText, primaryOutline, secondaryOutline, fill };
}

function paletteGeneratorDark(hue: number) {
  const primaryText = hsbToHex([hue, 57, 90]).slice(0, 7);
  const secondaryText = hsbToHex([hue, 27, 75]).slice(0, 7);
  const primaryOutline = hsbToHex([hue, 23, 80]).slice(0, 7);
  const secondaryOutline = hsbToHex([hue, 5, 94]).slice(0, 7);
  const fill = hsbToHex([hue, 2, 98]).slice(0, 7);

  return { primaryText, secondaryText, primaryOutline, secondaryOutline, fill };
}

const Colorpalette = () => {
  const [theme, setTheme] = useState({ light: true });
  const [brand, setBrand] = useState("inherit");
  const background = theme.light ? "#ffffff" : "#1a1a1a";
  const [open, setOpen] = useState(false);
  const [hue, saturation, brightness] = hexToHsb(brand);
  const normalizedHue = Math.round(hue);
  const normalizedSaturation = Math.round(saturation);
  const normalizedBrightness = Math.round(brightness);
  const { primaryText, secondaryText, primaryOutline, secondaryOutline, fill } =
    theme.light
      ? paletteGenerator(normalizedHue)
      : paletteGeneratorDark(normalizedHue);

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
        {contrastRatio(brand, fill) > 4.5 ? (
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
