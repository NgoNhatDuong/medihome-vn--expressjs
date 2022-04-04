import fs from 'fs'
import path from 'path'
import TimeUtils from './time.utils'

interface LoggerOption {
    folder?: string
    filePattern?: string
    timePattern?: string
    hasConsole?: boolean
    hasFile?: boolean
}

class LoggerUtils {
    private folder = 'logs'

    private filePath = ''

    private filePattern = 'YYYY-MM/YYYY-MM-DD'

    private timePattern = 'YYYY-MM-DD hh:mm:ss'

    private hasConsole = true

    private hasFile = true

    private writeStream: fs.WriteStream

    public readonly color = {
        reset: '\x1b[0m',
        bold: '\x1b[1m',
        italic: '\x1b[3m',
        under: '\x1b[4m',

        black: '\x1b[30m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',

        bgBlack: '\x1b[40m',
        bgRed: '\x1b[41m',
        bgGreen: '\x1b[42m',
        bgYellow: '\x1b[43m',
        bgBlue: '\x1b[44m',
        bgMagenta: '\x1b[45m',
        bgCyan: '\x1b[46m',
        bgWhite: '\x1b[47m',
    }

    public config = (options: LoggerOption) => {
        if ('folder' in options) this.folder = options.folder
        if ('filePattern' in options) this.filePattern = options.filePattern
        if ('timePattern' in options) this.timePattern = options.timePattern
        if ('hasConsole' in options) this.hasConsole = options.hasConsole
        if ('hasFile' in options) this.hasFile = options.hasFile
    }

    public info = (message: any): void => this.init(message, 'info')

    public warn = (message: any): void => this.init(message, 'warn')

    public error = (message: any): void => this.init(message, 'error')

    public fatal = (message: any): void => this.init(message, 'fatal')

    private init = (message: any, type: 'info' | 'warn' | 'error' | 'fatal'): void => {
        const time = TimeUtils.timeToText(new Date(), this.timePattern)
        const { bold, reset } = this.color

        let color: string
        if (type === 'info') color = this.color.green
        if (type === 'warn') color = this.color.yellow
        if (type === 'error') color = this.color.red
        if (type === 'fatal') color = this.color.magenta

        if (this.hasConsole) {
            const labelColor = `${color}[${time}] ${bold}[${type.toUpperCase()}]:${reset}`
            console[type](labelColor, message)
        }
        if (this.hasFile) {
            const labelBasic = `[${time}] [${type.toUpperCase()}]:`
            this.writeFile(labelBasic, message)
        }
    }

    private writeFile = (info: string, message: string): void => {
        const fileCurrent = TimeUtils.timeToText(new Date(), this.filePattern) + '.log'
        const filePath = path.resolve(this.folder, fileCurrent)
        const data = `${info} ${message}\n`

        if (this.filePath !== filePath) {
            const fileDir = path.dirname(filePath)
            if (!fs.existsSync(fileDir)) {
                fs.mkdirSync(fileDir, { recursive: true })
            }
            this.filePath = filePath
            // flag a: Open file for appending. The file is created if it does not exist
            this.writeStream = fs.createWriteStream(this.filePath, { flags: 'a' })
        }

        this.writeStream.write(data)
    }
}

const Logger = new LoggerUtils()
export default Logger
