import React from 'react';
import { Typography, Box } from '@mui/material';
import Form from '@/components/form/Form';
import { summaryRequestCreateFields } from './types';
import { FormikHelpers } from 'formik';
import { useNavigate } from 'react-router-dom';
import SummaryAnimation from '@/components/animations/SummaryAnimation';
import { toast } from 'react-toastify';

const NewSummaryRequest: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Create a New Summary Request
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box sx={{ width: '30%', height: '30%' }}>
                    <SummaryAnimation />
                </Box>
            </Box>
            <Form
                fields={summaryRequestCreateFields.fields}
                validation={summaryRequestCreateFields.validation}
                onSubmit={async (
                    values: Record<string, string>,
                    formikHelpers: FormikHelpers<Record<string, string>>
                ) => {
                    await summaryRequestCreateFields.onSubmit(values, formikHelpers);
                    toast.success("You'll receive an email once your summary is ready");
                    navigate('/home');
                }}
                initialValues={summaryRequestCreateFields.initialValues}
            />
        </Box>
    );
};

export default NewSummaryRequest;
