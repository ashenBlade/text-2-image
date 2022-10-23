import DecryptService from "../domain/decryptService";
import {ImageFormat} from "../domain/imageFormat";

export default class BackendDecryptService implements DecryptService {
    constructor(readonly serverUrl: string) {  }
    async decryptAsync(blob: Blob, extension: ImageFormat): Promise<string> {
        const form = new FormData();
        form.append('file', blob);
        form.append('extension', extension);
        const response = await fetch(`${this.serverUrl}/api/image/to/text`, {
            method: 'POST',
            body: form,
            mode: 'cors',
            // credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Could not decrypt image. Returned not success status code')
        }
        return await response.text();
    }
}