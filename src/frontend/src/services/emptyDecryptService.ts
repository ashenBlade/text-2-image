import DecryptService from "../domain/decryptService";
import {ImageExtension} from "../domain/imageExtension";

export default class EmptyDecryptService implements DecryptService {
    decryptAsync(blob: Blob, extension: ImageExtension): Promise<string> {
        return Promise.resolve("From empty decrypt service");
    }
}