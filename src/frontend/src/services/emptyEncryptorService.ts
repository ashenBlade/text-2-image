import EncryptService from "../domain/encryptService";
import {ImageFormat} from "../domain/imageFormat";

export default class EmptyEncryptorService implements EncryptService {
    encryptAsync(data: string, extension: ImageFormat): Promise<Blob> {
        return Promise.resolve(new Blob([]));
    }

}