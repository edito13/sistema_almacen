import React from "react";
import { Grid, type GridSize } from "@mui/material";
import {
  useFormContext,
  type FieldPath,
  type FieldValues,
  type UseFormReturn,
} from "react-hook-form";

import Select from "./Select";
import InputBase from "./InputBase";

interface Option {
  value: string | number;
  label: string;
}

interface BaseProps<T extends FieldValues = FieldValues> {
  name: FieldPath<T>;
  label: string;
  type?: string;
  size?: GridSize;
  required?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  control: UseFormReturn<T>["control"];
}

interface InputFieldProps<T extends FieldValues = FieldValues>
  extends BaseProps<T> {
  select?: false;
}

interface SelectFieldProps<T extends FieldValues = FieldValues>
  extends BaseProps<T> {
  select: true;
  options: Option[];
}

type InputProps<T extends FieldValues = FieldValues> =
  | InputFieldProps<T>
  | SelectFieldProps<T>;

const Input: React.FC<InputProps> = <T extends FieldValues = FieldValues>({
  label,
  required,
  select = false,
  ...props
}: InputProps<T>) => {
  const { name, size, icon, placeholder } = props;
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const registerProps = register(name, {
    setValueAs:
      (props as InputFieldProps<T>).type === "number"
        ? (value) => Number(value)
        : (value) => value,
  });

  const error = errors[name]?.message as string | undefined;

  return (
    <Grid size={size}>
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {select ? (
          <Select
            name={name}
            icon={icon}
            error={error}
            register={registerProps}
            placeholder={placeholder}
            options={(props as SelectFieldProps<T>).options}
          />
        ) : (
          <InputBase
            name={name}
            icon={icon}
            error={error}
            register={registerProps}
            placeholder={placeholder || ""}
            type={(props as InputFieldProps<T>).type || "text"}
          />
        )}
      </div>
    </Grid>
  );
};

export default Input;
