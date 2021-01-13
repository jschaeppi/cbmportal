const express = require('express');
const moment = require('moment');
const timeadjustRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
let { transporter, mailOptions, message } = require('../../config/mailer');
let { options } = require('../../config/html')
let timeAdjust = require('../../src/Model/timeadjustModel');
let Store = require('../../src/Model/Stores');
let DepartmentModel = require('../../src/Model/departmentModel');

timeadjustRouter.use(bodyParser.json());
timeadjustRouter.use(bodyParser.urlencoded({extended: false}));

// current date
let date_ob = new Date();

// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

timeadjustRouter.get('/stores/:id', (req, res) => {
    Store.find( { dm: req.params.id }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    }
    )
});

timeadjustRouter.post('/', async (req, res, next) => {
    try {
        const { dm, employeeNum, employeeName } = req.body[0];
        let { noteAdjustment } = req.body[0];
        const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
        let rows = [];
        let timeadjustInfo = [];
        let totaladjustment = 0;
        let shift = 0;
        let base64String = '';
        let base64Image = '';
        let base64Data = '';
    
        await fsPromises.mkdir(`../uploads/signatures/timeadjustment/${dm.userFirst} ${dm.userLast}`.split(' ').join(''), { recursive: true });
        await fsPromises.mkdir(`../uploads/signatures/timeadjustment/${employeeNum}`, { recursive: true });

        //noteAdjustment = await translator(noteAdjustment, {to:'en', from: 'es'});
        base64String = req.body[0].employeesig;
        // Remove header
        base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        base64Image = new Buffer.from(base64Data, 'base64');
        await fsPromises.writeFile(`../uploads/signatures/timeadjustment/${employeeNum}/employeeAdjustSig${month}-${day}-${year}.png`, base64Image);

        base64String = req.body[0].managerSig;
        // Remove header
        base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        base64Image = new Buffer.from(base64Data, 'base64');
        
        await fsPromises.writeFile(`../uploads/signatures/timeadjustment/${dm.userFirst} ${dm.userLast}/managerAdjustSig${month}-${day}-${year}-${employeeNum}.png`.split(' ').join(''), base64Image);
        //Generating Bonuse Rows
        req.body.forEach( (item,i) => {
            rows = [];
            rows.push(item.date);
            rows.push(item.in);
            rows.push(item.break);
            rows.push(item.out);
            shift = moment(item.out).diff(item.in, 'hours');
            totaladjustment = (shift-item.break);
            console.log(shift, totaladjustment);
            timeadjustInfo.push('<tr>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + moment(item.date).format('L') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">' + moment(item.in).format('LT') + '</td>' +
            '<td style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">' + moment(item.out).format('LT') + '</td>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + shift + '</td>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + item.break + '</td>' +
            '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px;">' + totaladjustment + '</td>' +
            '</tr>');
        })
        let pdfFile = `Employee_${req.body[0].employeeNum}`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

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
        <html>
    <head>
    <style>
    .EEsignature img{
    width:150px; vertical-align: text-bottom;
    }
    .DMOSsign img{
    width:150px;vertical-align:bottom;
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
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;">Time Adjustment Form</td>
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;text-align:right">&nbsp;${month}/${day}/${year}</td>
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
    <td style="height: 29px; font-weight: bold; font-size: 110%;">Time Adjustment Form Details</td>
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
    <td style="width: 100px; padding: 1px; text-decoration: underline;">${employeeNum}</td>
    <td style="width: 50px; padding: 1px;">Employee Name:</td>
    <td style="width: 200px; padding: 1px; text-decoration:underline;">${employeeName}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="4">&nbsp;</td>

    </tr>
    <tr>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; background-color: #C0C0C0;"></td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="4">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-size:24px; font-weight:bold" colspan="6">Adjustment for missed breaks:</td>
    </tr>
    <tr>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Date:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Start Time:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">End Time: </th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Total Hours:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Break Time:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Adjusted Hours:</th>
    </tr>
    ${timeadjustInfo.join().replace(/,/g," ")}
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <th style=" padding: 1px; text-align:left;" colspan="6">Reason this pay was missed:</th>
    </tr>
    <tr>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px;" colspan="6">${noteAdjustment}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; font-weight:bold;" colspan="6">**Signature/Approval - Please make sure to sign and print your name before turning in this form.</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="6">&nbsp;</td>
    </tr>
    <tr style="height: 50px; vertical-align: bottom;">
    <td style=" width: 150px; padding: 1px;">Employee:</td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${employeeName}</td>
    <td style=" width: 150px; height: 20px; border-bottom: border: 1px solid black; padding: 1px; vertical-align:bottom">
    <div class="DMOSsign"><img src="http://portal.cbmportal.com/uploads/signatures/timeadjustment/${employeeNum}/employeeAdjustSig${month}-${day}-${year}.png"><img></div>
    </td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${month}/${day}/${year}</td>
    </tr>
    <tr style="height: 50px; vertical-align: bottom;">
    <td style=" width: 150px; padding: 1px;">Manager:</td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${dm.userFirst} ${dm.userLast}</td>
    <td style=" width: 150px; height: 20px; border-bottom: border: 1px solid black; padding: 1px; vertical-align:bottom">
    <div class="DMOSsign"><img src="http://portal.cbmportal.com/uploads/signatures/timeadjustment/${dm.userFirst} ${dm.userLast}/managerAdjustSig${month}-${day}-${year}-${employeeNum}.png"><img></div>
    </td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${month}/${day}/${year}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Print</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Sign</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Date</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; font-weight:bold;" colspan="6">*Please Return this Completed form to the Payroll Department</td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`;

        if (!content) {
            res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
        }
        
        message = 'Please process this Time Adjustment request.';
    //Create PDF
        pdf.create(content, options).toFile(`../uploads/pdf/timeadjustment/${pdfFile}`, function(err, res) {
            if (err) {
            next(err);
            }
        });


    //Sending Mail
        mailOptions = {
            from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
            to: 'joseph.schaeppi@carlsonbuilding.com', // list of receivers
            cc: dm.email,
            subject: `Time Adjustment request for ${req.body[0].employeeNum}`, // Subject line
            text: `${receiver.department} ${message}`, // plain text body
            attachments: {
                filename: `${pdfFile}`,
                path: `../uploads/pdf/timeadjustment/${pdfFile}`
            },
        };
        
        transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err)
            }
        });

        //DB insertions
        let form = new timeAdjust();
            form.employeeName = employeeName;
            form.employeeNum = employeeNum;
            form.dm = `${dm.userFirst} ${dm.userLast}`;
            timeadjustInfo.forEach((item, i) => {
                form.adjustments.push(item);
            })
            form.notes = noteAdjustment;
            form.save(function(err) {
            if (err) {
                next(err)
            } else {
                return res.json({message: true});
            }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = timeadjustRouter;