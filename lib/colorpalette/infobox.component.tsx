import type { FC } from "react";
import styles from "./colorpalette.module.css";
import { contrastRatio } from "./helpers";

interface InfoBoxProps {
  theme: { light: boolean };
  setTheme: (theme: { light: boolean }) => void;
  normalizedHue: number;
  normalizedSaturation: number;
  normalizedBrightness: number;
  brand: string;
  fill: string;
}

const InfoBox: FC<InfoBoxProps> = ({
  theme,
  setTheme,
  normalizedHue,
  normalizedSaturation,
  normalizedBrightness,
  brand,
  fill,
}: InfoBoxProps) => {
  return (
    <button
      type="button"
      className={styles.infotheme}
      onClick={() => setTheme({ light: !theme.light })}
    >
      <div className={styles.colors}>
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
          <span className={styles.hex}>
            Contrast Ratio:{" "}
            {!Number.isNaN(contrastRatio(brand, fill))
              ? Math.fround(contrastRatio(brand, fill)).toFixed(1)
              : "0"}
          </span>
        </div>
      </div>
    </button>
  );
};

export { InfoBox };
