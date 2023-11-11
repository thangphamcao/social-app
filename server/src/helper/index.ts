import * as crypto from 'crypto-js';
import Base64 from 'crypto-js/enc-base64';
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'VictorPham-Social-App';

export const random = crypto.lib.WordArray.random(128 / 8).toString(Base64);

export const authentication = (salt: string, password: string) => {
    return crypto.algo.HMAC.create(crypto.algo.SHA256, salt + password)
        .update(SECRET_KEY)
        .finalize()
        .toString(Base64);
};

export const createToken = (_id: any, privateKey: string, type?: string) => {
    const accessToken = jwt.sign({ id: _id }, privateKey, {
        expiresIn: type === 'refreshToken' ? '4h' : '30m',
    });
    return accessToken;
};
