import React from "react";
import Grid from "@mui/material/Grid";
import {
  type FieldValues,
  type UseFormReturn,
  FormProvider,
} from "react-hook-form";
import clsx from "clsx";

interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit(data: T): void;
  children: React.ReactNode;
  className?: string;
  gridMargin?: boolean;
  gridSpacing?: number;
  inline?: boolean;
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  className = "",
  gridMargin = false,
  gridSpacing = 3,
  inline = false,
}: FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form
        className={clsx(
          `flex ${inline ? "flex-row items-center" : "flex-col items-center"}`,
          className
        )}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Grid
          container
          spacing={gridSpacing}
          sx={{ width: "100%", margin: gridMargin ? "0 auto" : undefined }}
          alignItems="flex-start"
        >
          {children}
        </Grid>
      </form>
    </FormProvider>
  );
};

export default Form;
