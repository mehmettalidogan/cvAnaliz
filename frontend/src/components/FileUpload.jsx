import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';
import { motion } from 'framer-motion';

const FileUpload = ({ onFileUpload, isUploading }) => {
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length > 0) {
            onFileUpload(acceptedFiles[0]);
        }
    }, [onFileUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/pdf': ['.pdf'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/msword': ['.doc']
        },
        multiple: false,
        disabled: isUploading
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            {...getRootProps()}
            className={`
        p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300
        flex flex-col items-center justify-center text-center h-64
        ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary hover:bg-gray-50'}
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}
      `}
        >
            <input {...getInputProps()} />
            <div className="bg-primary/10 p-4 rounded-full mb-4">
                <UploadCloud className="w-8 h-8 text-primary" />
            </div>
            {isUploading ? (
                <p className="text-lg font-medium text-gray-700 animate-pulse">Dosya analiz ediliyor...</p>
            ) : isDragActive ? (
                <p className="text-lg font-medium text-primary">Dosyayı buraya bırakın...</p>
            ) : (
                <div>
                    <p className="text-lg font-medium text-gray-700">CV'nizi sürükleyip bırakın</p>
                    <p className="text-sm text-gray-500 mt-2">veya dosya seçmek için tıklayın</p>
                    <p className="text-xs text-gray-400 mt-4">Desteklenen formatlar: PDF, DOCX</p>
                </div>
            )}
        </motion.div>
    );
};

export default FileUpload;
