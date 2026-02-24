import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

const SkillsRadar = ({ skillsByCategory }) => {
    // Convert object to recharts format
    // Example: { "Technical Skills": ["Python", "JS"], "Soft Skills": ["Leadership"] }
    // -> [ { subject: "Technical Skills", A: 80, fullMark: 100 }, ... ]

    const data = Object.entries(skillsByCategory || {}).map(([category, skills]) => {
        // Generate a semi-random but consistent score based on skill count for visualization
        const score = Math.min(40 + (skills.length * 15), 100);
        return {
            subject: category.replace('_', ' '),
            A: score,
            fullMark: 100
        };
    });

    if (data.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm italic">
                Yeterli veri bulunamadı.
            </div>
        );
    }

    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Yetkinlik"
                        dataKey="A"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.5}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ color: '#3b82f6' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillsRadar;
