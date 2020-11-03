
const DepartmentModel = require('../../src/Model/departmentModel');
//const htmlContent = require('../htmlContent/htmlContent');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const uploadsDir = '/home/public_html/uploads';
//content = htmlContent.backPayContent;
module.exports = {
    prepareEmail: async (form, content) => {
        form = form.charAt(0).toUpperCase() + form.substring(1);
        console.log(form);
        const options = {format: 'letter',orientation: 'portrait'};
        let pdfFile = `${form}_Reprint`;
            // Stripping special characters
            pdfFile = encodeURIComponent(pdfFile) + '.pdf'
            pdf.create(content, options).toBuffer( (err, result ) => {
                if (err) {
                    console.log(err);
                }
                return Buffer.isBuffer(result);
            });
        },

    transporter: nodemailer.createTransport = {
        host: process.env.host,
        port: process.env.emailPort,
        secure: false,
        auth: {
            user: process.env.authUser,
            pass: process.env.authPass,
        },
        tls: {
            rejectUnauthorized: process.env.rejectUnauthorized
        }
        },

    mailOptions: function(dm='', form, receiver, content) {
        const message = `This is a reprint of ${form} form `;
        return {
            from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
            to: receiver.email, // list of receivers
            //cc: dm.email,
            subject: `${form} Reprint`, // Subject line
            html: `${receiver.department} ${message}<br /> ${content}`, // plain text body
        }
    },
}