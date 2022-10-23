import EncryptService from "../domain/encryptService";
import {ImageFormat} from "../domain/imageFormat";

export default class BackendEncryptorService implements EncryptService {
    constructor(readonly serverUrl: string) {  }

    async encryptAsync(data: string, extension: ImageFormat): Promise<Blob> {
        const formData = new FormData();
        formData.set('text', data);
        formData.set('image_extension', extension);
        const result = await fetch(`${this.serverUrl}/api/text/to/image`, {
            method: 'POST',
            body: formData
        });
        return await result.blob();
    }
}