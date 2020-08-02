const express = require('express');
const wtRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const moment = require('moment');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let WorkTicket = require('../src/Model/wtModel');
let Store = require('../src/Model/Stores');

wtRouter.use(bodyParser.json());
wtRouter.use(bodyParser.urlencoded({ extended: false }));
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

wtRouter.get('/stores', (req, res) => {
    Store.find()
    .sort( { banner: -1 })
    .then(stores => res.json(stores));
});

wtRouter.post('/', (req, res) => {
    const employeeName = req.body.employeeName;
    const employeeNum = req.body.employeeNum;
    const dm = req.body.dm;
    const location = req.body.location;
    const city = req.body.city;
    const state = req.body.state;
    const workType = req.body.workType; 
    const Billable = req.body.Billable;
    const notes = req.body.notes;
    const equipment = req.body.equipment;
    const currentLocation = req.body.currentLocation;
    const orderSubmitted = req.body.orderSubmitted;
    const orderDate = moment(req.body.orderDate).format('L');
    const orderNumber = req.body.orderNumber;
    const startDate = moment(req.body.startDate).format('L');
    const endDate = moment(req.body.endDate).format('L');
    let pdfFile = `WT-request-${dm}-${month}-${date}-${year}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'
    // Setting response to 'attachment' (download).
    // If you use 'inline' here it will automatically open the PDF
    //res.setHeader('Content-disposition', 'attachment; filename="' + filename + '"')
    //res.setHeader('Content-type', 'application/pdf')
    let content = `<head>
    <style>
    html {
        zoom: .55;
    }
    </style>
    </head>
    <table style="width: 100%;" border="0">
<tbody>
<tr>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="2" cellspacing="0" cellpadding="2">
<tbody>
<tr>
<td style="width: 100%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: center;" colspan="2">Project Work Sheet</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: center;" colspan="2"><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="336" height="102" /></td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">CREW INFORMATION</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">EMPLOYEE NAMES:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${employeeName}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">EMPLOYEE NUMBERS:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${employeeNum}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">DISTRICT MANAGER:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${dm}</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">JOB INFORMATION</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">STORE:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${location}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">CITY:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${city}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">STATE:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${state}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">TYPE OF WORK:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${workType}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">BILLABLE/NON:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${Billable}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">SPECIAL NOTES:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${notes}</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">OPERATIONS DETAILS</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">WHAT EQUIPMENTS NEEDS TO BE MOVED:<small>(List all, including barrels,etc.)</small></td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${equipment}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">Current Location:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${currentLocation}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">SUPPLY ORDER SUBMITTED:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${orderSubmitted}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">Supply Order Date:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${orderDate}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">Supply Order Number:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${orderNumber}</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">PROJECT DATES:</td>
</tr>
<tr>
<td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">Project Start Date:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${startDate}</td>
</tr>
<tr>
<td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">Project E0nd Date:</td>
<td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${endDate}</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0">
<tbody>
<tr>
<td>&nbsp;</td>
</tr>
</tbody>
</table>`;
  //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/wt/${pdfFile}`, function(err, res) {
      if (err) {
      return console.log(err);
      }
   });
   receiver = 'joseph.schaeppi@carlsonbuilding.com';
   message = '<p>Attention Accounting Dept,</p>' +
   '<p>Please find attched a Project Work Ticket Request for the store <strong>' + location + '</strong>.</p>' +
   '<p>If you have any questions please contact me.</p>' +
   '<p>Thanks,</p>' +
   '<p>{global:fullname}</p>';

   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver, // list of receivers
    subject: pdfFile, // Subject line
    html: message, // html body
    attachments:
        {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/wt/${pdfFile}`
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
    let form = new WorkTicket();
    form.employeeName = employeeName;
    form.employeeNum = employeeNum;
    form.dm = dm;
    form.location = location;
    form.city = city;
    form.state = state;
    form.workType = workType; 
    form.Billable = Billable;
    form.notes = notes;
    form.equipment = equipment;
    form.currentLocation = currentLocation;
    form.orderSubmitted = orderSubmitted;
    form.orderDate = orderDate;
    form.orderNumber = orderNumber;
    form.startDate = startDate;
    form.endDate = endDate;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = wtRouter;