import nodemailer from "nodemailer";

import * as handlebars from "handlebars";

import { templa } from "./templates/email"; 


export async function sendMail({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    const testResult = await transport.verify();
    console.log(testResult);
  } catch (error) {
    console.error({ error });
    return;
  }

  try {
    const sendResult = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log(sendResult);
  } catch (error) {
    console.log(error);
  }
}


export function compileWelcomeTemplate(from_name: string, to_name: string, url: string, subject: string, message: string, from_email: string, mobile: string) {
  const template = handlebars.compile(templa);
  const htmlBody = template({
    from_name: from_name,
    to_name: to_name,
    subject: subject,
    message: message,
    from_email: from_email,
    mobile: mobile,
    url: url,
  });
  return htmlBody;
}