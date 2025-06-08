import React, { useState } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Button,
    Box,
    Container,
    Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

type Question = {
    question: string;
    answer: string;
};

const questions: Question[] = [
    {
        question: 'What does SnipScribe do?',
        answer: 'SnipScribe uses advanced AI algorithms to analyze and summarize long-form video content into concise, easy-to-read summaries. This allows users to quickly grasp the key points and insights from lectures, tutorials, webinars, and more—saving hours of manual note-taking and review.',
    },
    {
        question: 'How is SnipScribe different from other tools?',
        answer: 'Unlike many other summarization tools, SnipScribe offers robust Arabic language support. It also provides highly accurate, context-aware summaries, making it suitable for students, professionals, and researchers alike.',
    },
    {
        question: 'What languages does SnipScribe support?',
        answer: 'Currently, SnipScribe supports English and Arabic, with plans to expand to more languages in the future. This allows users from different linguistic backgrounds to benefit from AI-powered summarization.',
    },
    {
        question: 'How can I get started with SnipScribe?',
        answer: 'Getting started is easy! Simply sign up on our website, and use our dashboard to add your YouTube videos or playlists. SnipScribe will automatically generate summaries for you and send you an email notification when they are ready. You can then access your summaries anytime, anywhere.',
    },
    {
        question: 'Is my data and privacy protected?',
        answer: 'Absolutely. SnipScribe employs advanced encryption protocols to safeguard your data at every stage. We are committed to user privacy and never share your content or personal information with third parties. All processing is handled securely to ensure your peace of mind.',
    },
];

const CommonQuestionsSection: React.FC = () => {
    const [openQuestion, setOpenQuestion] = useState<number | null>(null);
    const theme = useTheme();

    const handleChange = (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
        setOpenQuestion(isExpanded ? index : null);
    };

    return (
        <Box sx={{ bgcolor: theme.palette.background.default, color: theme.palette.text.primary, py: 8 }}>
            <Container maxWidth="lg">
                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={6} alignItems="flex-start">
                    <Box flex={1} textAlign={{ xs: 'center', lg: 'left' }}>
                        <Typography variant="subtitle2" color="text.secondary" mb={1}>
                            Here to help
                        </Typography>
                        <Typography variant="h3" fontWeight="bold" mb={2}>
                            Common questions
                        </Typography>
                        <Typography variant="h6" mb={4}>
                            Find the answers to frequently asked questions here.
                        </Typography>
                        <Box mt={4}>
                            <Typography variant="subtitle2" color="text.secondary" mb={1}>
                                Need further support?
                            </Typography>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    '&:hover': { bgcolor: theme.palette.primary.light },
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                }}
                            >
                                Get Support
                            </Button>
                        </Box>
                    </Box>
                    <Box flex={1} width="100%">
                        {questions.map((item, index) => (
                            <Accordion
                                key={index}
                                expanded={openQuestion === index}
                                onChange={handleChange(index)}
                                sx={{
                                    bgcolor: theme.palette.primary.main,
                                    color: theme.palette.primary.contrastText,
                                    '&.Mui-expanded': {
                                        bgcolor: theme.palette.primary.light,
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{ color: theme.palette.primary.contrastText }} />}
                                    aria-controls={`panel${index}-content`}
                                    id={`panel${index}-header`}
                                >
                                    <Typography>{item.question}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>{item.answer}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        ))}
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default CommonQuestionsSection;
