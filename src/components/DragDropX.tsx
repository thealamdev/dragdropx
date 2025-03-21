// import React, { ChangeEvent, DragEvent, useRef, useState } from "react";
// import { X, FileText, Upload } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import Loading from "./svg/Loading";

// let ImageComponent: any;
// try {
//   ImageComponent = require("next/image").default;
// } catch (e) {
//   ImageComponent = ({ src, alt, layout, objectFit, className }: any) => (
//     <img 
//       src={src} 
//       alt={alt} 
//       className={className} 
//       style={{ 
//         width: layout === "fill" ? "100%" : undefined, 
//         height: layout === "fill" ? "100%" : undefined,
//         objectFit
//       }} 
//     />
//   );
// }

// export interface FileInfoInterface {
//   name: string;
//   size: number;
//   url: string;
//   type: string;
// }

// export interface DragDropXProps {
//   width?: number;
//   height?: number;
//   onFileChange?: (fileInfo: FileInfoInterface | null) => void;
//   acceptedFileTypes?: string[];
// }

// const initialFileInfos: FileInfoInterface = {
//   name: "",
//   size: 0,
//   url: "",
//   type: "",
// };

// export default function DragDropX({ 
//   width = 500, 
//   height = 300, 
//   onFileChange,
//   acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint"]
// }: DragDropXProps) {
//   const [fileInfos, setFileInfos] = useState<FileInfoInterface>(initialFileInfos);
//   const [isDragging, setIsDragging] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const ref = useRef<HTMLInputElement | null>(null);

//   const handleTriggerFile = () => ref.current?.click();

//   const handleFile = (file: File) => {
//     setLoading(true);
//     setProgress(1);

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setLoading(false);
//           const fileInfo = {
//             name: file.name,
//             size: file.size,
//             url: URL.createObjectURL(file),
//             type: file.type,
//           };
//           setFileInfos(fileInfo);
//           if (onFileChange) onFileChange(fileInfo);
//           return 100;
//         }
//         return prev + 5;
//       });
//     }, 50);
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) handleFile(file);
//   };

//   const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleDragLeave = () => {
//     setIsDragging(false);
//   };

//   const handleDrop = (e: DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     setIsDragging(false);

//     const file = e.dataTransfer.files?.[0];
//     if (file) handleFile(file);
//   };

//   const handleRemoveFile = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     setFileInfos(initialFileInfos);
//     if (onFileChange) onFileChange(null);
//   };

//   return (
//     <div className="p-5 flex justify-center items-center">
//       <input
//         ref={ref}
//         type="file"
//         onChange={handleInputChange}
//         accept={acceptedFileTypes.join(",")}
//         className="hidden"
//       />

//       <motion.div
//         className={`relative rounded-lg border-2 ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} flex justify-center items-center cursor-pointer overflow-hidden transition-all`}
//         style={{ width: `${width}px`, height: `${height}px` }}
//         onClick={handleTriggerFile}
//         onDragOver={handleDragOver}
//         onDragLeave={handleDragLeave}
//         onDrop={handleDrop}
//       >
//         <AnimatePresence>
//           {loading ? (
//             <motion.div
//               className="flex flex-col items-center"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <div className="relative w-16 h-16 flex items-center justify-center">
//                 <Loading progress={progress} />
//                 <span className="absolute text-sm font-bold from-green-400/40 to-neutral-900 bg-opacity-70">{progress}%</span>
//               </div>
//               <p className="text-gray-500 text-sm mt-2">Uploading...</p>
//             </motion.div>
//           ) : !fileInfos.url ? (
//             <motion.div
//               className="flex flex-col items-center justify-center p-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <Upload size={48} className="text-gray-400 mb-2" />
//               <motion.p className="text-gray-500 font-medium text-lg text-center">
//                 {isDragging ? "Drop your file here" : "Click or Drag & Drop to Upload"}
//               </motion.p>
//               <p className="text-gray-400 text-sm mt-2">
//                 Supported files: Images, PDF, DOCX, PPT, TXT
//               </p>
//             </motion.div>
//           ) : fileInfos.type.startsWith("image") ? (
//             <motion.div
//               className="w-full h-full relative"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <ImageComponent
//                 src={fileInfos.url}
//                 alt="Uploaded Image"
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg"
//               />

//               <motion.button
//                 onClick={handleRemoveFile}
//                 className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <X size={20} className="text-gray-600" />
//               </motion.button>

//               <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-b from-green-400/40 to-neutral-900 bg-opacity-70 text-white p-2">
//                 <p className="text-sm font-medium truncate">{fileInfos.name}</p>
//                 <p className="text-xs">{(fileInfos.size / 1024).toFixed(2)} KB</p>
//               </div>
//             </motion.div>
//           ) : (
//             <motion.div
//               className="flex flex-col items-center p-5 w-full"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//             >
//               <FileText size={48} className="text-gray-500" />
//               <p className="text-gray-700 font-medium mt-2 text-center">{fileInfos.name}</p>
//               <p className="text-gray-500 text-sm">{(fileInfos.size / 1024).toFixed(2)} KB</p>

//               <motion.button
//                 onClick={handleRemoveFile}
//                 className="absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <X size={20} className="text-gray-600" />
//               </motion.button>

//               <div className="absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white p-2">
//                 <p className="text-sm font-medium truncate">{fileInfos.name}</p>
//                 <p className="text-xs">{(fileInfos.size / 1024).toFixed(2)} KB</p>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>
//     </div>
//   );
// }

"use client"
import { ChangeEvent, useRef, useState, DragEvent } from "react";
import Image from "next/image";
import { X, File, FileText, FileImage, FileCode, FileArchive, FileAudio, FileVideo } from "lucide-react"
import UploadIcon from "./svg/UploadIcon";
import { Base64 } from "../utilities/Base64";

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

enum ResponseEnum {
  DEFAULT = 'default',
  BASE64 = 'base64',
}

interface IncomingInterface {
  name?: string
  width?: number
  height?: number
  multiple?: boolean
  accept?: string[]
  response?: string
  onFileChange?: (fileData: string[] | FileList | null) => void
}

interface FileInfo {
  url: string;
  name: string;
  size: string;
  type: string;
  isImage: boolean;
}

export default function DragDropX({ name, width = 500, height = 300, multiple = false, accept = ["*"], response = "default", onFileChange }: IncomingInterface) {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <FileImage size={40} />;
    if (type.startsWith('video/')) return <FileVideo size={40} />;
    if (type.startsWith('audio/')) return <FileAudio size={40} />;
    if (type.startsWith('text/')) return <FileText size={40} />;
    if (type.includes('pdf')) return <FileText size={40} />;
    if (type.includes('zip') || type.includes('compressed')) return <FileArchive size={40} />;
    if (type.includes('javascript') || type.includes('json') || type.includes('html') || type.includes('css')) return <FileCode size={40} />;
    return <File size={40} />;
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    processFiles(selectedFiles);
  };

  const processFiles = async (selectedFiles: FileList) => {
    if (response === ResponseEnum.BASE64) {
      const base64Data = await Base64(selectedFiles);
      onFileChange && onFileChange(base64Data);
    } else if (response === ResponseEnum.DEFAULT) {
      onFileChange && onFileChange(selectedFiles);
    }

    const fileArray = Array.from(selectedFiles);
    const newFiles: FileInfo[] = fileArray.map(file => {
      const isImage = file.type.startsWith('image/');
      return {
        url: URL.createObjectURL(file),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        isImage
      };
    });

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      if (!multiple && droppedFiles.length > 1) {
        const firstFileOnly = new DataTransfer();
        firstFileOnly.items.add(droppedFiles[0]);
        processFiles(firstFileOnly.files);
      } else {
        processFiles(droppedFiles);
      }
    }
  };

  const removeFile = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFiles(prevFiles => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });

    if (files.length <= 1) {
      if (ref.current) {
        ref.current.value = "";
      }
      onFileChange && onFileChange(null);
    }
  };

  const removeAllFiles = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setFiles([]);
    if (ref.current) {
      ref.current.value = "";
    }
    onFileChange && onFileChange(null);
  };

  const getLayoutClasses = (index: number, totalFiles: number) => {
    if (totalFiles === 1) {
      return "w-full h-full";
    } else if (totalFiles === 2) {
      return "w-1/2 h-full";
    } else if (totalFiles === 3) {
      if (index < 2) {
        return "w-1/2 h-1/2";
      } else {
        return "w-full h-1/2";
      }
    } else {
      if (totalFiles === 4 || index < 4) {
        return "w-1/2 h-1/2";
      }
    }
  };

  return (
    <div className="flex justify-center mt-6">
      <div
        onClick={() => ref.current && ref.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') ref.current?.click() }}
        aria-label="Upload files"
        style={{ width, height }}
        className={`relative cursor-pointer overflow-hidden flex items-center justify-center border-2 border-dotted rounded 
                    ${isDragging ? 'bg-blue-50 border-blue-300' : 'bg-[#F9F8FF] border-[#E0E0E0]'}`}
      >
        <input
          {...(name ? { name } : {})}
          onChange={handleFileChange}
          type="file"
          accept={accept?.join(",")}
          ref={ref}
          {...(multiple ? { multiple } : {})}
          className="hidden"
        />

        {files.length === 0 ? (
          <div className="flex flex-col gap-1 items-center">
            <div className={`w-[64px] h-[64px] flex justify-center items-center rounded-full bg-[rgba(109,77,255,0.08)]`}>
              <UploadIcon />
            </div>
            <p>Drag & Drop</p>
            <p>or <span className="underline cursor-pointer">Browse</span> your files to upload</p>
            <p>Supports all file formats</p>
          </div>
        ) : (
          <div className="absolute inset-0 w-full h-full flex flex-wrap">
            {files.slice(0, 4).map((file, index) => (
              <div
                key={index}
                className={`relative ${getLayoutClasses(index, files.length)}`}
              >
                <div className="relative w-full h-full p-1">
                  <div className="relative w-full h-full overflow-hidden rounded bg-gray-100 border border-gray-200">
                    {file.isImage ? (
                      <>
                        <ImageComponent
                          src={file.url}
                          alt={file.name}
                          fill
                          style={{ objectFit: "cover" }}
                          className="hover:scale-[1.05] transition-all duration-300 ease-in-out"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-2 py-1 text-white text-xs truncate">
                          <p className="truncate font-medium">{file.name}</p>
                          <p>{file.size}</p>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-2">
                        <div className="text-gray-500 mb-2">
                          {getFileIcon(file.type)}
                        </div>
                        <p className="text-center text-sm font-medium truncate w-full">{file.name}</p>
                        <p className="text-gray-500 text-xs">{file.size}</p>
                        <p className="text-gray-500 text-xs">{file.type || "Unknown type"}</p>
                      </div>
                    )}
                    <div className="absolute right-2 top-2">
                      <button
                        onClick={(e) => removeFile(index, e)}
                        className="p-1 bg-slate-100 hover:bg-slate-50 rounded-full z-10"
                      >
                        <X width={18} height={18} stroke="#222" />
                      </button>
                    </div>

                    {index === 3 && files.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">+{files.length - 4}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {files.length > 0 && (
              <button
                onClick={removeAllFiles}
                className="absolute right-2 top-2 p-2 bg-red-100 hover:bg-red-200 rounded z-10 text-sm text-red-700"
              >
                Clear All
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}