const express = require('express');
const termRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
const pdf = require('html-pdf');
const apiFunc = require('../../config/api_funcs');
let { transporter, mailOptions, message } = require('../../config/mailer');
let { options } = require('../../config/html')
const Term = require('../../src/Model/termModel');
const DepartmentModel = require('../../src/Model/departmentModel');

termRouter.use(bodyParser.json());
termRouter.use(bodyParser.urlencoded({ extended: false }));

const date = apiFunc.date();


termRouter.post('/', async (req, res) => {
    const {firstName, firstLast, employeeNum, secondLast, dm, lastWorked } = req.body; 
    let { rehire, norehireReason } = req.body;
    norehireReason = (norehireReason != '')? norehireReason:'';
    lastWorked = moment(lastWorked).format('L');
    const receiver = await DepartmentModel.findOne({ department: 'Carlson Terminations'});
    //norehireReason = await translator(norehireReason, {to: 'en', from: 'es'});
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
<td style="height: 29px; font-weight: bold; font-size: 110%;">No Show First Day</td>
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
<td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">Eligible for rehire?</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${rehire.toUpperCase()} ${norehireReason}</span></td>
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
<tr style="color: black; font-weight: bold; font-size: 110%; font-family: verdana; text-align: center; height: 30px; background-color: white;">
<td style="height: 30px;">&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>

<tr style="height: 43px;">
<td style="width: 70%; border-bottom: 1px solid black; vertical-align: bottom; height: 43px;">&nbsp; &nbsp; &nbsp;&nbsp;
<div class="DMOSsign">${dm.userFirst} ${dm.userLast}</div>
</td>
<td style="width: 30%; border-bottom: 1px solid black; vertical-align: bottom; height: 43px;">&nbsp;${date}</td>
</tr>
<tr style="height: 29px;">
<td style="width: 70%; border-bottom: 0px solid black; height: 29px;"><span style="font-size: 14pt;">&nbsp;&nbsp;</span></td>
<td style="width: 30%; border-bottom: 0px solid black; height: 29px;"><span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
<tr style="height: 23px;">
<td style="width: 70%; height: 23px;">&nbsp;</td>
<td style="width: 30%; height: 23px;">&nbsp;</td>
</tr>
<tr style="height: 23px;">
<td style="width: 70%; height: 23px;">&nbsp;</td>
<td style="width: 30%; height: 23px;">&nbsp;</td>
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
</table>`;

    if (!content) {
        res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
    }

    //Create PDF
    pdf.create(content, options).toFile(`../uploads/pdf/term/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
     });
     const message = `<p>You have a new Termination form for ${firstName} ${firstLast} #${employeeNum}.</p>
     <p> </p>
     <p> </p>
     <p> </p>
     <p> </p>
     <p>Submited by ${dm}</p>`
   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: 'joseph.schaeppi@carlsonbuilding.com', // list of receivers
    cc: dm.email,
    subject: `Termination request for employee ${employeeNum} ${firstName} ${firstLast} ${secondLast}`, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: {
        filename: pdfFile,
        path: `../uploads/pdf/term/${pdfFile}`
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
    form.dm = `${dm.userFirst} ${dm.userLast}`;
    form.firstLast = firstLast
    form.secondLast = secondLast;
    form.rehire = rehire;
    form.norehireReason = norehireReason;
    form.lastWorked = lastWorked;
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

module.exports = termRouter;