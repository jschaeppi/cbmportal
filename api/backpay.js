const express = require('express');
const moment = require('moment');
const backpayRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let Backpay = require('../src/Model/backpayModel');
let Store = require('../src/Model/Stores');
backpayRouter.use(bodyParser.json());
backpayRouter.use(bodyParser.urlencoded({extended: false}));

let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

backpayRouter.get('/', (req, res) => {
    Store.find()
    .then(stores => res.json(stores));
    
});

backpayRouter.post('/', (req, res) => {
    let rows = [];
    let backpayInfo = [];
    let total = 0;
    let shift = 0;
    let breakTime = 0;
    let base64String = req.body[0].sig;
    // Remove header
    var base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    let base64Image = new Buffer.from(base64Data, 'base64');
    fs.mkdir(`../../uploads/signatures/backPaySig/${req.body[0].employeeNum}`, (err, result) => {
        if (err) {
            console.log(err);
        } else if(result) {
        console.log('Folder created successfully!');
    }
    })
    fs.writeFile(`../../uploads/signatures/backPaySig/${req.body[0].employeeNum}/${month}-${date}-${year}$.png`, base64Image, (err, result) => {
      if (err) {
        console.log(err);
      } else if (result) {
      console.log('File succeeded.');
      }
    });
        //Generating Bonuse Rows
        const d = new Date();
        req.body.forEach( (item,i) => {
                rows = [];
                rows.push(item.in);
                rows.push(item.left_lunch);
                rows.push(item.return_lunch);
                rows.push(item.out);
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
})
    let pdfFile = `Employee_${req.body[0].employeeNum}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'
    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    //res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    //res.setHeader('Content-type', 'application/pdf')
    let content = `<html>
    <head>
    <style>
    .EEsignature img{
    width:150px; vertical-align: text-bottom;
    }
    .DMOSsign img{
    width:150px;vertical-align:bottom;
    }
    html {
        zoom: .55;
    }
    </style>
    </head>
    <body>
    <table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr>
    <td><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="336" height="102" /></td>
    <td style="text-align: right; font-weight: bold; font-size: 330%;">Carlson Building Maintenance</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 140%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 140%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;">Back Pay Form</td>
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;text-align:right">&nbsp;${month}/${date}/${year}</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: #25354c;">
    <td style="height: 29px; font-weight: bold; font-size: 110%;">Back Pay Details</td>
    </tr>
    </tbody>
    </table>
    <table align="center" style="width: 600px;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 100px; padding: 1px;">Employee Number: </td>
    <td style="width: 100px; padding: 1px; text-decoration: underline;">${req.body[0].employeeNum}</td>
    <td style="width: 50px; padding: 1px;">Employee Name:</td>
    <td style="width: 200px; padding: 1px; text-decoration:underline;">${req.body[0].employeeName}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="4">&nbsp;</td>
    
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="4">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-size:24px; font-weight:bold" colspan="5">Missed Pay (to be added through the employee's next generated check):</td>
    </tr>
    <tr>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">In:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Left for Lunch: </th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Returned from lunch: </th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Out:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Total Hours:</th>
    </tr>
    ${backpayInfo.join().replace(/,/g," ")}
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <th style=" padding: 1px; text-align:left;" colspan="5">Reason this pay was missed:</th>
    </tr>
    <tr>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px;" colspan="5">${req.body[0].comments}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; font-weight:bold;" colspan="5">**Signature/Approval - Please make sure to sign and print your name before turning in this form.</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr style="height: 50px; vertical-align: bottom;">
    <td style=" width: 150px; padding: 1px;">Manager:</td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${req.body[0].employeeName}</td>
    <td style=" width: 150px; height: 20px; border-bottom: border: 1px solid black; padding: 1px; vertical-align:bottom">
    <div class="DMOSsign"><img src="http://portal.cbmportal.com/uploads/signatures/backPaySig/${req.body[0].employeeNum}/${month}-${date}-${year}.png"></img></div>
    </td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${month}/${date}/${year}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Print</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Sign</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Date</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; font-weight:bold;" colspan="5">*Please Return this Completed form to the Payroll Department</td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`;

  receiver = 'joseph.schaeppi@carlsonbuilding.com';
  message = 'Please process this backpay request.';
  //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/backpay/${pdfFile}`, function(err, res) {
      if (err) {
      return console.log(err);
      }
   });


   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver, // list of receivers
    subject: `Backpay request for ${req.body[0].employeeNum}`, // Subject line
    text: message, // plain text body
    attachments: {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/backpay/${pdfFile}`
    },
};
    try { 
        transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            console.log(err)
        } else {
        }
    });
    
    } catch(err) {
    console.log(err);
    }
    //const bonusRow = []

    //Prep for DB insertions
    /*for (let key in req.body) {
        if (req.body[key].bonus && req.body[key].date && req.body[key].location ) {
            bonusRow.push(req.body[key].bonus)
            bonusRow.push(req.body[key].date)
            bonusRow.push(req.body[key].location)
}
    }*/

    //DB insertions
    let form = new Backpay();
        form.employeeName = req.body[0].employeeName;
        form.employeeNum = req.body[0].employeeNum;
        form.dm = req.body[0].dm;
    backpayInfo.forEach((item, i) => {
        form.backpay.push(item);
    })
        form.comments = req.body[0].comments;
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