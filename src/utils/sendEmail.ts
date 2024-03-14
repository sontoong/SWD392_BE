import nodemailer from 'nodemailer';

const sendEmail = async (options: SendEmailOptions) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // IN CASE OF GMAIL
    // service: 'Gmail',
    // MAILTRAP FOR DEVELOPMENT PURPOSES
    secure: false,
    host: process.env.MAILTRAP_HOST,
    port: 465,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASSWORD
    }
  });
  // 2) Define the email options
  const mailOptions = {
    from: 'Chillaxhson <phhsworkmode@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
