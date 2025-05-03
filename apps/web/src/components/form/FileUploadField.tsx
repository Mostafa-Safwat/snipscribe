import React, { useEffect, useState, useRef } from "react";
import "filepond/dist/filepond.min.css";
import { FilePond } from "react-filepond";
import { FilePondFile } from "filepond";
import { useField } from "formik";
import { Box, FormHelperText, Typography, useTheme } from "@mui/material";
import { Files, FileUploadFieldProps } from "./types";

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  name,
  label,
  required = false,
  acceptedFileTypes = [],
  maxFiles = 1,
  helperText,
  ...props
}) => {
  const theme = useTheme();
  const [, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const [files, setFiles] = useState<Files>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  const isError = Boolean(meta.touched && meta.error);

  useEffect(() => {
    if (files.length > 0) {
      setValue(files);
    } else {
      setValue([]);
    }
    setTouched(true);
  }, [files, setValue, setTouched]);

  const handleUpdateFiles = (fileItems: FilePondFile[]) => {
    const mappedFiles = fileItems.map((fileItem) => {
      const file = fileItem.file;
      return file;
    });
    setFiles(mappedFiles);
  };

  return (
    <Box sx={{ width: "100%", mb: 2, position: "relative" }}>
      <Box
        ref={boxRef}
        tabIndex={0}
        sx={{
          ".filepond--panel-root": {
            backgroundColor: "transparent",
            borderRadius: theme.shape.borderRadius,
          },
          ".filepond--drop-label": {
            color: theme.palette.text.primary,
          },
          ".filepond--item-panel": {
            backgroundColor: theme.palette.primary.main,
            borderRadius: theme.shape.borderRadius,
          },
          ".filepond--file-info": {
            color: theme.palette.primary.contrastText,
          },
          ".filepond--file-status": {
            color: theme.palette.primary.contrastText,
          },
          ".filepond--file": {
            color: theme.palette.primary.contrastText,
          },
          ".filepond--file-info-main": {
            color: theme.palette.primary.contrastText,
            fontWeight: 500,
          },
          ".filepond--file-info-sub": {
            color: `${theme.palette.primary.contrastText}99`,
          },
          borderTopLeftRadius: theme.shape.borderRadius,
          borderTopRightRadius: theme.shape.borderRadius,
          backgroundColor: theme.palette.action.hover,
          cursor: files.length ? "default" : "pointer",
          transition: theme.transitions.create([
            "background-color",
            "box-shadow",
          ]),
          "&:hover": {
            backgroundColor: theme.palette.action.selected,
          },
          "&::before": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
              isError ? theme.palette.error.main : theme.palette.divider
            }`,
            transition: theme.transitions.create("border-bottom-color", {
              duration: theme.transitions.duration.shorter,
              easing: theme.transitions.easing.easeIn,
            }),
            pointerEvents: "none",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            borderBottom: `1px solid ${
              isError ? theme.palette.error.main : theme.palette.primary.main
            }`,
            transform: "scaleX(0)",
            transformOrigin: "center",
            transition: theme.transitions.create(
              ["transform", "border-bottom-color"],
              {
                duration: theme.transitions.duration.standard,
                easing: theme.transitions.easing.easeOut,
              }
            ),
            pointerEvents: "none",
          },
          "&:hover::before": {
            borderBottom: `1px solid ${
              isError ? theme.palette.error.main : theme.palette.text.primary
            }`,
          },
          // Remove default focus outline and use our custom focus styling
          outline: "none",
        }}
      >
        {label && (
          <Box
            sx={{
              p: files.length ? theme.spacing(1.75) : 0,
            }}
          >
            <Typography
              variant="body2"
              sx={{
                position: "absolute",
                top: 10,
                left: theme.spacing(1.75),
                transform: "translateY(0) scale(0.75)",
                transformOrigin: "left top",
                mb: 1,
                color: isError
                  ? theme.palette.error.main
                  : theme.palette.text.secondary,
                fontFamily: theme.typography.fontFamily,
                fontSize: theme.typography.body1.fontSize,
                lineHeight: 1.4375,
                letterSpacing: "0.00938em",
                fontWeight: 400,
                zIndex: 1,
                pointerEvents: "none",
              }}
            >
              {label}
              {required && " *"}
            </Typography>
          </Box>
        )}
        <FilePond
          files={files}
          onupdatefiles={handleUpdateFiles}
          allowMultiple={maxFiles > 1}
          name={name}
          required={required}
          maxFiles={maxFiles}
          acceptedFileTypes={acceptedFileTypes}
          labelIdle='<span style="cursor: pointer;">Drop files here or click to browse</span>'
          credits={false}
          // Ensure FilePond doesn't interfere with our focus handling
          onactivatefile={() => {
            if (boxRef.current) {
              boxRef.current.focus();
            }
          }}
          {...props}
        />
      </Box>

      {(isError || helperText) && (
        <FormHelperText
          error={isError}
          sx={{
            ml: 1.75, // Match FilledInput margin
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
          }}
        >
          {isError ? meta.error : helperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FileUploadField;
