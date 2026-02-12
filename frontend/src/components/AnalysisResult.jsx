import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const AnalysisResult = ({ result }) => {
    const { ats_score, keywords, analysis, extracted_data } = result;

    return (
        <div className="space-y-6 mt-8 w-full max-w-4xl mx-auto pb-10">

            {/* İletişim Bilgileri */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow p-6"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">İletişim Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">Email</span>
                        <span className="text-sm font-medium">{extracted_data.email || <span className="text-red-500">Bulunamadı</span>}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">Telefon</span>
                        <span className="text-sm font-medium">{extracted_data.phone || <span className="text-red-500">Bulunamadı</span>}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase">Linkler</span>
                        <span className="text-sm font-medium">{extracted_data.links?.length || 0} adet bulundu</span>
                    </div>
                </div>
            </motion.div>

            {/* Güçlü ve Zayıf Yönler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-green-50 border border-green-200 rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <CheckCircle className="text-green-600" />
                        <h3 className="text-lg font-semibold text-green-800">Güçlü Yönler</h3>
                    </div>
                    <ul className="space-y-2">
                        {analysis.strengths.length > 0 ? (
                            analysis.strengths.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                                    <span className="mt-1 block min-w-[6px] w-[6px] h-[6px] rounded-full bg-green-500"></span>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Belirgin bir güçlü yön tespit edilemedi.</p>
                        )}
                    </ul>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-red-50 border border-red-200 rounded-xl p-6"
                >
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="text-red-600" />
                        <h3 className="text-lg font-semibold text-red-800">Gelişim Alanları</h3>
                    </div>
                    <ul className="space-y-2">
                        {analysis.weaknesses.length > 0 ? (
                            analysis.weaknesses.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                                    <span className="mt-1 block min-w-[6px] w-[6px] h-[6px] rounded-full bg-red-500"></span>
                                    {item}
                                </li>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Harika! Belirgin bir eksiklik yok.</p>
                        )}
                    </ul>
                </motion.div>
            </div>

            {/* Anahtar Kelimeler */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow p-6"
            >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tespit Edilen Yetkinlikler</h3>
                <div className="flex flex-wrap gap-2">
                    {keywords.found_keywords.map((kw, idx) => (
                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            {kw}
                        </span>
                    ))}
                    {keywords.found_keywords.length === 0 && (
                        <p className="text-sm text-gray-500 italic">Teknik anahtar kelime bulunamadı.</p>
                    )}
                </div>
            </motion.div>

        </div>
    );
};

export default AnalysisResult;
