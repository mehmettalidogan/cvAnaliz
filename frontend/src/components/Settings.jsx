import React, { useState } from 'react';
import { Settings as SettingsIcon, Moon, Sun, Bell, Globe, Shield, Cpu } from 'lucide-react';

const Settings = ({ language: initialLanguage, theme: initialTheme, soundEnabled: initialSound, t, onSave }) => {
    // Local state for the settings form
    const [localLanguage, setLocalLanguage] = useState(initialLanguage);
    const [localTheme, setLocalTheme] = useState(initialTheme);
    const [localSound, setLocalSound] = useState(initialSound);

    const handleSave = () => {
        onSave({
            language: localLanguage,
            theme: localTheme,
            soundEnabled: localSound
        });
    };

    const handleCancel = () => {
        setLocalLanguage(initialLanguage);
        setLocalTheme(initialTheme);
        setLocalSound(initialSound);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-2">
                <div className="bg-blue-600/20 p-3 rounded-2xl border border-blue-500/30">
                    <SettingsIcon size={28} className="text-blue-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{t.settingsTitle}</h1>
                    <p className="text-slate-400">{t.settingsDesc}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Genel Ayarlar */}
                <div className="glass-card p-6 space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Globe size={20} className="text-[var(--accent)]" />
                        {t.general}
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)]">
                            <div>
                                <p className="font-medium">{t.language}</p>
                            </div>
                            <select
                                value={localLanguage}
                                onChange={(e) => setLocalLanguage(e.target.value)}
                                className="bg-[var(--card-bg)] border-none rounded-lg text-sm p-1.5 focus:ring-2 focus:ring-[var(--accent)] cursor-pointer text-[var(--text-color)] shadow-sm"
                            >
                                <option value="tr">Türkçe</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)]">
                            <div>
                                <p className="font-medium">{t.theme}</p>
                            </div>
                            <button
                                onClick={() => setLocalTheme(localTheme === 'dark' ? 'light' : 'dark')}
                                className={`w-12 h-6 rounded-full relative transition-all duration-300 ${localTheme === 'dark' ? 'bg-[var(--accent)]' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 flex items-center justify-center ${localTheme === 'dark' ? 'right-1' : 'left-1'}`}>
                                    {localTheme === 'dark' ? <Moon size={10} className="text-blue-600" /> : <Sun size={10} className="text-orange-500" />}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Analiz Ayarları */}
                <div className="glass-card p-6 space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Cpu size={20} className="text-purple-500" />
                        {t.analysisEngine}
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)]">
                            <div>
                                <p className="font-medium">{t.sensitivity}</p>
                            </div>
                            <select className="bg-[var(--card-bg)] border-none rounded-lg text-sm p-1.5 focus:ring-2 focus:ring-[var(--accent)] cursor-pointer text-[var(--text-color)] shadow-sm">
                                <option>Normal</option>
                                <option>Esnek</option>
                                <option>Sıkı</option>
                            </select>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)]">
                            <div>
                                <p className="font-medium">{t.spellCheck}</p>
                            </div>
                            <div className="w-10 h-5 bg-[var(--accent)] rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Güvenlik */}
                <div className="glass-card p-6 space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Shield size={20} className="text-emerald-500" />
                        {t.privacySecurity}
                    </h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                            <p className="font-medium text-sm">{t.storeLocally}</p>
                            <div className="w-10 h-5 bg-[var(--accent)] rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <button className="w-full py-2.5 text-xs font-bold text-red-500 hover:bg-red-500/5 rounded-lg border border-red-500/20 transition-all">
                            {t.deleteHistory}
                        </button>
                    </div>
                </div>

                {/* Bildirimler */}
                <div className="glass-card p-6 space-y-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <Bell size={20} className="text-amber-500" />
                        {t.notifications}
                    </h3>
                    <div className="space-y-4">
                        <div className="p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                            <p className="font-medium text-sm">{t.completionSound}</p>
                            <button
                                onClick={() => setLocalSound(!localSound)}
                                className={`w-10 h-5 rounded-full relative transition-all duration-300 ${localSound ? 'bg-[var(--accent)]' : 'bg-slate-300'}`}
                            >
                                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${localSound ? 'right-1' : 'left-1'}`}></div>
                            </button>
                        </div>
                        <div className="p-3 bg-[var(--bg-color)]/30 rounded-xl border border-[var(--border-color)] flex items-center justify-between">
                            <p className="font-medium text-sm">{t.systemAlerts}</p>
                            <div className="w-10 h-5 bg-[var(--accent)] rounded-full relative cursor-pointer">
                                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 mt-4">
                <button
                    onClick={handleCancel}
                    className="px-6 py-2.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--card-bg)]/80 transition-all font-semibold text-sm border border-[var(--border-color)]"
                >
                    {t.cancel}
                </button>
                <button
                    onClick={handleSave}
                    className="px-8 py-2.5 rounded-xl bg-[var(--accent)] hover:opacity-90 shadow-lg shadow-[var(--accent)]/20 transition-all font-bold text-white text-sm"
                >
                    {t.saveChanges}
                </button>
            </div>
        </div>
    );
};

export default Settings;
