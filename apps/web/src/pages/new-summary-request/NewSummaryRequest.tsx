import React from 'react';
import { Typography, Box } from '@mui/material';
import Form from '@/components/form/Form';
import { summaryRequestCreateFields } from './types';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';

const NewSummaryRequest: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Create a New Summary Request
            </Typography>
            <Form
                fields={summaryRequestCreateFields.fields}
                validation={summaryRequestCreateFields.validation}
                onSubmit={async (
                    values: Record<string, string>,
                    formikHelpers: FormikHelpers<Record<string, string>>
                ) => {
                    await summaryRequestCreateFields.onSubmit(values, formikHelpers);
                    navigate('/home');
                }}
                initialValues={summaryRequestCreateFields.initialValues}
            />
        </Box>
    );
};

export default NewSummaryRequest;
