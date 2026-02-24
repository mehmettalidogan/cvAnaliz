import React from 'react';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ScoreCard = ({ score }) => {
    const getColor = (score) => {
        if (score >= 80) return '#10B981'; // Emerald
        if (score >= 50) return '#F59E0B'; // Amber
        return '#EF4444'; // Red
    };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card p-10 flex flex-col items-center justify-center w-full h-full min-h-[300px]"
        >
            <h3 className="text-lg font-bold text-slate-400 mb-8 uppercase tracking-widest">ATS Uyumluluk</h3>
            <div className="w-40 h-40 relative group">
                {/* Glow Effect */}
                <div
                    className="absolute inset-0 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                    style={{ backgroundColor: getColor(score) }}
                />
                <CircularProgressbar
                    value={score}
                    text={`${score}%`}
                    styles={buildStyles({
                        pathColor: getColor(score),
                        textColor: '#fff',
                        trailColor: '#1e293b',
                        textSize: '22px',
                        pathTransitionDuration: 1.5,
                        strokeLinecap: 'round'
                    })}
                />
            </div>
            <p className="mt-8 text-sm text-slate-400 text-center font-medium leading-relaxed">
                {score >= 80 ? "Harika! CV'niz ATS sistemleri için mükemmel durumda." :
                    score >= 50 ? "İyi bir temel var, ancak kritik eksikler mevcut." :
                        "Dikkat! CV'niz ATS filtrelerine takılma riski taşıyor."}
            </p>
        </motion.div>
    );
};

export default ScoreCard;
