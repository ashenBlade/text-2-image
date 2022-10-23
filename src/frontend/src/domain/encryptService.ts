import {ImageFormat} from "./imageFormat";

export default interface EncryptService {
    encryptAsync(data: string, extension: ImageFormat): Promise<Blob>
}