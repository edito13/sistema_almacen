import React from "react";
import Button from "@/components/Button";
import type { ButtonPropsI } from "@/components/Button";
import { LoadingIcon } from "@/components/Loading/style";

interface ButtonSubmitProps extends ButtonPropsI {
  textSubmit?: string;
  isSubmitting?: boolean;
}

const ButtonSubmit: React.FC<ButtonSubmitProps> = ({
  children,
  textSubmit,
  isSubmitting,
  ...props
}) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      startIcon={isSubmitting ? <LoadingIcon size={22} /> : props.startIcon}
      {...props}
    >
      {isSubmitting ? textSubmit || "Validando..." : children}
    </Button>
  );
};

export default ButtonSubmit;
