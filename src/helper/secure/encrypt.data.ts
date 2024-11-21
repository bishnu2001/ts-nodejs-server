import crypto from "crypto";
import { configs } from "../../configs";

export const encryptData = (data: string): string => {
    // const iv = crypto.randomBytes(16); 
    if (!configs.FIXED_IV || !configs.SECRET_KEY) {
        throw new Error("IV or Secret Key is undefined in the configuration");
    }
    const iv = Buffer.from(configs.FIXED_IV, "hex");
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(configs.SECRET_KEY), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    // Return the IV along with the encrypted data
    return iv.toString('hex') + ':' + encrypted;
};
