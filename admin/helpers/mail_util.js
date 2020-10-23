
const DepartmentModel = require('../../src/Model/departmentModel');
//const htmlContent = require('../htmlContent/htmlContent');
const nodemailer = require('nodemailer');
const pdf = require('html-pdf');
const uploadsDir = '/home/public_html/uploads';
//content = htmlContent.backPayContent;
module.exports = {
    prepareEmail: async (employeeNum) => {
        const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
        const options = {format: 'letter',orientation: 'portrait'};
        let pdfFile = `Employee_${employeeNum}`;
            // Stripping special characters
            pdfFile = encodeURIComponent(pdfFile) + '.pdf'
            const pdfGen = await pdf.create(content, options).toFile(`${uploadsDir}/pdf/backpay_test/${pdfFile}`);
            if (pdfGen) {
                return;
            }
        },

        transporter: nodemailer.createTransport = {
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
          },

        mailOptions: {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        to: 'joseph.schaeppi@carlsonbuilding.com', // list of receivers
        //cc: dm.email,
        //subject: `Backpay request for ${employeeNum}`, // Subject line
        //text: `${receiver.department} ${message}`, // plain text body
        attachments: {
            //filename: `${pdfFile}`,
            //path: `${uploadsDir}/pdf/backpay_test/${pdfFile}`
        }
    },
}