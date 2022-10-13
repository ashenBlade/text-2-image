import EncryptService from "../../domain/encryptService";
import DecryptService from "../../domain/decryptService";

export default interface AppProps {
    encryptor: EncryptService,
    decryptor: DecryptService
}