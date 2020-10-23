const nodemailer = require('nodemailer');
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
    transporter: transporter
}