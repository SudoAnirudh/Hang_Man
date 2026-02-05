import React from 'react';
import './EmotionMeter.css';

const EmotionMeter = ({ stressLevel, maxStress }) => {
    // stressLevel starts at 0 (safe) and goes up to maxStress (explosion)
    const percentage = Math.min((stressLevel / maxStress) * 100, 100);

    // Determine color based on stress
    let statusColor = 'var(--color-primary)';
    let statusText = 'STABLE';

    if (percentage > 40) {
        statusColor = 'var(--color-warning)';
        statusText = 'UNSTABLE';
    }
    if (percentage > 75) {
        statusColor = 'var(--color-danger)';
        statusText = 'CRITICAL';
    }

    return (
        <div className="emotion-meter-container">
            <div className="meter-label">
                <span>CORE_INTEGRITY</span>
                <span style={{ color: statusColor }}>{statusText}</span>
            </div>

            <div className="meter-track">
                <div
                    className="meter-fill"
                    style={{
                        width: `${100 - percentage}%`, // As stress goes up, integrity goes down
                        backgroundColor: statusColor,
                        boxShadow: `0 0 15px ${statusColor}`
                    }}
                />
            </div>

            <div className="stress-readout">
                INTEGRITY: {Math.round(100 - percentage)}%
            </div>
        </div>
    );
};

export default EmotionMeter;
