"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DragDropX: () => DragDropX
});
module.exports = __toCommonJS(index_exports);

// src/components/DragDropX.tsx
var import_react = require("react");
var import_lucide_react = require("lucide-react");
var import_framer_motion = require("framer-motion");

// src/components/svg/Loading.tsx
var import_jsx_runtime = require("react/jsx-runtime");
function Loading({ progress }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "w-16 h-16", viewBox: "0 0 36 36", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", { id: "progressGradient", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "0%", stopColor: "#10B981" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", { offset: "100%", stopColor: "#1F2937" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "text-gray-300", strokeWidth: "3", stroke: "currentColor", fill: "transparent", r: "16", cx: "18", cy: "18" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
var import_jsx_runtime2 = require("react/jsx-runtime");
var ImageComponent;
try {
  ImageComponent = require("next/image").default;
} catch (e) {
  ImageComponent = ({ src, alt, layout, objectFit, className }) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
  const [fileInfos, setFileInfos] = (0, import_react.useState)(initialFileInfos);
  const [isDragging, setIsDragging] = (0, import_react.useState)(false);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const [progress, setProgress] = (0, import_react.useState)(0);
  const ref = (0, import_react.useRef)(null);
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "p-5 flex justify-center items-center", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "input",
      {
        ref,
        type: "file",
        onChange: handleInputChange,
        accept: acceptedFileTypes.join(","),
        className: "hidden"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      import_framer_motion.motion.div,
      {
        className: `relative rounded-lg border-2 ${isDragging ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"} flex justify-center items-center cursor-pointer overflow-hidden transition-all`,
        style: { width: `${width}px`, height: `${height}px` },
        onClick: handleTriggerFile,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_framer_motion.AnimatePresence, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          import_framer_motion.motion.div,
          {
            className: "flex flex-col items-center",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative w-16 h-16 flex items-center justify-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Loading, { progress }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "absolute text-sm font-bold from-green-400/40 to-neutral-900 bg-opacity-70", children: [
                  progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-gray-500 text-sm mt-2", children: "Uploading..." })
            ]
          }
        ) : !fileInfos.url ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          import_framer_motion.motion.div,
          {
            className: "flex flex-col items-center justify-center p-4",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.Upload, { size: 48, className: "text-gray-400 mb-2" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_framer_motion.motion.p, { className: "text-gray-500 font-medium text-lg text-center", children: isDragging ? "Drop your file here" : "Click or Drag & Drop to Upload" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-gray-400 text-sm mt-2", children: "Supported files: Images, PDF, DOCX, PPT, TXT" })
            ]
          }
        ) : fileInfos.type.startsWith("image") ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          import_framer_motion.motion.div,
          {
            className: "w-full h-full relative",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                ImageComponent,
                {
                  src: fileInfos.url,
                  alt: "Uploaded Image",
                  layout: "fill",
                  objectFit: "cover",
                  className: "rounded-lg"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_framer_motion.motion.button,
                {
                  onClick: handleRemoveFile,
                  className: "absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm",
                  whileHover: { scale: 1.1 },
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.X, { size: 20, className: "text-gray-600" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "absolute bottom-0 left-0 right-0 bg-gradient-to-b from-green-400/40 to-neutral-900 bg-opacity-70 text-white p-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm font-medium truncate", children: fileInfos.name }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-xs", children: [
                  (fileInfos.size / 1024).toFixed(2),
                  " KB"
                ] })
              ] })
            ]
          }
        ) : /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          import_framer_motion.motion.div,
          {
            className: "flex flex-col items-center p-5 w-full",
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.FileText, { size: 48, className: "text-gray-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-gray-700 font-medium mt-2 text-center", children: fileInfos.name }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-gray-500 text-sm", children: [
                (fileInfos.size / 1024).toFixed(2),
                " KB"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                import_framer_motion.motion.button,
                {
                  onClick: handleRemoveFile,
                  className: "absolute top-2 right-2 p-1 rounded-full bg-white hover:bg-gray-100 transition-colors shadow-sm",
                  whileHover: { scale: 1.1 },
                  children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_lucide_react.X, { size: 20, className: "text-gray-600" })
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "absolute bottom-0 left-0 right-0 bg-green-500 bg-opacity-70 text-white p-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm font-medium truncate", children: fileInfos.name }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-xs", children: [
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragDropX
});
//# sourceMappingURL=index.js.map