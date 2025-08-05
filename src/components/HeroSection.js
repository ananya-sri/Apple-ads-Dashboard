import React from 'react';
import { Box, ArrowRight, Play } from 'lucide-react';
import './HeroSection.css';

const HeroSection = () => {
  const handleMetricsClick = () => {
    alert('How to read the metrics guide opened!');
  };

  const handleSkipClick = () => {
    alert('Skipped to main content!');
  };

  const handleVideoClick = () => {
    alert('Video guide opened!');
  };

  return (
    <div className="hero-section">
      <div className="hero-left">
        <h2 className="hero-title">
          Evaluate performance of your ads on all levels
        </h2>
        <p className="hero-description">
          Ads Manager is your actionable full-funnel view on both Apple Search Ads stats and post-install metrics to take educated actions & accelerate ROAS.
        </p>
        <div className="hero-actions">
          <button className="metrics-button" onClick={handleMetricsClick}>
            <Box size={16} />
            How to read the metrics
            <ArrowRight size={16} />
          </button>
          <button className="skip-button" onClick={handleSkipClick}>
            Skip
          </button>
        </div>
      </div>
      <div className="hero-right">
        <div className="video-guide" onClick={handleVideoClick}>
          <div className="video-pattern"></div>
          <div className="video-content">
            <div className="play-button">
              <Play size={24} fill="white" />
            </div>
            <div className="video-text">
              <div className="video-title">A Video Guide</div>
              <div className="video-subtitle">AppStorys aqu apple ads</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection; 