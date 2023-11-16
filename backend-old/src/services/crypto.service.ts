import util from "util";
import crypto from "crypto";

export class CryptoService {
    private static readonly pbkdf2 = util.promisify(crypto.pbkdf2);
    private static readonly iterations = 10000;
    private static readonly keyLength = 32;
    private static readonly digest = 'sha512';

    static async hash(data: string, salt: string) {
        const dataHashBuffer = await this.pbkdf2(
            data,
            salt,
            this.iterations,
            this.keyLength,
            this.digest);
        return dataHashBuffer.toString('hex');
    }

    static generateSalt(size: number): string {
        return crypto.randomBytes(size).toString('hex');
    }
}