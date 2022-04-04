class ValidateUtils {
    public static isUsername = (str: string): boolean => {
        if (!str || typeof str !== 'string') return false
        if (str.length < 4) return false
        if (!/^([a-zA-Z0-9]|\.|-|_|@)+$/.test(str)) return false
        return true
    }

    public static isGmail = (str: string): boolean => {
        if (!str || typeof str !== 'string') return false
        if (!/^([a-zA-Z0-9]|\.|-|_)+(@gmail.com)$/.test(str)) return false
        return true
    }

    public static isPhone = (str: string): boolean => {
        if (!str || typeof str !== 'string') return false
        if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(str)) return false
        return true
    }

    public static isPassword = (str: string): boolean => {
        if (!str || typeof str !== 'string') return false
        if (str.length < 6) return false
        if (/'|"|>|<|\+|=/.test(str)) return false
        return true
    }
}

export default ValidateUtils
export const { isUsername } = ValidateUtils
export const { isGmail } = ValidateUtils
export const { isPhone } = ValidateUtils
export const { isPassword } = ValidateUtils
