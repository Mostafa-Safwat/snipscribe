import React, { useState } from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useField } from "formik";
import { PasswordFieldProps } from "./types";

const PasswordField: React.FC<PasswordFieldProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name);

  const [showPassword, setShowPassword] = useState(false);

  const isError = Boolean(meta.touched && meta.error);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      {...field}
      {...props}
      type={showPassword ? "text" : "password"}
      error={isError}
      helperText={isError ? meta.error : props.helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
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

export default PasswordField;
