import React, { useEffect, useState } from 'react';
import { Switch, Box, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';
import { FormToggleFieldProps } from './types';

const FormToggleField: React.FC<FormToggleFieldProps> = ({ name, label, helperText, sx }) => {
    const [field, meta, helpers] = useField({ name, type: 'checkbox' });
    const { submitCount } = useFormikContext<any>();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setIsError(Boolean((meta.touched || submitCount > 0) && meta.error));
    }, [meta, submitCount]);

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={sx ? sx : { width: '100%', mb: 1 }}>
            <Typography
                variant="body1"
                color={isError ? 'error' : 'text.primary'}
                sx={{ mr: 2, cursor: 'default', userSelect: 'none' }}
                onClick={() => helpers.setValue(!field.value)}
            >
                {label}
            </Typography>
            <Switch
                checked={Boolean(field.value)}
                onChange={e => helpers.setValue(e.target.checked)}
                onBlur={field.onBlur}
                name={field.name}
            />
            {helperText && (
                <Typography variant="caption" color={isError ? 'error' : 'text.secondary'} sx={{ ml: 2 }}>
                    {isError ? meta.error : helperText}
                </Typography>
            )}
        </Box>
    );
};

export default FormToggleField;
