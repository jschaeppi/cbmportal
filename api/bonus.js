const express = require('express');
const bonusRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const moment = require('moment');
let { transporter, mailOptions, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
const Bonuses = require('../src/Model/bonusModel');
const Store = require('../src/Model/Stores');
const DepartmentModel = require('../src/Model/departmentModel');

message = 'Please process this bonus request.';
bonusRouter.use(bodyParser.json());
bonusRouter.use(bodyParser.urlencoded({extended: false}));

// current date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

bonusRouter.get('/stores/:district', (req, res) => {
    const districts = req.params.district;
    console.log(districts);
    if (districts.length > 1) {
        Store.find({district: {$in: districts.split(',')}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.json(result);
            }
        }).sort( { district: -1})
    } else {
    Store.find({ district: districts }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result);
            res.json(result)
        }
    }
    ).sort({ district: -1})
}
});
bonusRouter.post('/', async (req, res) => {
    const { dm } = req.body[0];
    const rows = [];
    let bonusInfo = [];
    const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
    
    //acquiring signature
    let base64String = req.body[0].sig;
    // Remove header
    let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
 
    //converting from base64 to image
    let base64Image = new Buffer.from(base64Data, 'base64');
    try {
    //Make new folder for request
    await fsPromises.mkdir(`../../uploads/signatures/bonusPaySig/${req.body[0].employeeNum}`, { recursive: true });
    console.log(`Folder ${req.body[0].employeeNum} Created`);
    //Write signature to file
    await fs.writeFile(`../../uploads/signatures/bonusPaySig/${req.body[0].employeeNum}/${month}-${date}-${year}.png`, base64Image, (err) => {
        if (err) {
          console.log(err);
        }
        console.log('File succeeded.');
      });
    } catch(err) {
        console.log(err);
    }


    //Generating Bonuse Rows
        req.body.forEach( (item,i) => {
                rows.push(moment(item.date).format('L'));
                rows.push(item.location);
                rows.push(item.bonus);
                bonusInfo.push('<tr style="height: 25px;">' +
    '<td style="width: 15%; height: 25px; text-align: center; font-weight: bold; border: 1px solid black;">&nbsp;' + item.date + '</td>' +
   '<td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 1px solid black;">&nbsp;' + item.location + '</td>' +
    '<td style="width: 15%; font-weight: bold; height: 25px; border: 1px solid black; text-align: center;">&nbsp;' + item.bonus + '</td></tr>');
})
    let pdfFile = `Employee_${req.body[0].employeeNum}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'


    let content = `<head>
  <style>
  .EEsignature img{
  width:100px; vertical-align: text-bottom;
  }
  .DMOSsign img{
  width:100px;vertical-align: text-bottom;
  }
  table {
      border-spacing: 0;
  }
  html {
    zoom: .55;
}
td {
    padding-top: 5px;
}
  </style>
  </head>
  <body>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
  <tr>
  <td style="border-bottom: 0px solid black;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
  <tr>
  <td style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: white; border: 20px solid #EDEDED; padding: 5px;"><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="336" height="102" /></td>
  </tr>
  <tr>
  <td style="font-weight: bold; font-size: 190%; text-align: center;">BONUS FORM</td>
  </tr>
  <tr>
  <td style="font-weight: bold; font-size: 190%; text-align: center;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;Name</td>
  <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 40%; font-weight: bold; height: 25px;">&nbsp;${req.body[0].employeeName}</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 40%; font-weight: bold; text-align: right; height: 25px;">&nbsp;Emp#</td>
  <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 30%; font-weight: bold; height: 25px; text-align: center;">${req.body[0].employeeNum}</td>
  </tr>
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 40%; font-weight: bold; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 30%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: center; font-weight: bold; border: 1px solid black;"><span style="font-size: 16pt;">Date</span></td>
  <td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 1px solid black;"><span style="font-size: 16pt; line-height: 22.8571px;">Location</span></td>
  <td style="width: 15%; font-weight: bold; height: 25px; border: 1px solid black; text-align: center;"><span style="font-size: 16pt;">Amount</span></td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
 ${bonusInfo.join().replace(/,/g," ")}
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
  <tr style="height: 25px;">
  <td style="width: %; height: 25px; text-align: left; font-weight: bold;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
  <tr style="height: 50px; vertical-align: bottom;">
  <td style="width: 15%; height: 25px; text-align: right; font-weight: normal;">&nbsp;Manager:</td>
  <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 40%; font-weight: bold; height: 25px;">&nbsp;
  <div class="DMOSsign"><img src="http://portal.cbmportal.com/uploads/signatures/bonusPaySig/${req.body[0].employeeNum}/${month}-${date}-${year}.png"</div>
  </td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: normal; text-align: right; height: 25px;">&nbsp;Date:</td>
  <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 20%; font-weight: bold; height: 25px;">&nbsp;${month}/${date}/${year}</td>
  </tr>
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: left; font-weight: bold; vertical-align: bottom;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;"><sup>sign</sup></td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: left; font-weight: bold;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: left; font-weight: bold;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellpadding="0">
  <tbody>
  <tr style="height: 25px; vertical-align: bottom;">
  <td style="width: 15%; height: 25px; text-align: right; font-weight: normal;">&nbsp;Comments:</td>
  <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 85%; font-weight: bold; height: 25px;"> ${req.body[0].comments}</td>
  </tr>
  <tr style="height: 25px; vertical-align: bottom;">
  <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;</td>
  <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 85%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  <tr style="height: 25px; vertical-align: bottom;">
  <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;</td>
  <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 85%; font-weight: bold; height: 25px;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
  <tbody>
  <tr style="height: 10px;">
  <td style="width: 15%; height: 25px; text-align: center; font-weight: bold;">&nbsp;</td>
  <td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 2px solid black;"><span style="font-size: 16px; line-height: 25px;">Payroll Use Only </span></td>
  <td style="width: 15%; font-weight: bold; height: 25px; text-align: center;">&nbsp;</td>
  </tr>
  <tr style="height: 25px;">
  <td style="width: 15%; height: 25px; text-align: center; font-weight: bold;">&nbsp;</td>
  <td style="text-align: center; width: 70%; font-weight: bold; height: 200px; border: 2px solid black;">&nbsp;</td>
  <td style="width: 15%; font-weight: bold; height: 25px; text-align: center;">&nbsp;</td>
  </tr>
  </tbody>
  </table>
  </body>
  </html>`;

  //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/bonus/${pdfFile}`, function(err, res) {
      if (err) {
      return console.log(err);
      }
   });


   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: `Bonus request for ${req.body[0].employeeNum}`, // Subject line
    text: `${receiver.department} ${message}`, // plain text body
    attachments: {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/bonus/${pdfFile}`
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
    let form = new Bonuses();
        form.employeeName = req.body[0].employeeName;
        form.employeeNum = req.body[0].employeeNum;
        form.dm = req.body[0].dm;
    bonusInfo.forEach((item, i) => {
        form.bonus.push(item);
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

module.exports = bonusRouter;