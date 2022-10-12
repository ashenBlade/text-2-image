import EncryptorService from "../domain/encryptorService";
import {ImageExtension} from "../domain/imageExtension";

export default class EmptyEncryptorService implements EncryptorService {
    encryptAsync(data: string, extension: ImageExtension): Promise<Blob> {
        return Promise.resolve(new Blob([]));
    }

}