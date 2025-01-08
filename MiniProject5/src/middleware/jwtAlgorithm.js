const crypto = require('crypto');

// Base64url encoding and decoding functions
function base64urlEncode(string) {
    return Buffer.from(string, 'utf8').toString('base64url');
}

function base64urlDecode(string) {
    return Buffer.from(string, 'base64url').toString('utf8');
}

// JWT encoding function
function jwtEncode(header, payload, secret) {
    const encodedHeader = base64urlEncode(JSON.stringify(header));
    const encodedPayload = base64urlEncode(JSON.stringify(payload));
    const signature = crypto.createHmac('sha256', secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64url');
    return `${encodedHeader}.${encodedPayload}.${signature}`;
}

// JWT signing function
exports.sign = (user, secret) => {
    const header = {
        alg: 'HS256',
        typ: 'JWT'
    };
    const payload = {
        id: user.id,
        username: user.username,
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour expiration
    };
    return jwtEncode(header, payload, secret);
}

// JWT verification function
exports.verify = (token, secret) => {
    const [encodedHeader, encodedPayload, signature] = token.split('.');
    const expectedSignature = crypto.createHmac('sha256', secret)
        .update(`${encodedHeader}.${encodedPayload}`)
        .digest('base64url');
    if (signature !== expectedSignature) {
        throw new Error('Invalid token');
    }
    return JSON.parse(base64urlDecode(encodedPayload));
}

exports.generateToken = (user, secret) => {
    return exports.sign(user, secret);
}