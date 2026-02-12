import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ScoreCard = ({ score }) => {
    const getColor = (score) => {
        if (score >= 80) return '#10B981'; // Green
        if (score >= 50) return '#F59E0B'; // Orange
        return '#EF4444'; // Red
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center w-full max-w-sm mx-auto"
        >
            <h3 className="text-xl font-bold text-gray-800 mb-4">ATS Uyumluluk Puanı</h3>
            <div className="w-32 h-32">
                <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                        pathColor: getColor(score),
                        textColor: '#1F2937',
                        trailColor: '#F3F4F6',
                        textSize: '24px',
                        pathTransitionDuration: 0.5
                    })}
                />
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
                {score >= 80 ? "Harika! CV'niz ATS sistemleri için oldukça uygun." :
                    score >= 50 ? "İyi, ancak bazı düzeltmeler gerekiyor." :
                        "Dikkat! CV'niz ATS tarafından elenebilir."}
            </p>
        </motion.div>
    );
};

export default ScoreCard;
