import React, { useState, useEffect } from 'react';
import { Box, Switch, Typography } from '@mui/material';
import { summaryService } from '@/services/summary.service';
import { ShareToggleProps } from './types';
import { toast } from 'react-toastify';

const SummaryShareToggle: React.FC<ShareToggleProps> = ({ sx, id, isShared }) => {
    const [shared, setShared] = useState(isShared);
    const [submitting, setSubmitting] = useState(false);

    // Sync `shared` state with `isShared` prop whenever `isShared` changes
    useEffect(() => {
        setShared(isShared);
    }, [isShared]);

    const handleToggleShare = async () => {
        if (submitting) return;

        const { updateSummarySharedStatus } = summaryService();

        setSubmitting(true);

        await updateSummarySharedStatus({ summaryId: id, updateSummaryDto: { isShared: !shared } });

        setShared(!shared);
        setSubmitting(false);

        toast.success(`Summary is now ${!shared ? 'public' : 'private'}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                ...sx,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: shared ? 'primary.main' : 'text.secondary' }}>
                    {shared ? 'Public' : 'Private'}
                </Typography>
            </Box>

            <Switch checked={shared} onChange={handleToggleShare} disabled={submitting} color="primary" />
        </Box>
    );
};

export default SummaryShareToggle;
