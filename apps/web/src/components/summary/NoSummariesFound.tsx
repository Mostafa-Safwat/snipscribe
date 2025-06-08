import React from 'react';
import NotFoundAnimation from '../animations/NotFoundAnimation';

const NoSummariesFound: React.FC = () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <NotFoundAnimation />
        <p style={{ marginTop: 24, fontSize: 18, textAlign: 'center' }}>
            Whoops! Looks like there are no summaries here yet...{' '}
            <span role="img" aria-label="sad">
                😢
            </span>
        </p>
    </div>
);

export default NoSummariesFound;
