import type { FC } from "react";
import styles from "./colorpalette.module.css";
import { contrastRatio } from "./helpers";

interface PaletteProps {
  primaryText: string;
  secondaryText: string;
  primaryOutline: string;
  secondaryOutline: string;
  fill: string;
  background: string;
}

const Palette: FC<PaletteProps> = ({
  primaryText,
  secondaryText,
  primaryOutline,
  secondaryOutline,
  fill,
  background,
}: PaletteProps) => {
  return (
    <>
      <div>
        {contrastRatio(primaryText, background) > 4.5 ? (
          <span className={styles.contrast}>✅</span>
        ) : (
          <span className={styles.contrast}>❌</span>
        )}
        <div className={styles.colors} style={{ backgroundColor: primaryText }}>
          <span className={styles.text}>Primary Text</span>
        </div>
      </div>
      <div>
        {contrastRatio(secondaryText, background) > 4.5 ? (
          <span className={styles.contrast}>✅</span>
        ) : (
          <span className={styles.contrast}>❌</span>
        )}
        <div
          className={styles.colors}
          style={{ backgroundColor: secondaryText }}
        >
          <span className={styles.text}>Secondary Text</span>
        </div>
      </div>
      <div>
        {contrastRatio(primaryOutline, background) > 3 ? (
          <span className={styles.contrast}>✅</span>
        ) : (
          <span className={styles.contrast}>❌</span>
        )}
        <div
          className={styles.colors}
          style={{ backgroundColor: primaryOutline }}
        >
          <span className={styles.text}>Primary Outline</span>
        </div>
      </div>
      <div
        className={styles.colors}
        style={{ backgroundColor: secondaryOutline }}
      >
        <span className={styles.text}>Secondary Outline</span>
      </div>
      <div className={styles.colors} style={{ backgroundColor: fill }}>
        <span className={styles.text}>Fill</span>
      </div>
      <div className={styles.colors} style={{ backgroundColor: background }}>
        <span className={styles.text}>Background</span>
      </div>
    </>
  );
};

export { Palette };
