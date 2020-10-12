const nodemailer = require('nodemailer');
let receiver = '';
let subject = '';
let message = '';
let pdfFile = '';
console.log(process.env['host'])
console.log(process.env.port)
console.log(process.env['authUser'])
console.log(process.env['authPass'])
console.log(process.env.secure)
console.log(process.env.rejectUnauthorized)
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