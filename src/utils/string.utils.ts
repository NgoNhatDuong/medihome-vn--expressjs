class StringUtils {
    public static readonly charset: string =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    public static generateCharset = (privateKey: string, charset?: string): string => {
        let tempString = charset || StringUtils.charset
        let result = ''
        for (let i = 0; i < StringUtils.charset.length; i += 1) {
            const kIndex = i % privateKey.length
            const charCode = privateKey.charCodeAt(kIndex)
            const tIndex = charCode % tempString.length

            result = tempString[tIndex] + result
            tempString = tempString.substring(tIndex + 1) + tempString.substring(0, tIndex)
        }
        return result
    }

    public static randomId = (): string => {
        const now = new Date().getTime().toString(36) // l0u2ifgu - ... - ... - todo
        return now
    }

    public static randomString = (length: number, charset?: string): string => {
        const characters = charset || StringUtils.charset
        let result = ''
        for (let i = 0; i < length; i += 1) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result
    }

    public static encript = (rootString: string, privateKey: string): string => {
        const hash = StringUtils.generateCharset(privateKey)
        let result = ''
        for (let i = 0; i < rootString.length; i += 1) {
            const index = StringUtils.charset.indexOf(rootString[i])
            if (index === -1) {
                result += rootString[i]
            } else {
                result += hash[index]
            }
        }
        return result
    }

    public static decript = (cipherText: string, privateKey: string): string => {
        const hash = StringUtils.generateCharset(privateKey)
        let result = ''
        for (let i = 0; i < cipherText.length; i += 1) {
            const index = hash.indexOf(cipherText[i])
            if (index === -1) {
                result += cipherText[i]
            } else {
                result += StringUtils.charset[index]
            }
        }
        return result
    }

    public static convertViToEn = (root: string): string =>
        root
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')

    public static formatNumber = (number: number, fixed = 3, part = 3, sec = ',', dec = '.') => {
        const regex = '\\d(?=(\\d{' + part + '})+' + (fixed > 0 ? '\\D' : '$') + ')'
        return number
            .toFixed(fixed)
            .replace('.', dec)
            .replace(new RegExp(regex, 'g'), '$&' + sec)
    }
}

export default StringUtils
export const { formatNumber } = StringUtils
export const { randomString } = StringUtils
export const { encript } = StringUtils
export const { decript } = StringUtils
export const { convertViToEn } = StringUtils
