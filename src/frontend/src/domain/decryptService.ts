import {ImageFormat} from "./imageFormat";

export default interface DecryptService {
    decryptAsync(blob: Blob, extension: ImageFormat): Promise<string>
}