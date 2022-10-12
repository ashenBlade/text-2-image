import {ImageExtension} from "./imageExtension";

export default interface EncryptorService {
    encryptAsync: (data: string, extension: ImageExtension) => Promise<Blob>
}