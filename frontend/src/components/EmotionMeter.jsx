import React from 'react';
import './EmotionMeter.css';

const EmotionMeter = ({ stressLevel, maxStress }) => {
    // Determine percentage (inverse of stress)
    const integrity = Math.max(0, 100 - (stressLevel / maxStress) * 100);

    // Calculate color state
    let statusColor = 'var(--color-primary)';
    let statusText = 'STABLE';
    let pulseClass = '';

    if (integrity < 60) {
        statusColor = 'var(--color-warning)';
        statusText = 'CAUTION';
        pulseClass = 'pulse-warning';
    }
    if (integrity < 30) {
        statusColor = 'var(--color-danger)';
        statusText = 'CRITICAL';
        pulseClass = 'pulse-critical';
    }

    // Generate segments for the health bar
    const totalSegments = 10;
    const filledSegments = Math.ceil((integrity / 100) * totalSegments);

    return (
        <div className={`emotion-meter-container ${pulseClass}`}>
            <div className="meter-header">
                <span className="meter-title">SYSTEM_INTEGRITY</span>
                <span className="meter-value" style={{ color: statusColor }}>{Math.round(integrity)}%</span>
            </div>

            <div className="meter-segments">
                {[...Array(totalSegments)].map((_, i) => (
                    <div
                        key={i}
                        className={`segment ${i < filledSegments ? 'filled' : 'empty'}`}
                        style={{
                            backgroundColor: i < filledSegments ? statusColor : 'transparent',
                            borderColor: i < filledSegments ? statusColor : 'var(--color-text-dim)'
                        }}
                    />
                ))}
            </div>

            <div className="meter-status">
                STATUS: <span style={{ color: statusColor }}>{statusText}</span>
            </div>
        </div>
    );
};

export default EmotionMeter;
