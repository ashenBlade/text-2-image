export default interface EncryptorService {
    encryptAsync: (data: string) => Promise<Blob>
}