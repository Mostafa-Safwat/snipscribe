import React from 'react';
import CommonQuestionsSection from './CommonQuestionsSection';
import Footer from './Footer';
import Hero from './Hero';
import KeyFeatureSection from './KeyFeatureSection';
import Navbar from './Navbar';
import NewsletterSection from './NewsletterSection';
import SplitContainer from './SplitContainer';

const Landing: React.FC = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <SplitContainer />
            <KeyFeatureSection />
            <CommonQuestionsSection />
            <NewsletterSection />
            <Footer />
        </>
    );
};

export default Landing;
