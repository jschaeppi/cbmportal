const express = require('express');
const mileageRouter = express.Router();
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const moment = require('moment');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let Mileage = require('../src/Model/mileageModel');
let Store = require('../src/Model/Stores');
let DepartmentModel = require('../src/Model/departmentModel');

mileageRouter.use(bodyParser.json());
mileageRouter.use(bodyParser.urlencoded({extended: false}))

// current date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

mileageRouter.get('/stores/:id', (req, res) => {
    Store.find( { dm: req.params.id }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    }
    )
});

mileageRouter.post('/', async (req, res) => {
    const { dm, employeeName, employeeNum, comments } = req.body[0];
    const rows = [];
    const mileageInfo = [];
    const receiver = await DepartmentModel.findOne({ department: 'Payroll'});

    let pdfFile = `Mileage-Request-${employeeName}-${month}-${date}-${year}`;

    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    req.body.forEach( (item,i) => {
        rows.push(item.mileageDate);
        rows.push(item.starting);
        rows.push(item.destination);
        mileageInfo.push('<tr>' +
        '<td height="25px" width="33%" style="border: 1px solid black;">' + moment(item.mileageDate).format('L') + '</td>' +
        '<td height="25px" style="border: 1px solid black;" colspan="2">' + item.starting + '</td>' +
        '<td height="25px" style="border: 1px solid black;" colspan="2">' + item.destination + '</td>' +
        '</tr>');
})
    let content = `
    <head>
    <style>
    html {
        zoom: .45;
    }
    table {
        border-spacing: 0;
    }
    </style>
    </head>
    <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
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
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;">7 County Mileage Form</td>
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
    <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: #25354c;">
    <td style="height: 29px; font-weight: bold; font-size: 100%;">7 County Mileage Details</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="20%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 48%; border: 1px solid black; padding: 3px;">Employee Name</td>
    <td style="width: 48%; border: 1px solid black; padding: 3px;" colspan="3">${employeeName}</td>
    </tr>
    <tr>
    <td style="width: 48%; border: 1px solid black; padding: 3px;">Employee Number</td>
    <td style="width: 48%; border: 1px solid black; padding: 3px;" colspan="3">${employeeNum}</td>
    </tr>
    <tr>
    <td style="width: 48%; border: 1px solid black; padding: 3px;">Manager</td>
    <td style="width: 48%; border: 1px solid black; padding: 3px;" colspan="3">${dm.userFirst} ${dm.userLast}</td>
    </tr>
    <tr>
    <td style="width: 48%; border: 1px solid black; padding: 3px;">Comments</td>
    <td style="width: 48%; border: 1px solid black; padding: 3px;" colspan="3">${comments}</td>
    </tr>
    <tr>
    <td style="border-bottom: 0px solid black; background-color: #f9fafc;" colspan="3">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-bottom: 0px solid black; background-color: #f9fafc; font-size:18px;font-weight:bold; text-align: center; column-span:3" colspan="3">MILEAGE</td>
    </tr>
    ${mileageInfo.join().replace(/,/g," ")}
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    </tbody>
    </table>`;

  //Create PDF
  pdf.create(content, options).toFile(`../../uploads/pdf/mileage/${pdfFile}`, function(err, res) {
    if (err) {
    return console.log(err);
    }
  });
   
  message = content;

   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: pdfFile, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: [
        {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/mileage/${pdfFile}`
        },
    ]
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
    let form = new Mileage();
    form.dm = `${dm.userFirst} ${dm.userLast}`;
    form.employeeName = employeeName;
    form.employeeNum = employeeNum;
    form.notes = comments;
    rows.forEach((item, i) => {
        form.mileage.push(item);
    })
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = mileageRouter;