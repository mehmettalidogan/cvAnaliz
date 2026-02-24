import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, FileText, Briefcase, Hash, Award, Download, Mail, Phone, Link as LinkIcon, BarChart3 } from 'lucide-react';
import SkillsRadar from './SkillsRadar';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

const AnalysisResult = ({ result }) => {
    const { ats_score, keywords, analysis, extracted_data, job_match } = result;

    const handlePrint = () => {
        window.print();
    };

    // Data for impact bar chart
    const impactData = [
        { name: 'Etki', value: analysis.impact_score || 0, color: '#3b82f6' },
        { name: 'ATS', value: ats_score.total_score || 0, color: '#8b5cf6' },
        { name: 'Uyum', value: job_match?.match_score || 0, color: '#ec4899' }
    ];

    return (
        <div className="w-full space-y-8 pb-20">
            {/* Header / Actions */}
            <div className="flex items-center justify-between print:hidden">
                <h2 className="text-2xl font-bold">Detaylı Rapor</h2>
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all border border-slate-700"
                >
                    <Download size={18} />
                    <span className="text-sm font-medium">PDF Dışa Aktar</span>
                </button>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* 1. Skill Radar (Large) */}
                <div className="lg:col-span-2 bento-item flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-200 flex items-center gap-2">
                            <Hash size={18} className="text-blue-500" />
                            Yetkinlik Haritası
                        </h3>
                    </div>
                    <div className="flex-grow">
                        <SkillsRadar skillsByCategory={keywords.by_category} />
                    </div>
                </div>

                {/* 2. Job Match Status (Medium) */}
                <div className="lg:col-span-2 bento-item bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-slate-200 flex items-center gap-2">
                            <Briefcase size={18} className="text-blue-400" />
                            İş Uyumu
                        </h3>
                        <span className="text-2xl font-black text-blue-400">%{job_match?.match_score || 0}</span>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Eşleşenler</p>
                            <div className="flex flex-wrap gap-1.5">
                                {job_match?.matching_keywords.slice(0, 5).map((kw, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded text-[11px] border border-blue-500/20">{kw}</span>
                                ))}
                                {job_match?.matching_keywords.length > 5 && <span className="text-[11px] text-slate-500">+{job_match.matching_keywords.length - 5} daha</span>}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">Eksikler</p>
                            <div className="flex flex-wrap gap-1.5">
                                {job_match?.missing_keywords.slice(0, 5).map((kw, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded text-[11px] border border-red-500/20">{kw}</span>
                                ))}
                                {job_match?.missing_keywords.length > 5 && <span className="text-[11px] text-slate-500">+{job_match.missing_keywords.length - 5} daha</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Strengths (Medium) */}
                <div className="lg:col-span-2 bento-item">
                    <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <CheckCircle size={18} className="text-emerald-500" />
                        Güçlü Yönler
                    </h3>
                    <ul className="space-y-3">
                        {analysis.strengths.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 4. Weaknesses (Medium) */}
                <div className="lg:col-span-2 bento-item">
                    <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <AlertTriangle size={18} className="text-amber-500" />
                        Gelişim Alanları
                    </h3>
                    <ul className="space-y-3">
                        {analysis.weaknesses.slice(0, 4).map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 shrink-0 shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 5. Metrics Chart (Medium) */}
                <div className="lg:col-span-2 bento-item flex flex-col h-64">
                    <h3 className="font-bold text-slate-200 mb-2 flex items-center gap-2">
                        <BarChart3 size={18} className="text-indigo-400" />
                        Performans Metrikleri
                    </h3>
                    <div className="flex-grow">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={impactData} layout="vertical" margin={{ left: -20, right: 20 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                <RechartsTooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                                    {impactData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 6. Contact & Links (Medium) */}
                <div className="lg:col-span-2 bento-item flex flex-col justify-between">
                    <h3 className="font-bold text-slate-200 mb-4 flex items-center gap-2">
                        <Mail size={18} className="text-slate-400" />
                        İletişim & Erişim
                    </h3>
                    <div className="space-y-4 flex-grow">
                        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                            <Mail size={16} className="text-slate-500" />
                            <span className="text-sm font-medium truncate">{extracted_data.email || 'Belirtilmedi'}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                            <Phone size={16} className="text-slate-500" />
                            <span className="text-sm font-medium">{extracted_data.phone || 'Belirtilmedi'}</span>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-slate-800/30 rounded-xl border border-slate-800/50">
                            <LinkIcon size={16} className="text-slate-500" />
                            <span className="text-sm font-medium">{extracted_data.links?.length || 0} Sosyal Bağlantı</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalysisResult;
