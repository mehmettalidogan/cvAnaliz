import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import ScoreCard from './components/ScoreCard';
import AnalysisResult from './components/AnalysisResult';
import { LayoutDashboard } from 'lucide-react';

function App() {
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobDescription, setJobDescription] = useState("");

    const handleFileUpload = async (file) => {
        setLoading(true);
        setError(null);
        setResult(null);

        const formData = new FormData();
        formData.append('file', file);
        if (jobDescription.trim()) {
            formData.append('job_description', jobDescription);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/v1/cv/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data.result);
        } catch (err) {
            console.error(err);
            setError("Dosya yüklenirken veya analiz edilirken bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10 print:hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-lg">
                            <LayoutDashboard className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">CV Analiz Pro</h1>
                    </div>
                    <div className="text-sm text-gray-500">v1.1.0</div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto space-y-8">

                    <div className="text-center space-y-2 mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">CV'nizi Dakikalar İçinde Analiz Edin</h2>
                        <p className="text-lg text-gray-600">ATS uyumluluğunuzu ölçün, eksiklerinizi görün ve iş başvurularında öne geçin.</p>
                    </div>

                    {!result && (
                        <div className="space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    İş İlanı (Opsiyonel)
                                </label>
                                <textarea
                                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                                    placeholder="Başvurduğunuz iş ilanının metnini buraya yapıştırın. Bu sayede CV'nizin ilana uygunluğunu analiz edebiliriz."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                />
                            </div>
                            <FileUpload onFileUpload={handleFileUpload} isUploading={loading} />
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
                            <strong className="font-bold">Hata! </strong>
                            <span className="block sm:inline">{error}</span>
                            <button
                                onClick={() => setError(null)}
                                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                            >
                                <span className="text-red-500">&times;</span>
                            </button>
                        </div>
                    )}

                    {result && (
                        <div className="animate-in fade-in slide-in-from-bottom duration-700">
                            <div className="mb-8 flex justify-center">
                                <ScoreCard score={result.ats_score.total_score} />
                            </div>

                            <AnalysisResult result={result} />

                            <div className="flex justify-center mt-10 print:hidden">
                                <button
                                    onClick={() => setResult(null)}
                                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium shadow-lg"
                                >
                                    Yeni Analiz Yap
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t py-6 mt-auto print:hidden">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} CV Analiz Pro. Tüm hakları saklıdır.
                </div>
            </footer>
        </div>
    );
}

export default App;
