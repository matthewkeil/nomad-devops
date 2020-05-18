interface DeleteStackParam {
    StackName: string;
    emptyBuckets?: boolean;
}
export declare const deleteStack: ({ StackName, emptyBuckets }: DeleteStackParam) => Promise<void>;
export {};
