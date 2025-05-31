import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { summaryService } from '@/services/summary.service';
import Summary from '@/components/summary/Summary';

const SummaryOverview: React.FC = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>();
    const [videoUrl, setVideoUrl] = useState<string>();
    const [summaryText, setSummaryText] = useState<string>();
    const [language, setLanguage] = useState<string>();
    const [isShared, setIsShared] = useState<boolean>(false);

    const { summaryId } = useParams();

    const fetchSummary = async () => {
        const { getSummary } = summaryService();

        if (summaryId) {
            const summary = await getSummary({ summaryId: Number(summaryId) });
            if (summary) {
                setTitle(summary.title);
                setVideoUrl(summary.video?.url);
                setSummaryText(summary.body);
                setIsShared(summary.isShared);
                setLanguage(summary.summaryRequest?.language);
            } else {
                navigate('/404');
            }
        } else {
            navigate('/404');
        }
    };

    useEffect(() => {
        fetchSummary();
    }, [summaryId]);

    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                Summary Overview
            </Typography>
            <Summary
                id={Number(summaryId)}
                title={title || ''}
                videoUrl={videoUrl || ''}
                summaryText={summaryText || ''}
                language={language || ''}
                isShared={isShared}
            />
        </Box>
    );
};

export default SummaryOverview;
