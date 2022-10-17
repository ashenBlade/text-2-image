import EncryptService from "../domain/encryptService";
import {ImageExtension} from "../domain/imageExtension";

export default class BackendEncryptorService implements EncryptService {
    constructor(readonly serverUrl: string) {  }

    async encryptAsync(data: string, extension: ImageExtension): Promise<Blob> {
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