import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Plus,
    Settings as SettingsIcon,
    HelpCircle,
    FileText,
    Sparkles,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Settings from './components/Settings';
import Help from './components/Help';
import { translations } from './translations';

const App = () => {
    // App State
    const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, new-analysis, settings, help
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobDescription, setJobDescription] = useState('');

    // Settings State
    const [language, setLanguage] = useState('tr'); // tr, en
    const [theme, setTheme] = useState('dark'); // dark, light
    const [soundEnabled, setSoundEnabled] = useState(true);

    const t = translations[language];

    // Theme Effect
    useEffect(() => {
        const root = window.document.documentElement;
        if (theme === 'light') {
            root.classList.add('light');
        } else {
            root.classList.remove('light');
        }
    }, [theme]);

    const playCompletionSound = () => {
        if (soundEnabled) {
            const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
            audio.play().catch(e => console.log("Ses çalınamadı:", e));
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setLoading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('job_description', jobDescription);

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/cv/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data.result);
            setActiveTab('dashboard');
            playCompletionSound();
        } catch (err) {
            setError(language === 'tr' ? "Analiz sırasında bir hata oluştu." : "An error occurred during analysis.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex min-h-screen theme-${theme}`}>
            {/* Sidebar */}
            <Sidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                t={t}
            />

            {/* Main Content */}
            <main className="flex-grow flex flex-col h-screen overflow-y-auto relative">
                {/* Header */}
                <header className="h-16 border-b border-[var(--card-border)] bg-[var(--header-bg)] backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <h2 className="text-sm font-semibold text-[var(--muted-text)] uppercase tracking-widest">
                            {activeTab === 'dashboard' ? t.dashboard :
                                activeTab === 'new-analysis' ? t.newAnalysis :
                                    activeTab === 'settings' ? t.settings : t.help}
                        </h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setActiveTab('new-analysis')}
                            className="bg-[var(--accent)] hover:opacity-90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 shadow-lg shadow-[var(--accent)]/20"
                        >
                            <Plus size={16} />
                            {t.quickUpload}
                        </button>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
                    {/* Dashboard Tab */}
                    {activeTab === 'dashboard' && (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            {!result ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                                    <div className="bg-[var(--card-bg)] p-8 rounded-[2.5rem] border border-[var(--card-border)] shadow-2xl animate-float backdrop-blur-3xl">
                                        <Sparkles size={56} className="text-[var(--accent)] drop-shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
                                    </div>
                                    <div className="max-w-md space-y-3">
                                        <h1 className="text-4xl font-black tracking-tight">{t.noAnalysisDone}</h1>
                                        <p className="text-[var(--muted-text)] text-lg font-medium">{t.noAnalysisDesc}</p>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('new-analysis')}
                                        className="px-10 py-4 bg-[var(--accent)] hover:opacity-90 rounded-2xl font-black text-white shadow-2xl shadow-[var(--accent)]/30 transition-all hover:scale-105 active:scale-95"
                                    >
                                        {t.newAnalysis}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-10">
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="glass-card p-10 flex flex-col items-center justify-center relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <div className="relative z-10 text-center">
                                                <div className="text-7xl font-black mb-2 text-[var(--accent)] drop-shadow-sm">%{result.ats_score.total_score}</div>
                                                <div className="text-sm font-bold text-[var(--muted-text)] uppercase tracking-widest">{t.atsScore}</div>
                                            </div>
                                        </div>
                                        <div className="lg:col-span-2 glass-card p-10 flex flex-col justify-center">
                                            <h3 className="text-3xl font-black mb-4 tracking-tight">{t.welcome}</h3>
                                            <p className="text-[var(--muted-text)] leading-relaxed mb-8 text-lg font-medium">
                                                {t.analysisSuccess} {t.atsScore} <span className="text-[var(--accent)] font-black">%{result.ats_score.total_score}</span>.
                                                {t.atsScoreDesc}
                                            </p>
                                            <div className="flex gap-6">
                                                <div className="px-6 py-4 bg-[var(--card-bg)]/40 rounded-2xl border border-[var(--card-border)] shadow-sm">
                                                    <span className="text-[var(--muted-text)] text-xs font-bold uppercase tracking-wider block mb-1">{t.keywordsDetected}</span>
                                                    <span className="text-xl font-black">{result.keywords.count}</span>
                                                </div>
                                                <div className="px-6 py-4 bg-[var(--card-bg)]/40 rounded-2xl border border-[var(--card-border)] shadow-sm">
                                                    <span className="text-[var(--muted-text)] text-xs font-bold uppercase tracking-wider block mb-1">{t.impactScore}</span>
                                                    <span className="text-xl font-black">{result.analysis.impact_score}/100</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional detailed results UI would go here */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="glass-card p-8">
                                            <h4 className="font-bold mb-4 flex items-center gap-2"><CheckCircle2 className="text-emerald-500" size={20} /> {t.strengths || "Güçlü Yönler"}</h4>
                                            <ul className="space-y-3">
                                                {result.analysis.strengths.map((s, i) => (
                                                    <li key={i} className="text-sm text-[var(--muted-text)] flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="glass-card p-8">
                                            <h4 className="font-bold mb-4 flex items-center gap-2"><AlertCircle className="text-amber-500" size={20} /> {t.weaknesses || "Geliştirilmesi Gerekenler"}</h4>
                                            <ul className="space-y-3">
                                                {result.analysis.weaknesses.map((w, i) => (
                                                    <li key={i} className="text-sm text-[var(--muted-text)] flex items-start gap-2">
                                                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                                                        {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* New Analysis Tab */}
                    {activeTab === 'new-analysis' && (
                        <div className="max-w-3xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center space-y-3">
                                <h1 className="text-5xl font-black tracking-tight drop-shadow-sm">{t.wizardTitle}</h1>
                                <p className="text-[var(--muted-text)] text-xl font-medium">{t.wizardDesc}</p>
                            </div>

                            <div className="glass-card p-10 space-y-8">
                                <div className="space-y-4">
                                    <label className="text-sm font-black uppercase tracking-widest text-[var(--muted-text)]">{t.jobDescription}</label>
                                    <textarea
                                        value={jobDescription}
                                        onChange={(e) => setJobDescription(e.target.value)}
                                        className="w-full h-48 bg-[var(--bg-color)]/30 border border-[var(--card-border)] rounded-2xl p-6 focus:ring-2 focus:ring-[var(--accent)] transition-all resize-none text-[var(--text-color)] placeholder:text-[var(--muted-text)]/50"
                                        placeholder={t.jobDescPlaceholder}
                                    />
                                </div>

                                <div className="space-y-4">
                                    <label className="text-sm font-black uppercase tracking-widest text-[var(--muted-text)]">{t.uploadCV}</label>
                                    <div className="relative border-2 border-dashed border-[var(--card-border)] rounded-3xl p-12 text-center hover:border-[var(--accent)] hover:bg-[var(--accent)]/5 transition-all group cursor-pointer">
                                        <input
                                            type="file"
                                            onChange={handleFileUpload}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            disabled={loading}
                                        />
                                        <div className="flex flex-col items-center gap-4">
                                            {loading ? (
                                                <Loader2 size={48} className="text-[var(--accent)] animate-spin" />
                                            ) : (
                                                <div className="bg-[var(--accent)]/10 p-5 rounded-2xl text-[var(--accent)] group-hover:scale-110 transition-transform">
                                                    <FileText size={40} />
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-lg font-black">{loading ? t.analyzing : t.clickToUpload}</p>
                                                <p className="text-sm text-[var(--muted-text)] mt-1 font-medium">PDF, DOCX (Max. 10MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-500 font-bold animate-shake">
                                        <AlertCircle size={20} />
                                        <p>{error}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <Settings
                            language={language}
                            theme={theme}
                            soundEnabled={soundEnabled}
                            t={t}
                            onSave={({ language, theme, soundEnabled }) => {
                                setLanguage(language);
                                setTheme(theme);
                                setSoundEnabled(soundEnabled);
                            }}
                        />
                    )}

                    {/* Help Tab */}
                    {activeTab === 'help' && <Help t={t} />}
                </div>
            </main>
        </div>
    );
};

export default App;
