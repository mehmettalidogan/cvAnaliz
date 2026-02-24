import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileType, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = ({ onFileUpload, isUploading }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileUpload(acceptedFiles[0]);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc']
        },
        multiple: false,
        disabled: isUploading
    });

    const hasFile = acceptedFiles.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            {...getRootProps()}
            className={`
                glass-card p-12 border-2 border-dashed cursor-pointer transition-all duration-500
                flex flex-col items-center justify-center text-center min-h-[300px] group
                ${isDragActive ? 'border-blue-500 bg-blue-500/10 scale-[1.02]' : 'border-slate-800 hover:border-slate-700 hover:bg-slate-900/40'}
                ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            <input {...getInputProps()} />

            <div className={`
                p-6 rounded-2xl mb-6 transition-all duration-500
                ${isDragActive ? 'bg-blue-600 shadow-lg shadow-blue-900/40' : 'bg-slate-950/50 border border-slate-800 group-hover:border-slate-700'}
            `}>
                {isUploading ? (
                    <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
                ) : (
                    <UploadCloud className={`w-10 h-10 ${isDragActive ? 'text-white' : 'text-blue-500'}`} />
                )}
            </div>

            <div className="space-y-2">
                {isUploading ? (
                    <div>
                        <p className="text-xl font-bold text-white mb-2">CV Analiz Ediliyor</p>
                        <p className="text-slate-400 text-sm">Lütfen bekleyin, yapay zeka kurallarımız çalışıyor...</p>
                    </div>
                ) : isDragActive ? (
                    <p className="text-xl font-bold text-blue-400">Dosyayı Buraya Bırak!</p>
                ) : hasFile ? (
                    <div className="flex flex-col items-center gap-2">
                        <CheckCircle2 className="text-emerald-500" />
                        <p className="text-lg font-bold text-white">{acceptedFiles[0].name}</p>
                        <p className="text-slate-500 text-sm">Dosya değiştirilmek için tıklayın</p>
                    </div>
                ) : (
                    <>
                        <p className="text-2xl font-bold text-white">CV'nizi Buraya Bırakın</p>
                        <p className="text-slate-400">veya dosya seçmek için <span className="text-blue-500 font-semibold underline underline-offset-4">tıklayın</span></p>
                        <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-slate-800/50">
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                                <FileType size={14} className="text-slate-600" />
                                PDF
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold uppercase tracking-wider">
                                <FileType size={14} className="text-slate-600" />
                                DOCX
                            </div>
                        </div>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default FileUpload;
