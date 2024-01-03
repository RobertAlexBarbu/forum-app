export declare class CryptoService {
    private readonly pbkdf2;
    private readonly iterations;
    private readonly keyLength;
    private readonly digest;
    hash(data: string, salt: string): Promise<string>;
    generateSalt(size: number): string;
}
