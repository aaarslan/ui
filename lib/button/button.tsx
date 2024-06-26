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
  isPressed: boolean,
) => {
  const borderRadiusValue = theme.borderRadius[rd];
  const variantStyles = {
    primary: {
      color: theme.colors.textPrimary,
      backgroundColor: isPressed
        ? theme.colors.brandStrokeStrong
        : isHovered && !disabled
          ? theme.colors.brandStrokeWeak
          : disabled
            ? theme.colors.accent
            : theme.colors.brand,
      border: `1px solid ${theme.colors.brand}`,
      opacity: disabled ? "0.5" : "1",
    },
    secondary: {
      color: theme.colors.brand,
      backgroundColor: isPressed
        ? theme.colors.stroke
        : isHovered && !disabled
          ? theme.colors.accent
          : theme.colors.background,
      border: `1px solid ${theme.colors.brand}`,
      opacity: disabled ? "0.5" : "1",
    },
    tertiary: {
      color: theme.colors.textSecondary,
      textDecoration: isPressed
        ? "wavy underline"
        : isHovered && !disabled
          ? "none"
          : "underline",
      backgroundColor: "transparent",
      border: "none",
      opacity: disabled ? "0.5" : "1",
    },
  };

  const baseStyle = variantStyles[vx] || variantStyles.primary;

  return {
    ...baseStyle,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: borderRadiusValue,
    cursor: disabled ? "not-allowed" : "pointer",
    boxShadow: isFocused ? `0 0 0 2px ${theme.colors.brand}` : "none",
    transition: "all 0.3s ease",
    fontSize: theme.typography.body.fontSize,
    fontWeight: theme.typography.heading4.fontWeight,
  };
};

const useInteractionStates = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  return {
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
    isPressed,
    setIsPressed,
  };
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
  const {
    isHovered,
    setIsHovered,
    isFocused,
    setIsFocused,
    isPressed,
    setIsPressed,
  } = useInteractionStates();
  const dynamicStyles = useButtonStyles(
    vx,
    rd,
    theme,
    disabled,
    isHovered,
    isFocused,
    isPressed,
  );

  return (
    <button
      style={dynamicStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
