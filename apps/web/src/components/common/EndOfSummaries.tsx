import React from 'react';
import Typography from '@mui/material/Typography';

const EndOfSummaries: React.FC = () => (
    <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary', fontWeight: 'bold' }}>
        You've seen it all!{' '}
        <span role="img" aria-label="sad">
            👀
        </span>
    </Typography>
);

export default EndOfSummaries;
