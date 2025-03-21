import * as react_jsx_runtime from 'react/jsx-runtime';

interface IncomingInterface {
    name?: string;
    width?: number;
    height?: number;
    multiple?: boolean;
    accept?: string[];
    response?: string;
    onFileChange?: (fileData: string[] | FileList | null) => void;
}
declare function DragDropX({ name, width, height, multiple, accept, response, onFileChange }: IncomingInterface): react_jsx_runtime.JSX.Element;

export { DragDropX };
