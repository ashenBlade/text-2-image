import EncryptService from "../domain/encryptService";
import {ImageExtension} from "../domain/imageExtension";

export default class EmptyEncryptorService implements EncryptService {
    encryptAsync(data: string, extension: ImageExtension): Promise<Blob> {
        return Promise.resolve(new Blob([]));
    }

}