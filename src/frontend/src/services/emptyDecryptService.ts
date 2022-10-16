import DecryptService from "../domain/decryptService";
import {ImageExtension} from "../domain/imageExtension";

export default class EmptyDecryptService implements DecryptService {
    decryptAsync(blob: Blob, extension: ImageExtension): Promise<string> {
        return Promise.resolve("From empty decrypt serviceasdfasfasdfasdfasdfasdfsadfd  sdsfd ffefe dfd" +
            "asdfasdf sdfawefawefawef  smf efgerg rgrhrdt regfefef export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService" +
            "export default class EmptyDecryptService implements DecryptService");
    }
}