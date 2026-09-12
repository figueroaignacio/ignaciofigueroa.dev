export interface UploadedObject {
  bucket: string;
  path: string;
  url: string;
}

export interface StoragePort {
  upload(path: string, body: Buffer, contentType: string): Promise<UploadedObject>;
  remove(path: string): Promise<void>;
}

export const STORAGE = Symbol('STORAGE');
