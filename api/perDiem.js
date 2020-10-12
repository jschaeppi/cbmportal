const express = require('express');
const perdiemRouter = express.Router();
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let PerDiem = require('../src/Model/perdiemModel');
let Store = require('../src/Model/Stores');
let DepartmentModel = require('../src/Model/departmentModel');

perdiemRouter.use(bodyParser.json());
perdiemRouter.use(bodyParser.urlencoded({extended: false}))
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

perdiemRouter.get('/stores', (req, res) => {
    Store.find()
    .sort( { banner: -1 })
    .then(stores => res.json(stores));
});


perdiemRouter.post('/', async (req, res) => {
    const {city, employeeName, employeeNum, location, state, dm }= req.body[0];
    let { comments } = req.body[0];
    const firstNight = moment(req.body[0].firstNight).format('L');
    const lastNight = moment(req.body[0].lastNight).format('L');
    const arrivalDate = moment(req.body[0].arrivalDate).format('L');
    const departureDate = moment(req.body[0].departureDate).format('L');
    const rows = [];
    const perDiemInfo = [];
    const receiver = await DepartmentModel.findOne({ department: 'Accounting'});
    comments = await translator(comments, {to: 'en', from: 'es'});
    let pdfFile = `PerDiem-Request-${employeeName}-${employeeNum}-${month}-${date}-${year}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    req.body.forEach( (item,i) => {
        rows.push(item.mileageDate);
        rows.push(item.arrivalStore);
        rows.push(item.destinationStore);
        rows.push(item.rtow);
        perDiemInfo.push('<tr>' +
        '<tr><!-- STARTS ROW1-->' +
        '<td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; font-size:90%;background: yellow;" colspan="0">' + moment(item.mileageDate).format('L') + '</td>' +
        '<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center;font-size:90%;background: yellow;" colspan="0">' + item.arrivalStore + '</td>' +
        '<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center;font-size:90%;background: yellow;" colspan="0">' + item.destinationStore + '</td>' +
        '<td style="width: 60px; border: 2px solid black; padding:3px;text-align: center;font-size:90%;background: yellow;" colspan="0">' + item.rtow + '</td>' +
        '<td style="width: 70px; border: 2px solid black; padding:3px;text-align: center;font-size:90%; background: darkgray;" colspan="0">&nbsp;</td>' +
        '<td style="width: 70px; border: 2px solid black; padding:3px;text-align: center;font-size:90%; background: darkgray;" colspan="0">&nbsp;</td>' +
        '</tr><!-- ENDS ROW1-->');
})
    let content = `
    <head>
    <style>
    html {
        zoom: .65;
    }
    </style>
    </head>
    <center>
<table style="width: 838px;" border="0" cellspacing="0" cellpadding="1">
<tbody>
<tr>
<td colspan="2">&nbsp; <img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="346" height="112" /></td>
<td style="text-align: right; font-weight: bold; font-size: 340%;" colspan="4">&nbsp;Carlson Building Maintenance</td>
</tr>
<tr>
<td colspan="0">&nbsp;</td>
<td colspan="0">&nbsp;</td>
<td colspan="0">&nbsp;</td>
<td colspan="0">&nbsp;</td>
<td colspan="0">&nbsp;</td>
<td colspan="0">&nbsp;</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 190%; padding-left: 3px;" colspan="2">&nbsp;Per Diem Request</td>
<td style="font-weight: bold; font-size: 190%; padding-left: 3px; text-align: right;" colspan="4">&nbsp; ${month}/${date}/${year}</td>
</tr>
<tr>
<td colspan="2">&nbsp;</td>
<td colspan="4">&nbsp;</td>
</tr>
<tr>
<td colspan="2">&nbsp;</td>
<td colspan="4">&nbsp;</td>
</tr>
<tr>
<td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: red; padding: 3px;" colspan="6">&bull; This form is to be submitted by District Managers only.<br /> &bull; Forms submitted by anyone else will not be processed. <br />&bull; Fill out all applicable fields highlighted in yellow. Incomplete forms will be returned and reimbursement will be delayed.<br /> &bull; Submit one form per employee. Forms with multiple employees will be returned and reimbursement will be delayed. <br />&bull; Requests for Per Diem/Mileage will be processed once per week by the Finance Department <br />&bull; Requests must be submitted by Tuesday at 12:00 PM for the previous calendar week<br /> &bull; Requests received after 12 PM Tuesday will be processed the following week.<br />&bull; Special notes are required for irregular circumstances</td>
</tr>
<tr>
<td colspan="6">&nbsp;</td>
</tr>
<tr>
<td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black; text-transform: uppercase;" colspan="6">employee information</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold;" colspan="2">EMPLOYEE NAME</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${employeeName}</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold;" colspan="2">EMPLOYEE NUMBER</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${employeeNum}</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold;" colspan="2">DISTRICT MANAGER</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${dm.userFirst} ${dm.userLast}</td>
</tr>
<tr>
<td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black;" colspan="6">JOB SITE</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">store location</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${location}</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">city</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${city}</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">state</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${state}</td>
</tr>
<tr>
<td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black; text-transform: uppercase;" colspan="6">hotel</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">first night needed</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${firstNight}</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">last night needed</td>
<td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${lastNight}</td>
</tr>
<tr>
<td colspan="6">&nbsp;</td>
</tr>
<tr>
<td style="width: auto; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: lightgray;" colspan="4">per diem</td>
<td style="width: 220px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;font-size:90%;color: red;" colspan="2">FOR OFFICE USE ONLY</td>
</tr>
<tr>
<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; font-weight: bold;" colspan="2">ARRIVAL DATE</td>
<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; font-weight: bold;" colspan="2">DEPARTURE DATE</td>
<td style="width: 28px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;color: red;" colspan="2">amt</td>
</tr>
<tr>
<td style="width: 280px; border: 2px solid black; padding:3px;text-align: center; font-weight: normal;font-size:90%;background: yellow;" colspan="2">${arrivalDate}</td>
<td style="width: 280px; border: 2px solid black; padding:3px;text-align: center; font-weight: normal;font-size:90%;background: yellow;" colspan="2">${departureDate}</td>
<td style="width: 220px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;" colspan="2">&nbsp;</td>
</tr>
<tr>
<td style="width: 280px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: lightgray;" colspan="4">mileage</td>
<td style="width: 220px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;font-size:90%;color: red;" colspan="2">FOR OFFICE USE ONLY</td>
</tr>
<tr><!-- STARTS ROW HEADERS-->
<td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">date</td>
<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">departed from</td>
<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">destonation/store</td>
<td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">rt/ow</td>
<td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;color: red;" colspan="0">mi</td>
<td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;color: red;" colspan="0">amt</td>
</tr><!-- ENDS ROW HEADERS-->
${perDiemInfo.join().replace(/,/g," ")}
<tr><!--NOTES-->
<td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black; text-transform: uppercase;" colspan="6">notes</td>
</tr>
<tr>
<td style="background: lightgray; font-height: 120%; font-weight: normal; text-align: center; border: 2px solid black; text-transform: capitalize; font-size: 85%; height: 23px;" colspan="6">${comments}</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td style="border: 2px solid black; padding:3px;text-align: center; background: darkgray; font-weight: bold;color: red;" colspan="6">FOR OFFICE USE ONLY</td>
</tr>
<tr><!-- OFFICE-->
<td style="width: auto; border: 2px solid black; padding:3px;text-align: center; background: darkgray; font-weight: bold;color: red;" colspan="0">GRAND TOTAL</td>
<td style="width: auto; border: 2px solid black; padding:3px;text-align: center; background: darkgray;" colspan="5">&nbsp;</td>
</tr>
<!-- OFFICE-->
<tr>
<td style="border: 0px solid black; text-align: center; font-weight: bold; font-size: 73%; background: WHITE; font-style: normal;" colspan="6">REVISED 02/01/2016</td>
</tr>
</tbody>
</table>`;

  //Create PDF
  try {
    pdf.create(content, options).toFile(`../../uploads/pdf/perDiem/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
    });
} catch(err) {
    console.log(err);   
    }

   message = content;

   //Sending Mail
   try {
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: pdfFile, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: [
        {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/perDiem/${pdfFile}`
        },
    ]
};
     
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
    let form = new PerDiem();
    form.employeeName = employeeName;
    form.employeeNum = employeeNum;
    form.dm = `${dm.userFirst} ${dm.userLast}`;
    form.location = location;
    form.city = city;
    form.state = state;
    form.firstNight = firstNight;
    form.lastNight = lastNight;
    form.arrivalDate = arrivalDate;
    form.departureDate = departureDate;
    form.comments = comments;
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

module.exports = perdiemRouter;