import EncryptorService from "../abstractions/encryptorService";

export default class BackendEncryptorService implements EncryptorService {
    constructor(readonly serverUrl: string) {  }

    async encryptAsync(data: string): Promise<Blob> {
        const formData = new FormData();
        formData.set('text', data)
        const result = await fetch(`${this.serverUrl}/api/text/to/image`, {
            method: 'POST',
            body: formData
        });
        return await result.blob();
    }

}