import { Transporter } from 'nodemailer';
import * as nodemailer from 'nodemailer';
import mailConfig from '../../config/mail';
import ISendMail from '../../interfaces/ISendMail';

interface MailProps {
  to: string;
  subject: string;
  body: string;
}

class Mail implements ISendMail {
  private client: Transporter;
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    let transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user: auth.user,
        pass: auth.pass,
      },
    });

    this.client = transporter;
  }

  public async sendMail({ to, subject, body }: MailProps): Promise<void> {
    const response = await this.client.sendMail({
      from: mailConfig.default.from,
      to,
      subject,
      text: body,
    });
  }
}

export default Mail;
