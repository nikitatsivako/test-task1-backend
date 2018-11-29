import jwt from 'jsonwebtoken';
const JWTSecret = 'f4vb8FJu9hE9XeasszY5awQU/E2OEZ';
const expirationPeriod = '30d';

export function getJWToken(data, expiresIn = expirationPeriod) {
    return jwt.sign(
        data,
        JWTSecret,
        { expiresIn },
    );
}

export function decodeJWToken(token) {
    return jwt.verify(token, JWTSecret);
}

export function verifyJWToken(token) {
    return new Promise((res) => {
        const result = jwt.verify(token, JWTSecret);
        res(!!result);
    }).catch(() => false);
}

export function extractIdFromToken(token) {
    return new Promise(res => {
        const decodedData = decodeJWToken(token);
        res(decodedData.id);
    });
}

export function getTokenForUser(user) {
    const data = {};
    data.email = user.email;
    data.id = user.id;

    return jwt.sign(data, JWTSecret);
}
