import type React from "react";
import { useState } from "react";
import { type ThemeTokens, useTheme } from "../theme";

interface ButtonProps extends React.ComponentProps<"button"> {
  vx?: "primary" | "secondary" | "tertiary";
  rd?: "sm" | "md" | "lg";
}

const useButtonStyles = (
  vx: "primary" | "secondary" | "tertiary",
  rd: "sm" | "md" | "lg",
  theme: ThemeTokens,
  disabled: boolean | undefined,
  isHovered: boolean,
  isFocused: boolean,
) => {
  const borderRadiusValue = theme.borderRadius[rd];
  const variantStyles = {
    primary: {
      color: "var(--aa-color-white)",
      backgroundColor:
        isHovered && !disabled
          ? "var(--aa-color-textSecondary)"
          : "var(--aa-color-brand)",
      border: "1px solid var(--aa-color-brand)",
    },
    secondary: {
      color: "var(--aa-color-textPrimary)",
      backgroundColor:
        isHovered && !disabled
          ? "var(--aa-color-accent)"
          : "var(--aa-color-fill)",
      border: "1px solid var(--aa-color-accent)",
    },
    tertiary: {
      color: "var(--aa-color-textSecondary)",
      backgroundColor:
        isHovered && !disabled
          ? "var(--aa-color-fill)"
          : "var(--aa-color-background)",
      border: "1px solid var(--aa-color-brand)",
    },
  };

  const baseStyle = variantStyles[vx] || variantStyles.primary;

  return {
    ...baseStyle,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: borderRadiusValue,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    boxShadow: isFocused ? "0 0 0 2px var(--aa-color-brand)" : "none",
    transition: "all 0.3s ease",
    fontSize: "var(--aa-span-fontSize)",
    fontWeight: "600",
  };
};

const useInteractionStates = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  return { isHovered, setIsHovered, isFocused, setIsFocused };
};

/**
 * Returns a new instance of a button based on the variant (vx) and border radius (rd) passed.
 * @param vx - The variant of the button ("primary", "secondary", or "tertiary").
 * @param rd - The size of the button ("sm", "md", or "lg").
 * @param disabled - Whether the button is disabled or not.
 * @returns A new instance of a button.
 */
const Button: React.FC<ButtonProps> = ({
  vx = "primary",
  rd = "sm",
  children,
  disabled,
  style,
  ...props
}) => {
  const { theme } = useTheme();
  const { isHovered, setIsHovered, isFocused, setIsFocused } =
    useInteractionStates();
  const dynamicStyles = useButtonStyles(
    vx,
    rd,
    theme,
    disabled,
    isHovered,
    isFocused,
  );

  return (
    <button
      style={dynamicStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
