import * as react_jsx_runtime from 'react/jsx-runtime';

interface FileInfoInterface {
    name: string;
    size: number;
    url: string;
    type: string;
}
interface DragDropXProps {
    width?: number;
    height?: number;
    onFileChange?: (fileInfo: FileInfoInterface | null) => void;
    acceptedFileTypes?: string[];
}
declare function DragDropX({ width, height, onFileChange, acceptedFileTypes }: DragDropXProps): react_jsx_runtime.JSX.Element;

export { DragDropX, type DragDropXProps, type FileInfoInterface };
