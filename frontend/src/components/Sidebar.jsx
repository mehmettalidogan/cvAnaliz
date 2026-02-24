import React from 'react';
import { LayoutDashboard, FileText, History, Settings, HelpCircle } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${active
            ? 'bg-[var(--accent)]/10 text-[var(--accent)] shadow-sm'
            : 'text-[var(--muted-text)] hover:bg-[var(--accent)]/5 hover:text-[var(--accent)]'
            }`}
    >
        <Icon size={20} className={active ? 'text-[var(--accent)] transition-transform duration-300 scale-110' : 'group-hover:text-[var(--accent)] transition-all duration-300'} />
        <span className="font-medium tracking-tight">{label}</span>
    </button>
);

const Sidebar = ({ activeTab, setActiveTab, t }) => {
    return (
        <aside className="w-64 glass-sidebar h-screen sticky top-0 flex flex-col p-4 z-20">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 mb-10 py-2">
                <div className="bg-[var(--accent)] p-2.5 rounded-xl shadow-lg shadow-[var(--accent)]/20 rotate-3 group-hover:rotate-0 transition-transform duration-500">
                    <LayoutDashboard size={22} className="text-white" />
                </div>
                <h1 className="text-xl font-black tracking-tighter italic">CV<span className="text-[var(--accent)]">Pro</span></h1>
            </div>

            {/* Nav */}
            <nav className="flex-grow space-y-2">
                <SidebarItem
                    icon={LayoutDashboard}
                    label={t.dashboard}
                    active={activeTab === 'dashboard'}
                    onClick={() => setActiveTab('dashboard')}
                />
                <SidebarItem
                    icon={FileText}
                    label={t.newAnalysis}
                    active={activeTab === 'new-analysis'}
                    onClick={() => setActiveTab('new-analysis')}
                />
            </nav>

            {/* Bottom */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
                <SidebarItem
                    icon={Settings}
                    label={t.settings}
                    active={activeTab === 'settings'}
                    onClick={() => setActiveTab('settings')}
                />
                <SidebarItem
                    icon={HelpCircle}
                    label={t.help}
                    active={activeTab === 'help'}
                    onClick={() => setActiveTab('help')}
                />
                <div className="mt-auto pt-6 border-t border-[var(--card-border)]">
                    <div className="flex items-center justify-between px-2 text-[var(--muted-text)]">
                        <span className="text-xs font-bold uppercase tracking-widest">{t.version}</span>
                        <span className="text-xs font-black bg-[var(--accent)]/10 text-[var(--accent)] px-2 py-0.5 rounded-full">v1.1.1</span>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
