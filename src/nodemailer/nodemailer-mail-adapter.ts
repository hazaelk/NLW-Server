import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../adapters/mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "28291c0a437c8e",
    pass: "83e22dadad2c9e"
  }
});

export class NodemailerMailAdapter implements MailAdapter{
 async sendMail({ subject, body }: SendMailData) {
     await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Willian Santana <will10102011@gmail.com>',
      subject: 'Novo feedback',
      html: body,
  });
 }
}