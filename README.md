# React Drag Drop X

A modern, customizable React component for drag-and-drop file uploads with real-time progress tracking, file preview, and smooth animations.

[![npm version](https://img.shields.io/npm/v/reactdragdropx.svg)](https://www.npmjs.com/package/react-drag-drop-x)
[![license](https://img.shields.io/npm/l/react-drag-drop-x.svg)](https://github.com/yourusername/react-drag-drop-x/blob/main/LICENSE)

![Demo](https://via.placeholder.com/800x400?text=React+Drag+Drop+X+Demo)

## Features

- 🚀 Modern drag-and-drop interface
- 📊 Real-time upload progress indicator
- 🖼️ Image preview for uploaded files
- 📄 Document type recognition
- ✨ Smooth animations powered by Framer Motion
- 📱 Responsive design
- 🔧 Highly customizable
- 📦 Compatible with Next.js
- 🔒 TypeScript support for type safety

## Installation

```bash
# Using npm
npm install dragdropx

# Using yarn
yarn add dragdropx

# Using pnpm
pnpm add dragdropx
```

```jsx
import React from 'react';
import { DragDropX } from 'react-drag-drop-x';

function App() {
  const handleFileChange = (fileInfo) => {
    if (fileInfo) {
      console.log('File uploaded:', fileInfo);
      // Process the file or send it to a server
    } else {
      console.log('File removed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Uploader</h1>
      <DragDropX onFileChange={handleFileChange} />
    </div>
  );
}

export default App;
```
# Next.js Usage
```jsx
import React from 'react';
import { DragDropX } from 'react-drag-drop-x';

export default function UploadPage() {
  const handleFileChange = (fileInfo) => {
    // Handle file upload
    console.log(fileInfo);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Files</h1>
      <DragDropX 
        width={600}
        height={400}
        onFileChange={handleFileChange}
      />
    </div>
  );
}
```

# Customizing Accepted File Types
```jsx
import React from 'react';
import { DragDropX } from 'react-drag-drop-x';

function ImageUploader() {
  return (
    <DragDropX 
      acceptedFileTypes={["image/png", "image/jpeg", "image/gif"]}
      onFileChange={(fileInfo) => console.log(fileInfo)}
      width={500}
      height={300}
    />
  );
}

export default ImageUploader;
```