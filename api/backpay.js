const express = require('express');
const moment = require('moment');
const backpayRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
let Backpay = require('../src/Model/backpayModel');
let DepartmentModel = require('../src/Model/departmentModel');
backpayRouter.use(bodyParser.json());
backpayRouter.use(bodyParser.urlencoded({extended: false}));

const date = apiFunc.date();
const baseSite = apiFunc.baseSite();
const uploadsDir = apiFunc.uploadsDir();

backpayRouter.post('/', async (req, res) => {
    const { dm, employeeNum, employeeName, sig } = req.body[0];
    let { comments } = req.body[0];
    let backpayInfo = []; 
    let total = 0;
    let shift = 0;
    let breakTime = 0;
    let base64String = sig;
    comments = await translator(comments, {to: 'en', from: 'es'});
    
    // Remove header
    let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');

    let base64Image = new Buffer.from(base64Data, 'base64');
    const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
    
    await fsPromises.mkdir(`${uploadsDir}signatures/backPaySig/${employeeNum}`, { recursive: true });
    console.log(`Folder ${employeeNum} Created`);
    await fsPromises.writeFile(`${uploadsDir}signatures/backPaySig/${employeeNum}/${date}.png`, base64Image);
        //Generating Bonuse Rows
 
    req.body.forEach( (item,i) => {
        if ((!item.return_lunch) || (!item.left_lunch)) {
            item.return_lunch = 0;
            item.left_lunch = 0;
            shift = moment(item.out).diff(item.in, 'minutes');
            breakTime = 0;
            total = (shift-breakTime)/60;
            backpayInfo.push('<tr>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + moment(item.in).format('lll') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;"> No Time </td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;"> No Time </td>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + moment(item.out).format('lll') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">' + total + 'hrs</td>' +
            '</tr>');
        } else {
            shift = moment(item.out).diff(item.in, 'minutes');
            breakTime = moment(item.return_lunch).diff(item.left_lunch, 'minutes');
            total = (shift-breakTime)/60;
            backpayInfo.push('<tr>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + moment(item.in).format('lll') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">' + moment(item.left_lunch).format('lll') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">' + moment(item.return_lunch).format('lll') + '</td>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + moment(item.out).format('lll') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">' + total + 'hrs</td>' +
            '</tr>');
        }
                
})
    //PDF Generation
    let pdfFile = `Employee_${employeeNum}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'
    let content = HTML.backPayHtml(employeeName, employeeNum, backpayInfo, comments, dm.userFirst, dm.userLast, date, baseSite);

    message = 'Please process this backpay request.';
    //Create PDF
    pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/backpay/${pdfFile}`, function(err, res) {
      if (err) {
      return console.log(err);
      }
   });


   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: `Backpay request for ${employeeNum}`, // Subject line
    text: `${receiver.department} ${message}`, // plain text body
    attachments: {
        filename: `${pdfFile}`,
        path: `${uploadsDir}pdf/backpay/${pdfFile}`
    },
};
    try { 
        apiFunc.transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            console.log(err)
        } else {
        }
    });
    
    } catch(err) {
    console.log(err);
    }

    //DB insertions
    let form = new Backpay();
        form.employeeName = employeeName;
        form.employeeNum = employeeNum;
        form.dm = dm.fullName;
        backpayInfo.forEach((item, i) => {
            form.backpay.push(item);
        })
        form.comments = comments;
        form.date = date;
        form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = backpayRouter;