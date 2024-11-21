import crypto from "crypto";
import { configs } from "../../configs";

export const decryptObject = (encryptedObject: any): any => {
    const decryptedObject: any = {};
    if (Array.isArray(encryptedObject)) {
        // If it's an array, decrypt each element
        return encryptedObject.map(item => decryptObject(item));
    }

    // Loop through each property of the encrypted object
    for (const [key, value] of Object.entries(encryptedObject)) {
        // Only decrypt fields that need decryption (e.g., email, username)
        if (typeof value === 'string' && value.includes(':') && key !== 'password') {
            // If it's a string and contains an IV (e.g., "iv:encryptedData"), decrypt it
            decryptedObject[key] = decryptData(value);
        } else {
            // If it's not encrypted or it's a non-encrypted field, just assign the value
            decryptedObject[key] = value;
        }
    }
    return decryptedObject;
};


export const decryptData = (encryptedData: any): any => {
    const [ivHex, encryptedText] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(configs.SECRET_KEY), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};
