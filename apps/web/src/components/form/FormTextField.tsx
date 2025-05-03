import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
import { FormTextFieldProps } from "./types";

const FormTextField: React.FC<FormTextFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const isError = Boolean(meta.touched && meta.error);

  return (
    <TextField
      {...field}
      {...props}
      error={isError}
      helperText={isError ? meta.error : props.helperText}
      slotProps={{
        formHelperText: {
          sx: {
            animation: isError ? "fadeIn 0.3s ease-in-out" : "none",
            "@keyframes fadeIn": {
              "0%": {
                opacity: 0,
                transform: "translateY(-5px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          },
        },
        ...props.slotProps,
      }}
    />
  );
};

export default FormTextField;
