import {ImageExtension} from "./imageExtension";

export default interface EncryptService {
    encryptAsync(data: string, extension: ImageExtension): Promise<Blob>
}