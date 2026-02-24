import React from 'react';
import { HelpCircle, MessageCircle, ShieldCheck, Zap } from 'lucide-react';

const Help = ({ t }) => {
    const faqs = [
        {
            q: t.language === 'tr' ? "ATS Puanı nasıl hesaplanıyor?" : "How is the ATS Score calculated?",
            a: t.language === 'tr' ? "Sistemimiz CV'nizi sektör standartlarındaki anahtar kelimeler, bölüm yapısı, görsel karmaşıklık ve okunabilirlik gibi 20'den fazla kriterde değerlendirir." : "Our system evaluates your CV on more than 20 criteria such as industry-standard keywords, section structure, visual complexity, and readability."
        },
        {
            q: t.language === 'tr' ? "Verilerim güvende mi?" : "Is my data safe?",
            a: t.language === 'tr' ? "Evet, tüm analizler yerel olarak gerçekleştirilir ve CV verileriniz asla sunucularımızda saklanmaz." : "Yes, all analyses are performed locally and your CV data is never stored on our servers."
        },
        {
            q: t.language === 'tr' ? "Hangi dosya formatlarını yükleyebilirim?" : "Which file formats can I upload?",
            a: t.language === 'tr' ? "Şu an için PDF ve DOCX formatlarını desteklemekteyiz. En iyi sonuç için PDF önerilir." : "We currently support PDF and DOCX formats. PDF is recommended for the best results."
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center gap-4 mb-2">
                <div className="bg-emerald-600/20 p-3 rounded-2xl border border-emerald-500/30">
                    <HelpCircle size={28} className="text-emerald-400" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold">{t.helpTitle}</h1>
                    <p className="text-slate-400">{t.helpDesc}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Hızlı Başlangıç */}
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <Zap size={20} className="text-amber-500" />
                            {t.quickStart}
                        </h3>
                        <div className="space-y-4">
                            <div className="flex gap-4 p-4 bg-[var(--card-bg)]/30 rounded-2xl border border-[var(--card-border)] shadow-sm">
                                <div className="bg-[var(--accent)]/20 w-8 h-8 flex items-center justify-center rounded-full text-[var(--accent)] font-bold shrink-0">1</div>
                                <div>
                                    <p className="font-bold">{t.step1}</p>
                                    <p className="text-sm text-[var(--muted-text)]">{t.step1Desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-[var(--card-bg)]/30 rounded-2xl border border-[var(--card-border)] shadow-sm">
                                <div className="bg-[var(--accent)]/20 w-8 h-8 flex items-center justify-center rounded-full text-[var(--accent)] font-bold shrink-0">2</div>
                                <div>
                                    <p className="font-bold">{t.step2}</p>
                                    <p className="text-sm text-[var(--muted-text)]">{t.step2Desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-4 p-4 bg-[var(--card-bg)]/30 rounded-2xl border border-[var(--card-border)] shadow-sm">
                                <div className="bg-[var(--accent)]/20 w-8 h-8 flex items-center justify-center rounded-full text-[var(--accent)] font-bold shrink-0">3</div>
                                <div>
                                    <p className="font-bold">{t.step3}</p>
                                    <p className="text-sm text-[var(--muted-text)]">{t.step3Desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SSS */}
                    <div className="glass-card p-6">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <MessageCircle size={20} className="text-[var(--accent)]" />
                            {t.faq}
                        </h3>
                        <div className="space-y-4">
                            {faqs.map((faq, i) => (
                                <div key={i} className="p-4 bg-[var(--card-bg)]/20 rounded-xl border border-[var(--card-border)]">
                                    <p className="font-bold mb-2">{faq.q}</p>
                                    <p className="text-sm text-[var(--muted-text)]">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Bize Ulaşın */}
                    <div className="glass-card p-6 bg-gradient-to-br from-[var(--accent)]/10 to-purple-500/10 border-[var(--card-border)]">
                        <h3 className="text-lg font-bold mb-4">{t.needHelp}</h3>
                        <p className="text-sm text-[var(--muted-text)] mb-6">{t.needHelpDesc}</p>
                        <button className="w-full py-3 bg-[var(--accent)] hover:opacity-90 rounded-xl font-bold transition-all shadow-lg shadow-[var(--accent)]/20 text-white">
                            {t.sendEmail}
                        </button>
                    </div>

                    {/* Versiyon Bilgisi */}
                    <div className="glass-card p-6 border-[var(--card-border)]">
                        <div className="flex items-center gap-3 mb-4">
                            <ShieldCheck size={24} className="text-[var(--accent)]" />
                            <h3 className="font-bold">{t.systemStatus}</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span className="text-[var(--muted-text)]">{t.version}</span>
                                <span className="font-bold">v1.1.1</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-[var(--muted-text)]">{t.engineStatus}</span>
                                <span className="text-emerald-500 font-bold">{t.active}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
