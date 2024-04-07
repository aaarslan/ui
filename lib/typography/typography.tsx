import type React from "react";
import { useTheme } from "../theme";

interface TypographyProps {
  vx: "heading" | "heading2" | "heading3" | "heading4" | "body" | "span";
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Typography: React.FC<TypographyProps> = ({
  vx,
  children,
  style,
  ...props
}: {
  vx: "heading" | "heading2" | "heading3" | "heading4" | "body" | "span";
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  const { theme } = useTheme();

  const fontFamilyVar = `--aa-${vx}-fontFamily`;
  const fontWeightVar = `--aa-${vx}-fontWeight`;
  const fontSizeVar = `--aa-${vx}-fontSize`;
  const lineHeightVar = `--aa-${vx}-lineHeight`;
  const colorVar = `--aa-${vx}-color`;

  const componentStyle: React.CSSProperties = {
    fontFamily: `var(${fontFamilyVar}, ${theme.typography[vx].fontFamily})`,
    fontWeight: `var(${fontWeightVar}, ${theme.typography[vx].fontWeight})`,
    fontSize: `var(${fontSizeVar}, ${theme.typography[vx].fontSize}px)`,
    lineHeight: `var(${lineHeightVar}, ${theme.typography[vx].lineHeight})`,
    color: `var(${colorVar}, ${theme.colors.textPrimary})`,
    ...style,
  };

  return (
    <div style={componentStyle} {...props}>
      {children}
    </div>
  );
};

export { Typography };
