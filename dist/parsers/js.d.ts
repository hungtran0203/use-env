export declare const match: (fileName: string) => boolean;
export declare const parse: (fileContent: string, { filePath }: {
    filePath: string;
}) => Promise<any>;
