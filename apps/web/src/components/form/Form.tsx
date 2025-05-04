import React from 'react';
import { Box, Button } from '@mui/material';
import { Formik } from 'formik';
import { FormProps } from './types';
import { Form as FormikForm } from 'formik';
import FormTextField from './FormTextField';
import PasswordField from './PasswordField';
import FileUploadField from './FileUploadField';
import FormSelectField from './FormSelectField';

const Form: React.FC<FormProps> = ({ initialValues, validation, onSubmit, fields }) => {
    return (
        <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
            {({ isSubmitting }) => (
                <FormikForm>
                    {fields.map(field => {
                        if (field.type === 'file') {
                            return (
                                <Box key={field.name} sx={{ mt: 2 }}>
                                    <FileUploadField {...field} />
                                </Box>
                            );
                        } else if (field.type === 'password') {
                            return (
                                <PasswordField
                                    key={field.name}
                                    margin="normal"
                                    fullWidth
                                    autoComplete={field.name}
                                    variant="filled"
                                    {...field}
                                />
                            );
                        } else if (field.type === 'select') {
                            return (
                                <FormSelectField
                                    key={field.name}
                                    fullWidth
                                    autoComplete={field.name}
                                    variant="filled"
                                    {...field}
                                />
                            );
                        }
                        return <FormTextField key={field.name} margin="normal" fullWidth variant="filled" {...field} />;
                    })}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            width: '100%',
                        }}
                    >
                        <Button type="submit" disabled={isSubmitting} variant="contained" sx={{ mt: 2, mb: 2 }}>
                            Submit
                        </Button>
                    </Box>
                </FormikForm>
            )}
        </Formik>
    );
};

export default Form;
