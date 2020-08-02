const nodemailer = require('nodemailer');
let receiver = '';
let subject = '';
let message = '';
let pdfFile = '';
let transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "cbmmailer@carlsonbuilding.com",
      pass: "IT5upp0rt"
    },
    tls: {
        rejectUnauthorized: false
    }
  });

module.exports = {
    receiver: receiver,
    message: message, 
    subject: subject, 
    pdfFile: pdfFile,
    transporter: transporter
}