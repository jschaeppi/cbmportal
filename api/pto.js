const express = require('express');
const ptoRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const pdf = require('html-pdf');
const fs = require('fs');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
const PTO = require('../src/Model/ptoModel');
let DepartmentModel = require('../src/Model/departmentModel');

ptoRouter.use(bodyParser.json());
ptoRouter.use(bodyParser.urlencoded({ extended: false }));

// current date
let date_ob = new Date();

// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();


ptoRouter.post('/', async (req, res) => {
    const { employeeName, employeeNum, dm, departments, hours, approval, comments } = req.body;
    const absencefrom = moment(req.body.absencefrom).format('L');
    const absenceto = moment(req.body.absenceto).format('L');

    const receiver = await DepartmentModel.findOne({ department: 'Payroll'});

    let base64String = req.body.sig;
    // Remove header
    var base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    let base64Image = new Buffer.from(base64Data, 'base64');
    
        await fs.mkdir(`../../uploads/signatures/ptoSig/${employeeNum}`, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Folder created successfully!');
        })
        await fs.writeFile(`../../uploads/signatures/ptoSig/${employeeNum}/${month}-${day}-${year}.png`, base64Image, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('File succeeded.');
        });

    let pdfFile = `Employee-${employeeNum}-${employeeName}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    content = `<html>
    <head>
    <style>
    .EEsignature img{
    width:200px; vertical-align: text-bottom;
    }
    .DMOSsign img{
    width:200px;vertical-align: text-bottom;
    }
    html {
        zoom: .55;
    }
    </style>
    <script src="https://kit.fontawesome.com/b46fe6b39d.js" crossorigin="anonymous"></script>
    </head>
    <body>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
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
    <td style="font-weight: bold; font-size: 190%;">&nbsp;Paid Time Off (PTO) Request</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: gray;">
    <td style="height: 29px; font-weight: bold; font-size: 110%;">PTO Form</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Name:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${employeeName}</span></td>
    </tr>
    <tr>
    <td style="width: 22.9143%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
    </tr>
    <tr>
    <td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Number:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${employeeNum}</span></td>
    </tr>
    <tr>
    <td style="width: 22.9143%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 22.9143%;"><span style="font-size: 12pt;">Department:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${departments}</span></td>
    </tr>
    <tr>
    <td style="width: 22.9143%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 22.9143%;"><span style="font-size: 12pt;">Manager:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${dm.userFirst} ${dm.userLast}</span></td>
    </tr>
    <tr>
    <td style="width: 22.9143%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td>&nbsp;<span style="font-size: 14pt;">&nbsp;Dates of Absence</span></td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="height: 25px;">
    <td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">From:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${absencefrom}</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; text-align: right; height: 25px;"><span style="font-size: 12pt;">&nbsp;To: &nbsp;</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 26%; font-weight: bold; height: 25px;"><span style="font-size: 12pt;">${absenceto}</span></td>
    </tr>
    <tr style="height: 25px;">
    <td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    </tr>
    <tr style="height: 23px;">
    <td style="width: 25%; height: 23px;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; height: 23px;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 23px;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 23px;">&nbsp;</td>
    </tr>
    <tr style="height: 25px;">
    <td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 12pt;">&nbsp; Number of hours:</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; font-weight: bold; height: 25px;">&nbsp;<span style="font-size: 12pt;">${hours}</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 25px; text-align: right;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    </tr>
    <tr style="height: 25px;">
    <td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="height: 23px;">
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
    </tr>
    <tr style="height: 23px;">
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
    </tr>
    <tr style="color: white; font-weight: bold; font-size: 110%; font-family: verdana; text-align: center; height: 30px; background-color: gray;">
    <td style="height: 30px;"><span style="font-size: 12pt;">Manager Approval</span></td>
    </tr>
    <tr style="height: 23px;">
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
    </tr>
    <tr style="height: 23px;">
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="height: 23px;">
    <td style="height: 23px; width: 49.5083%;"><i class="fas fa-check"></i><span style="font-size: 14pt;">${approval}</span></td>
    <td style="height: 23px; width: 47.4917%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="height: 23px;">
    <td style="height: 23px; width: 47.906%;"><img title="box" src="images/unchecked_checkbox.png" alt="bok" width="25" height="25" /><span style="font-size: 14pt;"> Rejected</span></td>
    <td style="height: 23px; width: 46.094%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="height: 15px;">
    <td style="height: 15px;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;">
    <td style="width: 25.6156%; text-align: right; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;">&nbsp;<span style="font-size: 14pt;">Comments:</span></td>
    <td style="width: 72.3844%;">&nbsp;</td>
    </tr>
    <tr style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
    <td style="width: 25.6156%;"><span style="font-size: 12pt;">&nbsp;</span></td>
    <td style="width: 72.3844%;">&nbsp;<span style="font-size: 14pt;">${comments}</span></td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td style="width: 70%;">&nbsp;</td>
    <td style="width: 30%;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 70%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; vertical-align: bottom;">&nbsp; &nbsp; &nbsp;&nbsp;
    <div class="DMOSsign"><img src="http://portal.cbmportal.com/uploads/signatures/ptoSig/${employeeNum}/${month}-${day}-${year}.png"></img></div>
    </td>
    <td style="width: 30%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; vertical-align: bottom;">&nbsp;${month}/${day}/${year}</td>
    </tr>
    <tr>
    <td style="width: 70%; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp;Manager Signature&nbsp;</span></td>
    <td style="width: 30%; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp; Date: </span></td>
    </tr>
    <tr>
    <td style="width: 70%;">&nbsp;</td>
    <td style="width: 30%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="height: 33px;">
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; font-style: italic; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 12px; line-height: 30px; font-family: Georgia, serif; height: 33px;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;">Submit to HR after completed</span></td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`;

    //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/pto/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
     });

     const message = `<p><span style="font-size: 12pt;">Attention Payroll Department, Attached is a PTO Form for the employee <strong>${employeeName} #</strong><strong>${employeeNum}.</strong></span></p>
     <p><span style="font-size: 12pt;">Please Process this form ASAP.</span></p>
     <p><span style="font-size: 12pt;">Thank you for your cooperation.</span></p>
     <p><span style="font-size: 12pt;"></span></p>
     <p> </p>
     <p> </p>
     <p> </p>
     <hr />
     <p>PTO Form submitted on <em>${month}/${day}/${year}</em></p>`
  
     //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: `PTO request for employee ${employeeNum} ${employeeName}`, // Subject line
    html: `${message}`, // html body
    attachments: {
        filename: pdfFile,
        path: `../../uploads/pdf/pto/${pdfFile}`
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

    //DB insertions
    let form = new PTO();
    form.employeeName = employeeName;
    form.employeeNum = employeeNum;
    form.dm = dm;
    form.departments = departments
    form.absencefrom = absencefrom;
    form.absenceto = absenceto;
    form.hours = hours;
    form.approval = approval;
    form.comments = comments;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = ptoRouter;