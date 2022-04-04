import nodemailer, { Transporter } from 'nodemailer'
import Env from './env.config'

export default class MailerConfig {
    public static transporter: Transporter

    public static async initialize() {
        MailerConfig.transporter = nodemailer.createTransport({
            service: Env.email.service,
            auth: {
                user: Env.email.username,
                pass: Env.email.password,
            },
        })
        await MailerConfig.transporter.verify()
    }
}
