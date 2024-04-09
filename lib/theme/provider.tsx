import type React from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { hexToHsb, paletteGenerator } from "./utils";

interface Typography {
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: string;
  color: string;
}

// TODO: Refactor colors tokens and expand to include all colors and variants
export interface ThemeTokens {
  colors: {
    brand: string;
    background: string;
    textPrimary: string;
    textSecondary: string;
    stroke: string;
    accent: string;
    fill: string;
    error: string;
    warning: string;
    success: string;
    white: string;
    black: string;
    raised: string;
    overlay: string;
    fg500: string;
    fg400: string;
    fg300: string;
    fg200: string;
    fg100: string;
  };
  typography: {
    heading: Typography;
    heading2: Typography;
    heading3: Typography;
    heading4: Typography;
    body: Typography;
    span: Typography;
  };
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  breakpoints: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  borderRadius: {
    sm: number;
    md: number;
    lg: number;
  };
  shadows: {
    raised: string;
    overlay: string;
  };
}

interface ThemeContextType {
  theme: ThemeTokens;
  isLight: boolean;
  setBrand: React.Dispatch<React.SetStateAction<string>>;
  setIsLight: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  customTokens?: Partial<ThemeTokens>;
  hex?: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

const lightThemeTokens: ThemeTokens = {
  colors: {
    brand: "#8839ef",
    background: "#eff1f5",
    textPrimary: "#291a3d",
    textSecondary: "#68597a",
    stroke: "#7e6b96",
    accent: "#c9aaf2",
    fill: "#f1e6ff",
    error: "#c73a3a",
    warning: "#e0a929",
    success: "#379478",
    white: "#ffffff",
    black: "#1a1a1a",
    raised: "#ffffff",
    overlay: "#000000",
    fg500: "rgba(0, 0, 0, 0.9)",
    fg400: "rgba(0, 0, 0, 0.6)",
    fg300: "rgba(0, 0, 0, 0.45)",
    fg200: "rgba(0, 0, 0, 0.1)",
    fg100: "rgba(0, 0, 0, 0.04)",
  },
  typography: {
    heading: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "48px",
      color: "var(--aa-color-textPrimary)",
    },
    heading2: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "40px",
      color: "var(--aa-color-textPrimary)",
    },
    heading3: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "32px",
      color: "var(--aa-color-textPrimary)",
    },
    heading4: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "28px",
      color: "var(--aa-color-textPrimary)",
    },
    body: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--aa-color-black)",
    },
    span: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--aa-color-secondaryText)",
    },
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 32,
  },
  shadows: {
    raised: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overlay: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

const darkThemeTokens: ThemeTokens = {
  colors: {
    brand: "#8839ef",
    background: "#1e1e2e",
    textPrimary: "#9e67e6",
    textSecondary: "#9f86bf",
    stroke: "#af99cc",
    accent: "#c9aaf2",
    fill: "#f1e6ff",
    error: "#c73a3a",
    warning: "#e0a929",
    success: "#379478",
    white: "#ffffff",
    black: "#1a1a1a",
    raised: "#ffffff",
    overlay: "#000000",
    fg500: "rgba(255, 255, 255, 1)",
    fg400: "rgba(255, 255, 255, 0.78)",
    fg300: "rgba(255, 255, 255, 0.60)",
    fg200: "rgba(255, 255, 255, 0.12)",
    fg100: "rgba(255, 255, 255, 0.06)",
  },
  typography: {
    heading: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 40,
      lineHeight: "48px",
      color: "var(--aa-color-textPrimary)",
    },
    heading2: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 32,
      lineHeight: "40px",
      color: "var(--aa-color-textPrimary)",
    },
    heading3: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 24,
      lineHeight: "32px",
      color: "var(--aa-color-textPrimary)",
    },
    heading4: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 600,
      fontSize: 20,
      lineHeight: "28px",
      color: "var(--aa-color-textPrimary)",
    },
    body: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 400,
      fontSize: 16,
      lineHeight: "24px",
      color: "var(--aa-color-white)",
    },
    span: {
      fontFamily: "system-ui, sans-serif",
      fontWeight: 400,
      fontSize: 14,
      lineHeight: "20px",
      color: "var(--aa-color-secondaryText)",
    },
  },
  spacing: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    xxl: 48,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
  borderRadius: {
    sm: 8,
    md: 16,
    lg: 32,
  },
  shadows: {
    raised: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    overlay: "0px 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  customTokens = {},
  hex = "#8839ef",
}) => {
  const [brand, setBrand] = useState(hex);
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    setBrand(hex);
    lightThemeTokens.colors.brand = hex;
    darkThemeTokens.colors.brand = hex;
  }, [hex]);

  const theme = useMemo(() => {
    const baseTheme = isLight ? lightThemeTokens : darkThemeTokens;
    const mergedTheme = { ...baseTheme, ...customTokens };
    const dynamicPalette = paletteGenerator(hexToHsb(brand)[0], isLight);

    const extendedTheme = {
      ...mergedTheme,
      colors: {
        ...mergedTheme.colors,
        ...dynamicPalette,
      },
      shadows: {
        raised: `0px 2px 4px ${dynamicPalette.raised}`,
        overlay: `0px 4px 16px ${dynamicPalette.overlay}`,
      },
      isLight,
    };

    return extendedTheme;
  }, [brand, isLight, customTokens]);

  useEffect(() => {
    const root = document.documentElement;

    const setCSSVariable = (varName: string, value: string | number) => {
      root.style.setProperty(`--aa-${varName}`, value.toString());
    };

    for (const [key, value] of Object.entries(theme.colors)) {
      setCSSVariable(`color-${key}`, value);
    }

    for (const [
      key,
      { fontSize, fontFamily, fontWeight, lineHeight, color },
    ] of Object.entries(theme.typography)) {
      const viewportWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const minFontSize = fontSize * 0.875;
      const maxFontSize = fontSize * 1.125;
      const responsiveFontSize = `clamp(${minFontSize}px, ${
        fontSize + viewportWidth / 100
      }vw, ${maxFontSize}px)`;
      setCSSVariable(`${key}-fontFamily`, fontFamily);
      setCSSVariable(`${key}-fontWeight`, fontWeight);
      setCSSVariable(`${key}-fontSize`, responsiveFontSize);
      setCSSVariable(`${key}-lineHeight`, lineHeight);
      setCSSVariable(`${key}-color`, color);
    }

    for (const [key, value] of Object.entries(theme.spacing)) {
      setCSSVariable(`spacing-${key}`, value);
    }

    for (const [key, value] of Object.entries(theme.breakpoints)) {
      setCSSVariable(`breakpoint-${key}`, value);
    }

    for (const [key, value] of Object.entries(theme.borderRadius)) {
      setCSSVariable(`border-radius-${key}`, value);
    }

    for (const [key, value] of Object.entries(theme.shadows)) {
      setCSSVariable(`shadow-${key}`, value);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setBrand, setIsLight, isLight }}>
      {children}
    </ThemeContext.Provider>
  );
};
