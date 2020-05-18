import { S3 } from "aws-sdk";
interface WalkDirectoryProps {
    path: string;
    keyBase: string;
    Bucket: string;
    uploadPromises: Promise<S3.ManagedUpload.SendData>[];
}
export declare const walkDirectory: ({ path, keyBase, Bucket, uploadPromises }: WalkDirectoryProps) => Promise<void>;
export {};
