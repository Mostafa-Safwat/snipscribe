import React from 'react';
import { MenuItem, Select } from '@mui/material';
import { useField } from 'formik';
import { FormSelectFieldProps } from './types';

const FormSelectField: React.FC<FormSelectFieldProps> = ({ name, ...props }) => {
    const [field, meta] = useField(name);

    const isError = Boolean(meta.touched && meta.error);

    return (
        <Select
            {...field}
            {...props}
            error={isError}
            inputProps={{
                helperText: isError ? meta.error : props.helperText,
                formHelperText: {
                    sx: {
                        animation: isError ? 'fadeIn 0.3s ease-in-out' : 'none',
                        '@keyframes fadeIn': {
                            '0%': {
                                opacity: 0,
                                transform: 'translateY(-5px)',
                            },
                            '100%': {
                                opacity: 1,
                                transform: 'translateY(0)',
                            },
                        },
                    },
                },
                ...props.inputProps,
            }}
        >
            {props.options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>
    );
};

export default FormSelectField;
