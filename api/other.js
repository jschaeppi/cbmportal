const express = require('express');
const otherRouter = express.Router();
const bodyParser = require('body-parser');
const moment = require('moment');
const pdf = require('html-pdf');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
const Term = require('../src/Model/termModel');
const DepartmentModel = require('../src/Model/departmentModel');

otherRouter.use(bodyParser.json());
otherRouter.use(bodyParser.urlencoded({ extended: false }));

// current date
let date_ob = new Date();
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();


otherRouter.post('/', async (req, res) => {
    const { firstName, firstLast, employeeNum, secondLast, dm, rehire, norehireReason, warnings, quitReason } = req.body;
    const lastWorked = moment(req.body.lastWorked).format('L');
    const receiver = await DepartmentModel.findOne({ department: 'Human Resources'});

    let pdfFile = `Employee-${employeeNum}-${firstName} ${firstLast} ${secondLast}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    content = `
    <head>
    <style>
    html {
        zoom: .55;
    }
    </style>
    </head>
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
<td style="font-weight: bold; font-size: 190%; padding-left: 5px;">Employee Termination Form</td>
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
<td style="height: 29px; font-weight: bold; font-size: 110%;">Other Terminations</td>
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
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Number:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${employeeNum}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Last Name:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${firstLast}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Second Last Name:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${secondLast}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee First Name:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${firstName}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Last Day Of Work:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${lastWorked}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr>
<td>&nbsp;<span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<!--<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 23px;">
<td style="width: 59.4093%; height: 23px; vertical-align: bottom; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
<div class="EEsignature">&nbsp;</div>
</td>
<td style="width: 25.5907%; height: 23px; vertical-align: bottom; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">&nbsp; &nbsp;</td>
</tr>
<tr style="height: 23px; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;">
<td style="width: 59.4093%; height: 23px; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp;</span></td>
<td style="width: 25.5907%; height: 23px; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
</tbody>
</table> -->
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 23px;">
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
</tr>
<tr style="height: 23px;">
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
</tr>
<tr style="color: white; font-weight: bold; font-size: 110%; font-family: verdana; text-align: center; height: 30px; background-color: gray;">
<td style="height: 30px;"><span style="font-size: 12pt;">District Manager</span></td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 25px;">
<td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr style="height: 25px;">
<td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">Verbal discussion/Warnings given?</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${warnings}</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; text-align: right; height: 25px;"><span style="font-size: 12pt;">&nbsp;&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; font-weight: bold; height: 25px;">&nbsp;</td>
</tr>
<tr style="height: 25px;">
<td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">Eligible for rehire?</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${rehire} ${norehireReason}</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; text-align: right; height: 25px;"><span style="font-size: 12pt;">&nbsp;&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; font-weight: bold; height: 25px;">&nbsp;</td>
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
<tr style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
<td style="width: 23;"><span style="font-size: 12pt;">&nbsp; What led to the employee termination:</span></td>
<td style="width: 72.38%;">&nbsp;<span style="font-size: 14pt;">${quitReason}</span></td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 43px;">
<td style="width: 70%; border-bottom: 1px solid black; vertical-align: bottom; height: 43px;">&nbsp; &nbsp; &nbsp;&nbsp;
<div class="DMOSsign">${dm}</div>
</td>
<td style="width: 30%; border-bottom: 1px solid black; vertical-align: bottom; height: 43px;">&nbsp;${month}/${day}/${year}</td>
</tr>
<tr style="height: 29px;">
<td style="width: 70%; border-bottom: 0px solid black; height: 29px;"><span style="font-size: 14pt;">&nbsp;&nbsp;</span></td>
<td style="width: 30%; border-bottom: 0px solid black; height: 29px;"><span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
<tr style="height: 23px;">
<td style="width: 70%; height: 23px;">&nbsp;</td>
<td style="width: 30%; height: 23px;">&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 33px;">
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; font-style: italic; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 12px; line-height: 30px; font-family: Georgia, serif; height: 33px;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;">Submit to HR after completed</span></td>
</tr>
</tbody>
</table>>`;

    //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/term/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
     });
     const message = `<p>You have a new Termination form for ${firstName} ${firstLast} #${employeeNum}.</p>
     <p> </p>
     <p> </p>
     <p> </p>
     <p> </p>
     <p>Submited by {global:fullname}</p>`
   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    subject: `Termination request for employee ${employeeNum} ${firstName} ${firstLast} ${secondLast}`, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: {
        filename: pdfFile,
        path: `../../uploads/pdf/term/${pdfFile}`
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
    let form = new Term();
    form.firstName = firstName;
    form.employeeNum = employeeNum;
    form.dm = dm;
    form.firstLast = firstLast
    form.secondLast = secondLast;
    form.warnings = warnings;
    form.rehire = rehire;
    form.norehireReason = norehireReason;
    form.lastWorked = lastWorked;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = otherRouter;