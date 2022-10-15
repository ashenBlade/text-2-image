import {ImageExtension} from "./imageExtension";

export default interface DecryptService {
    decryptAsync(blob: Blob, extension: ImageExtension): Promise<string>
}