import { type FC, useState } from "react";
import styles from "./colorpalette.module.css";
import { hexToHsb, hsbToHex } from "./helpers";

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

const theme = {
  light: true,
};

const Colorpalette = () => {
  const [brand, setBrand] = useState("inherit");
  const background = theme.light ? "#ffffff" : "#1a1a1a";
  const [open, setOpen] = useState(false);
  const [hue, saturation, brightness] = hexToHsb(brand);
  const normalizedHue = Math.round(hue);
  const normalizedSaturation = Math.round(saturation);
  const normalizedBrightness = Math.round(brightness);

  return (
    <div className={styles.container}>
      <div className={styles.color}>
        <div className={styles.colorcontent}>
          <span className={styles.hex}>
            Theme: {theme.light ? "Light" : "Dark"}
          </span>
          <span className={styles.hex}>
            Hue: {!Number.isNaN(normalizedHue) ? normalizedHue : "0"}
          </span>
          <span className={styles.hex}>
            Saturation:{" "}
            {!Number.isNaN(normalizedSaturation) ? normalizedSaturation : "0"}
          </span>
          <span className={styles.hex}>
            Brightness:{" "}
            {!Number.isNaN(normalizedBrightness) ? normalizedBrightness : "0"}
          </span>
        </div>
      </div>
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
      <div className={styles.color}>
        <span className={styles.text}>Primary Text</span>
      </div>
      <div className={styles.color}>
        <span className={styles.text}>Secondary Text</span>
      </div>
      <div className={styles.color}>
        <span className={styles.text}>Primary Outline</span>
      </div>
      <div className={styles.color}>
        <span className={styles.text}>Secondary Outline</span>
      </div>
      <div className={styles.color}>
        <span className={styles.text}>Fill</span>
      </div>
      <div className={styles.color} style={{ backgroundColor: background }}>
        <span className={styles.text}>Background</span>
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
