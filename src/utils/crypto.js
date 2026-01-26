import CryptoJS from 'crypto-js';

export function encryptMessage(message, password) {
    if (!password) return message;
    return CryptoJS.AES.encrypt(message, password).toString();
}

export function decryptMessage(cipherText, password) {
    try {
        const bytes = CryptoJS.AES.decrypt(cipherText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText || null;
    } catch (e) {
        return null; // Decryption failed
    }
}
