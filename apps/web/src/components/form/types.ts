import { SelectProps, TextFieldProps } from '@mui/material';
import { FilePondInitialFile } from 'filepond';
import { FormikHelpers } from 'formik';
import { FilePondProps } from 'react-filepond';
import { AnyObject, ObjectSchema } from 'yup';

export type FormTextFieldProps = TextFieldProps & {
    name: string;
    type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'search' | 'date' | 'time';
};

export type PasswordFieldProps = Omit<TextFieldProps, 'type'> & {
    name: string;
    type: 'password';
};

export type FileUploadFieldProps = Omit<FilePondProps, 'name'> & {
    name: string;
    type: 'file';
    label?: string;
    required?: boolean;
    acceptedFileTypes?: string[];
    maxFiles?: number;
    helperText?: string;
};

export type FormSelectFieldProps = SelectProps & {
    name: string;
    type: 'select';
    helperText?: string;
    options: {
        value: string;
        label: string;
    }[];
};

export type FormField = FormTextFieldProps | PasswordFieldProps | FileUploadFieldProps | FormSelectFieldProps;

export type FormProps = {
    initialValues: Record<string, string> & Record<string, unknown>;
    validation: ObjectSchema<AnyObject>;
    onSubmit: (
        values: Record<string, string>,
        formikHelpers: FormikHelpers<Record<string, string>>
    ) => void | Promise<unknown>;
    fields: FormField[];
};

export type Files = (string | FilePondInitialFile | Blob | File)[];
