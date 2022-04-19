"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertViToEn = exports.decript = exports.encript = exports.randomString = exports.formatNumber = void 0;
class StringUtils {
}
StringUtils.charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
StringUtils.generateCharset = (privateKey, charset) => {
    let tempString = charset || StringUtils.charset;
    let result = '';
    for (let i = 0; i < StringUtils.charset.length; i += 1) {
        const kIndex = i % privateKey.length;
        const charCode = privateKey.charCodeAt(kIndex);
        const tIndex = charCode % tempString.length;
        result = tempString[tIndex] + result;
        tempString = tempString.substring(tIndex + 1) + tempString.substring(0, tIndex);
    }
    return result;
};
StringUtils.randomId = () => {
    const now = new Date().getTime().toString(36);
    return now;
};
StringUtils.randomString = (length, charset) => {
    const characters = charset || StringUtils.charset;
    let result = '';
    for (let i = 0; i < length; i += 1) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
};
StringUtils.encript = (rootString, privateKey) => {
    const hash = StringUtils.generateCharset(privateKey);
    let result = '';
    for (let i = 0; i < rootString.length; i += 1) {
        const index = StringUtils.charset.indexOf(rootString[i]);
        if (index === -1) {
            result += rootString[i];
        }
        else {
            result += hash[index];
        }
    }
    return result;
};
StringUtils.decript = (cipherText, privateKey) => {
    const hash = StringUtils.generateCharset(privateKey);
    let result = '';
    for (let i = 0; i < cipherText.length; i += 1) {
        const index = hash.indexOf(cipherText[i]);
        if (index === -1) {
            result += cipherText[i];
        }
        else {
            result += StringUtils.charset[index];
        }
    }
    return result;
};
StringUtils.convertViToEn = (root) => root
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
StringUtils.formatNumber = (number, fixed = 3, part = 3, sec = ',', dec = '.') => {
    const regex = '\\d(?=(\\d{' + part + '})+' + (fixed > 0 ? '\\D' : '$') + ')';
    return number
        .toFixed(fixed)
        .replace('.', dec)
        .replace(new RegExp(regex, 'g'), '$&' + sec);
};
exports.default = StringUtils;
exports.formatNumber = StringUtils.formatNumber;
exports.randomString = StringUtils.randomString;
exports.encript = StringUtils.encript;
exports.decript = StringUtils.decript;
exports.convertViToEn = StringUtils.convertViToEn;
