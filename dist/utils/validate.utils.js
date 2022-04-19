"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPassword = exports.isPhone = exports.isGmail = exports.isUsername = void 0;
class ValidateUtils {
}
ValidateUtils.isUsername = (str) => {
    if (!str || typeof str !== 'string')
        return false;
    if (str.length < 4)
        return false;
    if (!/^([a-zA-Z0-9]|\.|-|_|@)+$/.test(str))
        return false;
    return true;
};
ValidateUtils.isGmail = (str) => {
    if (!str || typeof str !== 'string')
        return false;
    if (!/^([a-zA-Z0-9]|\.|-|_)+(@gmail.com)$/.test(str))
        return false;
    return true;
};
ValidateUtils.isPhone = (str) => {
    if (!str || typeof str !== 'string')
        return false;
    if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(str))
        return false;
    return true;
};
ValidateUtils.isPassword = (str) => {
    if (!str || typeof str !== 'string')
        return false;
    if (str.length < 6)
        return false;
    if (/'|"|>|<|\+|=/.test(str))
        return false;
    return true;
};
exports.default = ValidateUtils;
exports.isUsername = ValidateUtils.isUsername, exports.isGmail = ValidateUtils.isGmail, exports.isPhone = ValidateUtils.isPhone, exports.isPassword = ValidateUtils.isPassword;
