import CryptoJS from 'crypto-js';

export function encryptMessage(message, password) {
    if (!password) return message;
    return CryptoJS.AES.encrypt(message, password).toString();
}

export function decryptMessage(cipherText, password) {
    try {
        if (!cipherText || !password) {
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(cipherText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        // Check if decryption actually produced valid text
        if (!originalText || originalText.length === 0) {
            return null;
        }

        return originalText;
    } catch (e) {
        console.error('Decryption error:', e);
        return null;
    }
}
