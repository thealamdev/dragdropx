# React Drag Drop X
A modern, customizable React component for drag-and-drop file uploads with real-time progress tracking, file preview, and smooth animations.
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

### # Using npm
```bash
npm install dragdropx
```

### Using yarn
```bash
yarn add dragdropx
```
## React.js usage
```jsx
import React from 'react';
import { DragDropX } from 'dragdropx';

function App() {
  const handleFileChange = (fileInfo) => {
    if (fileInfo) {
      console.log('File uploaded:', fileInfo);
    } else {
      console.log('File removed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Uploader</h1>
      <DragDropX     
        width={600}
        height={400}
        onFileChange={handleFileChange} />
    </div>
  );
}

export default App;
```
# Next.js Usage
```jsx
import React from 'react';
import { DragDropX } from 'dragdropx';

export default function UploadPage() {
  const handleFileChange = (fileInfo) => {
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
import { DragDropX } from 'dragdropx';

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