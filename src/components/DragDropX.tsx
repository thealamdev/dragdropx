import React, { ChangeEvent, DragEvent, useRef, useState } from "react";
import { X, FileText, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./svg/Loading";

let ImageComponent: any;
try {
  ImageComponent = require("next/image").default;
} catch (e) {
  ImageComponent = ({ src, alt, layout, objectFit, className }: any) => (
    <img 
      src={src} 
      alt={alt} 
      className={className} 
      style={{ 
        width: layout === "fill" ? "100%" : undefined, 
        height: layout === "fill" ? "100%" : undefined,
        objectFit
      }} 
    />
  );
}

export interface FileInfoInterface {
  name: string;
  size: number;
  url: string;
  type: string;
}

export interface DragDropXProps {
  width?: number;
  height?: number;
  onFileChange?: (fileInfo: FileInfoInterface | null) => void;
  acceptedFileTypes?: string[];
}

const initialFileInfos: FileInfoInterface = {
  name: "",
  size: 0,
  url: "",
  type: "",
};

export default function DragDropX({ 
  width = 500, 
  height = 300, 
  onFileChange,
  acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint"]
}: DragDropXProps) {
  const [fileInfos, setFileInfos] = useState<FileInfoInterface>(initialFileInfos);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLInputElement | null>(null);

  const handleTriggerFile = () => ref.current?.click();

  const handleFile = (file: File) => {
    setLoading(true);
    setProgress(1);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          const fileInfo = {
            name: file.name,
            size: file.size,
            url: URL.createObjectURL(file),
            type: file.type,
          };
          setFileInfos(fileInfo);
          if (onFileChange) onFileChange(fileInfo);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileInfos(initialFileInfos);
    if (onFileChange) onFileChange(null);
  };

  return (
    <div className="p-5 flex justify-center items-center">
      <input
        ref={ref}
        type="file"
        onChange={handleInputChange}
        accept={acceptedFileTypes.join(",")}
        className="hidden"
      />

      <motion.div
        className={`relative rounded-lg border-2 ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} flex justify-center items-center cursor-pointer overflow-hidden transition-all`}
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={handleTriggerFile}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <AnimatePresence>
          {loading ? (
            <motion.div
              className="flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative w-16 h-16 flex items-center justify-center">
                <Loading progress={progress} />
                <span className="absolute text-sm font-bold from-green-400/40 to-neutral-900 bg-opacity-70">{progress}%</span>
              </div>
              <p className="text-gray-500 text-sm mt-2">Uploading...</p>
            </motion.div>
          ) : !fileInfos.url ? (
            <motion.div
              className="flex flex-col items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Upload size={48} className="text-gray-400 mb-2" />
              <motion.p className="text-gray-500 font-medium text-lg text-center">
                {isDragging ? "Drop your file here" : "Click or Drag & Drop to Upload"}
              </motion.p>
              <p className="text-gray-400 text-sm mt-2">
                Supported files: Images, PDF, DOCX, PPT, TXT
              </p>
            </motion.div>
          ) : fileInfos.type.startsWith("image") ? (
            <motion.div
              className="w-full h-full relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ImageComponent
                src={fileInfos.url}
                alt="Uploaded Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />

              <motion.button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <X size={20} className="text-gray-600" />
              </motion.button>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-green-400/40 to-neutral-900 bg-opacity-70 text-white p-2">
                <p className="text-sm font-medium truncate">{fileInfos.name}</p>
                <p className="text-xs">{(fileInfos.size / 1024).toFixed(2)} KB</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="flex flex-col items-center p-5 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FileText size={48} className="text-gray-500" />
              <p className="text-gray-700 font-medium mt-2 text-center">{fileInfos.name}</p>
              <p className="text-gray-500 text-sm">{(fileInfos.size / 1024).toFixed(2)} KB</p>

              <motion.button
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
                whileHover={{ scale: 1.1 }}
              >
                <X size={20} className="text-gray-600" />
              </motion.button>

              <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white p-2">
                <p className="text-sm font-medium truncate">{fileInfos.name}</p>
                <p className="text-xs">{(fileInfos.size / 1024).toFixed(2)} KB</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}