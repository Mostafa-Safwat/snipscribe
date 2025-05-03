import * as React from "react";
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Form from "../form/Form";
import { CrudModalProps } from "./types";

const CrudModal: React.FC<CrudModalProps> = ({
  formProps,
  open,
  setOpen,
  title,
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Form
          fields={formProps.fields}
          validation={formProps.validation}
          onSubmit={formProps.onSubmit}
          initialValues={formProps.initialValues}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CrudModal;
