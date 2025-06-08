import React, { useRef } from 'react';
import { Box, Typography, useTheme, Paper } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import DownloadsSVG from '@/assets/Downloads.svg';
import RecommendedSVG from '@/assets/Recommended.svg';
import VideoPlaylistSVG from '@/assets/Video Playlist.svg';
import GlobeSVG from '@/assets/Globe Showing Europe Africa.svg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

type Feature = {
    title: string;
    icon: string;
    desc: string;
};

const features: Feature[] = [
    {
        title: 'Multi-Language Support',
        icon: GlobeSVG,
        desc: 'AI-powered summarization in multiple languages.',
    },
    {
        title: 'Playlist Support',
        icon: VideoPlaylistSVG,
        desc: 'Summarize multiple videos simultaneously.',
    },
    {
        title: 'Share Summaries',
        icon: DownloadsSVG,
        desc: 'Easily share summaries with friends',
    },
    {
        title: 'Favorite Summaries',
        icon: RecommendedSVG,
        desc: 'Save your favorite summaries for quick access.',
    },
];

const KeyFeatureSection: React.FC = () => {
    const theme = useTheme();
    const swiperRef = useRef<any>(null);

    return (
        <Box
            component="section"
            sx={{
                bgcolor: theme.palette.background.default,
                color: theme.palette.text.primary,
                py: { xs: 8, sm: 12 },
                px: { xs: 2, sm: 4, lg: 8 },
            }}
        >
            <Box maxWidth="lg" mx="auto" textAlign="center">
                <Typography variant="h4" fontWeight="bold" mb={4} sx={{ color: theme.palette.warning.main }}>
                    Key Features
                </Typography>

                <Box
                    position="relative"
                    onMouseEnter={() => swiperRef.current?.swiper.autoplay.stop()}
                    onMouseLeave={() => swiperRef.current?.swiper.autoplay.start()}
                >
                    <Swiper
                        ref={swiperRef}
                        modules={[Autoplay, Navigation, Pagination]}
                        autoplay={{ delay: 3000, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        navigation={true}
                        loop={true}
                        spaceBetween={20}
                        breakpoints={{
                            640: { slidesPerView: 1 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        style={{ paddingBottom: 40 }}
                    >
                        {features.map((feature, index) => (
                            <SwiperSlide key={index}>
                                <Paper
                                    elevation={3}
                                    sx={{
                                        bgcolor: theme.palette.primary.dark,
                                        p: 4,
                                        borderRadius: 3,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        textAlign: 'center',
                                        height: '100%',
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={feature.icon}
                                        alt={feature.title}
                                        sx={{ width: 48, height: 48, mb: 2 }}
                                    />
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                        mb={1}
                                        sx={{ color: theme.palette.warning.main }}
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: theme.palette.grey[200] }}>
                                        {feature.desc}
                                    </Typography>
                                </Paper>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <style>{`
            .swiper-pagination-bullets {
              position: relative;
              margin-top: 12px;
            }
            .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
            }
            .swiper-pagination-bullet-active {
              background-color: ${theme.palette.warning.main};
              opacity: 1;
            }
            .swiper-button-next,
            .swiper-button-prev {
              color: ${theme.palette.warning.main};
              transition: transform 0.2s ease;
            }
            .swiper-button-next:hover,
            .swiper-button-prev:hover {
              transform: scale(1.2);
            }
          `}</style>
                </Box>
            </Box>
        </Box>
    );
};

export default KeyFeatureSection;
