import { FormProps } from "../form/types";

export type CrudModalProps = {
  formProps: FormProps;
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
};
