var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/components/DragDropX.tsx
import { useRef, useState } from "react";
import { X, File, FileText, FileImage, FileCode, FileArchive, FileAudio, FileVideo } from "lucide-react";

// src/components/svg/UploadIcon.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function UploadIcon({ width = "26", height = "24", stroke = "#8D899F" }) {
  return /* @__PURE__ */ jsxs("svg", { width, height, viewBox: "0 0 26 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsx("path", { d: "M4.17969 12V20C4.17969 20.5304 4.39981 21.0391 4.79162 21.4142C5.18344 21.7893 5.71486 22 6.26897 22H18.8047C19.3588 22 19.8902 21.7893 20.282 21.4142C20.6739 21.0391 20.894 20.5304 20.894 20V12", stroke: "#8D899F", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M16.7126 6L12.534 2L8.35547 6", stroke, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
    /* @__PURE__ */ jsx("path", { d: "M12.5352 2V15", stroke, strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  ] });
}

// src/utilities/Base64.ts
var Base64 = (files) => __async(void 0, null, function* () {
  if (!files) {
    return Promise.resolve([]);
  }
  const ArrayList = Array.from(files);
  return Promise.all(
    ArrayList.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    })
  );
});

// src/components/DragDropX.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var ImageComponent;
try {
  ImageComponent = __require("next/image").default;
} catch (e) {
  ImageComponent = ({ src, alt, layout, objectFit, className }) => /* @__PURE__ */ jsx2(
    "img",
    {
      src,
      alt,
      className,
      style: {
        width: layout === "fill" ? "100%" : void 0,
        height: layout === "fill" ? "100%" : void 0,
        objectFit
      }
    }
  );
}
function DragDropX({ name, width = 500, height = 300, multiple = false, accept = ["*"], response = "default", onFileChange }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const ref = useRef(null);
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };
  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return /* @__PURE__ */ jsx2(FileImage, { size: 40 });
    if (type.startsWith("video/")) return /* @__PURE__ */ jsx2(FileVideo, { size: 40 });
    if (type.startsWith("audio/")) return /* @__PURE__ */ jsx2(FileAudio, { size: 40 });
    if (type.startsWith("text/")) return /* @__PURE__ */ jsx2(FileText, { size: 40 });
    if (type.includes("pdf")) return /* @__PURE__ */ jsx2(FileText, { size: 40 });
    if (type.includes("zip") || type.includes("compressed")) return /* @__PURE__ */ jsx2(FileArchive, { size: 40 });
    if (type.includes("javascript") || type.includes("json") || type.includes("html") || type.includes("css")) return /* @__PURE__ */ jsx2(FileCode, { size: 40 });
    return /* @__PURE__ */ jsx2(File, { size: 40 });
  };
  const handleFileChange = (e) => __async(this, null, function* () {
    e.stopPropagation();
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;
    processFiles(selectedFiles);
  });
  const processFiles = (selectedFiles) => __async(this, null, function* () {
    if (response === "base64" /* BASE64 */) {
      const base64Data = yield Base64(selectedFiles);
      onFileChange && onFileChange(base64Data);
    } else if (response === "default" /* DEFAULT */) {
      onFileChange && onFileChange(selectedFiles);
    }
    const fileArray = Array.from(selectedFiles);
    const newFiles = fileArray.map((file) => {
      const isImage = file.type.startsWith("image/");
      return {
        url: URL.createObjectURL(file),
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        isImage
      };
    });
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  });
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
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
  const removeFile = (index, e) => {
    e.stopPropagation();
    setFiles((prevFiles) => {
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
  const removeAllFiles = (e) => {
    e.stopPropagation();
    setFiles([]);
    if (ref.current) {
      ref.current.value = "";
    }
    onFileChange && onFileChange(null);
  };
  const getLayoutClasses = (index, totalFiles) => {
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
  return /* @__PURE__ */ jsx2("div", { className: "flex justify-center mt-6", children: /* @__PURE__ */ jsxs2(
    "div",
    {
      onClick: () => {
        var _a;
        return ref.current && ((_a = ref.current) == null ? void 0 : _a.click());
      },
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        var _a;
        if (e.key === "Enter" || e.key === " ") (_a = ref.current) == null ? void 0 : _a.click();
      },
      "aria-label": "Upload files",
      style: { width, height },
      className: `relative cursor-pointer overflow-hidden flex items-center justify-center border-2 border-dotted rounded 
                    ${isDragging ? "bg-blue-50 border-blue-300" : "bg-[#F9F8FF] border-[#E0E0E0]"}`,
      children: [
        /* @__PURE__ */ jsx2(
          "input",
          __spreadProps(__spreadValues(__spreadProps(__spreadValues({}, name ? { name } : {}), {
            onChange: handleFileChange,
            type: "file",
            accept: accept == null ? void 0 : accept.join(","),
            ref
          }), multiple ? { multiple } : {}), {
            className: "hidden"
          })
        ),
        files.length === 0 ? /* @__PURE__ */ jsxs2("div", { className: "flex flex-col gap-1 items-center", children: [
          /* @__PURE__ */ jsx2("div", { className: `w-[64px] h-[64px] flex justify-center items-center rounded-full bg-[rgba(109,77,255,0.08)]`, children: /* @__PURE__ */ jsx2(UploadIcon, {}) }),
          /* @__PURE__ */ jsx2("p", { children: "Drag & Drop" }),
          /* @__PURE__ */ jsxs2("p", { children: [
            "or ",
            /* @__PURE__ */ jsx2("span", { className: "underline cursor-pointer", children: "Browse" }),
            " your files to upload"
          ] }),
          /* @__PURE__ */ jsx2("p", { children: "Supports all file formats" })
        ] }) : /* @__PURE__ */ jsxs2("div", { className: "absolute inset-0 w-full h-full flex flex-wrap", children: [
          files.slice(0, 4).map((file, index) => /* @__PURE__ */ jsx2(
            "div",
            {
              className: `relative ${getLayoutClasses(index, files.length)}`,
              children: /* @__PURE__ */ jsx2("div", { className: "relative w-full h-full p-1", children: /* @__PURE__ */ jsxs2("div", { className: "relative w-full h-full overflow-hidden rounded bg-gray-100 border border-gray-200", children: [
                file.isImage ? /* @__PURE__ */ jsxs2(Fragment, { children: [
                  /* @__PURE__ */ jsx2(
                    ImageComponent,
                    {
                      src: file.url,
                      alt: file.name,
                      fill: true,
                      style: { objectFit: "cover" },
                      className: "hover:scale-[1.05] transition-all duration-300 ease-in-out"
                    }
                  ),
                  /* @__PURE__ */ jsxs2("div", { className: "absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 px-2 py-1 text-white text-xs truncate", children: [
                    /* @__PURE__ */ jsx2("p", { className: "truncate font-medium", children: file.name }),
                    /* @__PURE__ */ jsx2("p", { children: file.size })
                  ] })
                ] }) : /* @__PURE__ */ jsxs2("div", { className: "flex flex-col items-center justify-center h-full p-2", children: [
                  /* @__PURE__ */ jsx2("div", { className: "text-gray-500 mb-2", children: getFileIcon(file.type) }),
                  /* @__PURE__ */ jsx2("p", { className: "text-center text-sm font-medium truncate w-full", children: file.name }),
                  /* @__PURE__ */ jsx2("p", { className: "text-gray-500 text-xs", children: file.size }),
                  /* @__PURE__ */ jsx2("p", { className: "text-gray-500 text-xs", children: file.type || "Unknown type" })
                ] }),
                /* @__PURE__ */ jsx2("div", { className: "absolute right-2 top-2", children: /* @__PURE__ */ jsx2(
                  "button",
                  {
                    onClick: (e) => removeFile(index, e),
                    className: "p-1 bg-slate-100 hover:bg-slate-50 rounded-full z-10",
                    children: /* @__PURE__ */ jsx2(X, { width: 18, height: 18, stroke: "#222" })
                  }
                ) }),
                index === 3 && files.length > 4 && /* @__PURE__ */ jsx2("div", { className: "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: /* @__PURE__ */ jsxs2("span", { className: "text-white text-2xl font-bold", children: [
                  "+",
                  files.length - 4
                ] }) })
              ] }) })
            },
            index
          )),
          files.length > 0 && /* @__PURE__ */ jsx2(
            "button",
            {
              onClick: removeAllFiles,
              className: "absolute right-2 top-2 p-2 bg-red-100 hover:bg-red-200 rounded z-10 text-sm text-red-700",
              children: "Clear All"
            }
          )
        ] })
      ]
    }
  ) });
}
export {
  DragDropX
};
//# sourceMappingURL=index.mjs.map