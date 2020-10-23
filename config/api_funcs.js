const nodemailer = require('nodemailer');
const host = process.env.host;
const port = process.env.emailPort;
const authUser = process.env.authUser;
const authPass = process.env.authPass;
const rejectUnauthorized = process.env.rejectUnauthorized;
module.exports = {
    date: function() {
        let date_ob = new Date();
        // current date
        // adjust 0 before single digit date
        let day = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        return date = `${month}-${day}-${year}`; 
    },
    uploadsDir: function() {
        return "/home/cbmportal/public_html/uploads/";
    },
    baseSite: function() {
        return "https://cbmportal.com/uploads/";
    },
    pdfOptions: function() {
        format = 'letter',
        orientation = 'portrait'
      },

    transporter: 
        nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
              user: authUser,
              pass: authPass,
            },
            tls: {
                rejectUnauthorized: rejectUnauthorized,
            }
          })
}