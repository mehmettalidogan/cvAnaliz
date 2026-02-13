import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, AlertTriangle, FileText, Briefcase, Hash, Award, Download } from 'lucide-react';

const AnalysisResult = ({ result }) => {
    const { ats_score, keywords, analysis, extracted_data, job_match } = result;
    const [activeTab, setActiveTab] = useState('summary'); // summary, job_match, keywords, content

    const handlePrint = () => {
        window.print();
    };

    const TabButton = ({ id, label, icon: Icon }) => (
        <button
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${activeTab === id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
        >
            <Icon size={18} />
            {label}
        </button>
    );

    return (
        <div className="w-full max-w-5xl mx-auto pb-10">
            {/* Üst Bar: Yazdır Butonu */}
            <div className="flex justify-end mb-8 print:hidden">
                <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
                >
                    <Download size={20} />
                    PDF Olarak Kaydet
                </button>
            </div>

            {/* Navigasyon (Tablar) - Baskıda Gizle */}
            <div className="flex flex-wrap gap-2 mb-8 print:hidden">
                <TabButton id="summary" label="Özet" icon={FileText} />
                {job_match && <TabButton id="job_match" label="İş Uyumu" icon={Briefcase} />}
                <TabButton id="keywords" label="Yetkinlikler" icon={Hash} />
                <TabButton id="content" label="İçerik Analizi" icon={Award} />
            </div>

            {/* İçerik Alanı */}
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
            >
                {/* ÖZET SEKMESİ */}
                {(activeTab === 'summary' || activeTab === 'all') && ( // 'all' modu baskı için kullanılabilir (future proof)
                    <div className="space-y-6">
                        {/* İletişim Bilgileri */}
                        <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
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
                        </div>

                        {/* Genel Tavsiyeler */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <CheckCircle className="text-green-600" />
                                    <h3 className="text-lg font-semibold text-green-800">Güçlü Yönler</h3>
                                </div>
                                <ul className="space-y-2">
                                    {analysis.strengths.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-green-700">
                                            <span className="mt-1.5 min-w-[6px] w-[6px] h-[6px] rounded-full bg-green-500"></span>
                                            {item}
                                        </li>
                                    ))}
                                    {analysis.strengths.length === 0 && <p className="text-sm text-gray-500 italic">Belirgin güçlü yön bulunamadı.</p>}
                                </ul>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <AlertTriangle className="text-red-600" />
                                    <h3 className="text-lg font-semibold text-red-800">Gelişim Alanları</h3>
                                </div>
                                <ul className="space-y-2">
                                    {analysis.weaknesses.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm text-red-700">
                                            <span className="mt-1.5 min-w-[6px] w-[6px] h-[6px] rounded-full bg-red-500"></span>
                                            {item}
                                        </li>
                                    ))}
                                    {analysis.weaknesses.length === 0 && <p className="text-sm text-gray-500 italic">Harika! Belirgin eksiklik yok.</p>}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* İŞ UYUMU SEKMESİ */}
                {activeTab === 'job_match' && job_match && (
                    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-800">İş İlanı Uyumu</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-3xl font-bold text-blue-600">%{job_match.match_score}</span>
                                <span className="text-sm text-gray-500">Eşleşme</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Eşleşen Anahtar Kelimeler</h4>
                                <div className="flex flex-wrap gap-2">
                                    {job_match.matching_keywords.map((kw, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                            {kw}
                                        </span>
                                    ))}
                                    {job_match.matching_keywords.length === 0 && <p className="text-sm text-gray-500">Eşleşen kelime yok.</p>}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-3">İlanda Olup CV'de Eksik Olanlar</h4>
                                <div className="flex flex-wrap gap-2">
                                    {job_match.missing_keywords.map((kw, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-red-50 text-red-600 border border-red-100 rounded-full text-sm">
                                            {kw}
                                        </span>
                                    ))}
                                    {job_match.missing_keywords.length === 0 && <p className="text-sm text-gray-500">Eksik kelime yok.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* YETKİNLİKLER SEKMESİ */}
                {activeTab === 'keywords' && (
                    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">Detaylı Yetkinlik Analizi</h3>

                        {/* Kategori Bazlı Gösterim */}
                        {keywords.by_category ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Object.entries(keywords.by_category).map(([category, skills]) => (
                                    <div key={category} className="border border-gray-100 rounded-lg p-4">
                                        <h4 className="text-md font-medium text-gray-700 mb-3 capitalize">{category.replace('_', ' ')}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map((skill, idx) => (
                                                <span key={idx} className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Legacy view if structure is different
                            <div className="flex flex-wrap gap-2">
                                {keywords.found_keywords.map((kw, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                                        {kw}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="mt-6 pt-6 border-t">
                            <p className="text-sm text-gray-500">
                                Toplam <strong className="text-gray-900">{keywords.count}</strong> teknik yetkinlik tespit edildi.
                            </p>
                        </div>
                    </div>
                )}

                {/* İÇERİK ANALİZİ SEKMESİ */}
                {activeTab === 'content' && (
                    <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">İçerik Kalitesi ve Etki</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="text-center p-6 bg-blue-50 rounded-xl">
                                <div className="text-4xl font-bold text-blue-600 mb-2">{analysis.impact_score || 0}</div>
                                <div className="text-sm font-medium text-blue-800">Etki Puanı (Metrik Kullanımı)</div>
                                <p className="text-xs text-blue-600/80 mt-2">CV'nizde başarınızı sayılarla ifade ettiğiniz yerlerin sayısı.</p>
                            </div>

                            <div className="p-4">
                                <h4 className="font-medium text-gray-900 mb-2">Neden Önemli?</h4>
                                <p className="text-sm text-gray-600">
                                    İşe alım uzmanları, "yaptım" demek yerine "ne kadar geliştirdim" diyen adayları tercih eder.
                                    (Örn: "Satışları artırdım" yerine "%20 artış sağladım")
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">İçerik İpuçları</h4>
                            <ul className="space-y-3">
                                <li className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <span className="text-blue-500 font-bold">•</span>
                                    Aktif fiiller kullanmaya özen gösterin (Yönettim, Geliştirdim, Tasarladım).
                                </li>
                                <li className="flex gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <span className="text-blue-500 font-bold">•</span>
                                    Yazım ve imla kurallarına dikkat edin.
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

            </motion.div>

            {/* Print Footer - Sadece baskıda görünür */}
            <div className="hidden print:block text-center mt-10 text-xs text-gray-400">
                Bu rapor CV Analiz Pro tarafından oluşturulmuştur.
            </div>
        </div>
    );
};

export default AnalysisResult;
