var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/components/DragDropX.tsx
import { useRef, useState } from "react";
import { X, FileText, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// src/components/svg/Loading.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Loading({ progress }) {
  return /* @__PURE__ */ jsxs("svg", { className: "w-16 h-16", viewBox: "0 0 36 36", children: [
    /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("linearGradient", { id: "progressGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
      /* @__PURE__ */ jsx("stop", { offset: "0%", stopColor: "#10B981" }),
      /* @__PURE__ */ jsx("stop", { offset: "100%", stopColor: "#1F2937" })
    ] }) }),
    /* @__PURE__ */ jsx("circle", { className: "text-gray-300", strokeWidth: "3", stroke: "currentColor", fill: "transparent", r: "16", cx: "18", cy: "18" }),
    /* @__PURE__ */ jsx(
      "circle",
      {
        className: "bg-opacity-70",
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeDasharray: `${2 * Math.PI * 16}`,
        strokeDashoffset: `${2 * Math.PI * 16 * (1 - progress / 100)}`,
        stroke: "url(#progressGradient)",
        fill: "transparent",
        r: "16",
        cx: "18",
        cy: "18"
      }
    )
  ] });
}

// src/components/DragDropX.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
var initialFileInfos = {
  name: "",
  size: 0,
  url: "",
  type: ""
};
function DragDropX({
  width = 500,
  height = 300,
  onFileChange,
  acceptedFileTypes = ["image/png", "image/jpg", "image/jpeg", "text/plain", "application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-powerpoint"]
}) {
  const [fileInfos, setFileInfos] = useState(initialFileInfos);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const handleTriggerFile = () => {
    var _a;
    return (_a = ref.current) == null ? void 0 : _a.click();
  };
  const handleFile = (file) => {
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
            type: file.type
          };
          setFileInfos(fileInfo);
          if (onFileChange) onFileChange(fileInfo);
          return 100;
        }
        return prev + 5;
      });
    }, 50);
  };
  const handleInputChange = (e) => {
    var _a;
    const file = (_a = e.target.files) == null ? void 0 : _a[0];
    if (file) handleFile(file);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    var _a;
    e.preventDefault();
    setIsDragging(false);
    const file = (_a = e.dataTransfer.files) == null ? void 0 : _a[0];
    if (file) handleFile(file);
  };
  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setFileInfos(initialFileInfos);
    if (onFileChange) onFileChange(null);
  };
  return /* @__PURE__ */ jsxs2("div", { className: "p-5 flex justify-center items-center", children: [
    /* @__PURE__ */ jsx2(
      "input",
      {
        ref,
        type: "file",
        onChange: handleInputChange,
        accept: acceptedFileTypes.join(","),
        className: "hidden"
      }
    ),
    /* @__PURE__ */ jsx2(
      motion.div,
      {
        className: `relative rounded-lg border-2 ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} flex justify-center items-center cursor-pointer overflow-hidden transition-all`,
        style: { width: `${width}px`, height: `${height}px` },
        onClick: handleTriggerFile,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children: /* @__PURE__ */ jsx2(AnimatePresence, { children: loading ? /* @__PURE__ */ jsxs2(
          motion.div,
          {
            className: "flex flex-col items-center",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ jsxs2("div", { className: "relative w-16 h-16 flex items-center justify-center", children: [
                /* @__PURE__ */ jsx2(Loading, { progress }),
                /* @__PURE__ */ jsxs2("span", { className: "absolute text-sm font-bold from-green-400/40 to-neutral-900 bg-opacity-70", children: [
                  progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx2("p", { className: "text-gray-500 text-sm mt-2", children: "Uploading..." })
            ]
          }
        ) : !fileInfos.url ? /* @__PURE__ */ jsxs2(
          motion.div,
          {
            className: "flex flex-col items-center justify-center p-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ jsx2(Upload, { size: 48, className: "text-gray-400 mb-2" }),
              /* @__PURE__ */ jsx2(motion.p, { className: "text-gray-500 font-medium text-lg text-center", children: isDragging ? "Drop your file here" : "Click or Drag & Drop to Upload" }),
              /* @__PURE__ */ jsx2("p", { className: "text-gray-400 text-sm mt-2", children: "Supported files: Images, PDF, DOCX, PPT, TXT" })
            ]
          }
        ) : fileInfos.type.startsWith("image") ? /* @__PURE__ */ jsxs2(
          motion.div,
          {
            className: "w-full h-full relative",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ jsx2(
                ImageComponent,
                {
                  src: fileInfos.url,
                  alt: "Uploaded Image",
                  layout: "fill",
                  objectFit: "cover",
                  className: "rounded-lg"
                }
              ),
              /* @__PURE__ */ jsx2(
                motion.button,
                {
                  onClick: handleRemoveFile,
                  className: "absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm",
                  whileHover: { scale: 1.1 },
                  children: /* @__PURE__ */ jsx2(X, { size: 20, className: "text-gray-600" })
                }
              ),
              /* @__PURE__ */ jsxs2("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-b from-green-400/40 to-neutral-900 bg-opacity-70 text-white p-2", children: [
                /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium truncate", children: fileInfos.name }),
                /* @__PURE__ */ jsxs2("p", { className: "text-xs", children: [
                  (fileInfos.size / 1024).toFixed(2),
                  " KB"
                ] })
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxs2(
          motion.div,
          {
            className: "flex flex-col items-center p-5 w-full",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ jsx2(FileText, { size: 48, className: "text-gray-500" }),
              /* @__PURE__ */ jsx2("p", { className: "text-gray-700 font-medium mt-2 text-center", children: fileInfos.name }),
              /* @__PURE__ */ jsxs2("p", { className: "text-gray-500 text-sm", children: [
                (fileInfos.size / 1024).toFixed(2),
                " KB"
              ] }),
              /* @__PURE__ */ jsx2(
                motion.button,
                {
                  onClick: handleRemoveFile,
                  className: "absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm",
                  whileHover: { scale: 1.1 },
                  children: /* @__PURE__ */ jsx2(X, { size: 20, className: "text-gray-600" })
                }
              ),
              /* @__PURE__ */ jsxs2("div", { className: "absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white p-2", children: [
                /* @__PURE__ */ jsx2("p", { className: "text-sm font-medium truncate", children: fileInfos.name }),
                /* @__PURE__ */ jsxs2("p", { className: "text-xs", children: [
                  (fileInfos.size / 1024).toFixed(2),
                  " KB"
                ] })
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
export {
  DragDropX
};
//# sourceMappingURL=index.mjs.map