import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

export class NodemailerMaiLAdapter implements MailAdapter {

  transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  async sendMail({subject, body}: SendMailData) {

    await this.transport.sendMail({
      from: "Feedback Widget team <contact@widback.com>",
      to: "Artur Moreira <arturacm@gmail.com>",
      subject,
      html: body
    });
  }
}
