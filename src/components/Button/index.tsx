import React, { type ElementType, type ReactNode } from "react";
import clsx from "clsx";
import { Btn } from "./styles";
import type { ButtonProps } from "@mui/material";

export interface ButtonPropsI extends ButtonProps {
  Icon?: ElementType;
  children: ReactNode;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
  size?: "small" | "medium" | "large";
}

const Button: React.FC<ButtonPropsI> = ({
  Icon,
  children,
  color = "primary",
  size,
  ...props
}) => {
  return (
    <Btn
      className={clsx(color, size)}
      startIcon={Icon && <Icon />}
      variant="contained"
      disableElevation
      {...props}
    >
      {children}
    </Btn>
  );
};

export default Button;
