const express = require('express');
const hotelRouter = express.Router();
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const translator = require('translate');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let Hotel = require('../src/Model/hotelModel');
let PS = require('../src/Model/psModel');
let DepartmentModel = require('../src/Model/departmentModel');

hotelRouter.use(bodyParser.json());
hotelRouter.use(bodyParser.urlencoded({extended: false}))

// current date
let date_ob = new Date();

// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

hotelRouter.get('/ps/:district', (req, res) => {
    const districts = req.params.district;
    if (districts.length > 1) {
        PS.find({district: {$in: districts.split(',')}}, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        }).sort( { district: -1})
    } else {
    PS.find({ district: districts }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    }
    ).sort({ district: -1})
}
});

hotelRouter.post('/', async (req, res) => {
    const { listPs1, listPs2, dm, store, checkIn, checkOut, roomNum, peopleNum, newPS, hotelReason, WT, beds } = req.body;
    let { notes } = req.body
    if (newPS !== "") {
        const listPs1 = "";
        const listPs2 = "";
    }
    notes = await translator(notes, {to: 'en', from: 'es'});
    const receiver = await DepartmentModel.findOne({ department: 'Accounting'});
    let pdfFile = `Hotel-Request-${dm.userFirst} ${dm.userLast}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    let content = `<head>
    <style>
    html {
        zoom: .55;
    }
    </style>
    </head>
    <table style="width: 100%;" border="0" cellspacing="0" cellpadding="1">
    <tbody>
    <tr>
    <td colspan="2">&nbsp; <img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="346" height="112" /></td>
    <td style="text-align: right; font-weight: bold; font-size: 200%;" colspan="4">&nbsp;Carlson Building Maintenance</td>
    </tr>
    <tr>
    <td colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 190%; padding-left: 3px;" colspan="3">Hotel Request</td>
    <td style="font-weight: bold; font-size: 190%; padding-left: 3px; text-align: right;" colspan="3">&nbsp; ${month}/${date}/${year}</td>
    </tr>
    <tr>
    <td colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; background: yellow; color: red; font-weight: bold; font-size: 100%;" colspan="4">
    <ul>
    <li>Hotel request must be requested ahead of time.</li>
    <li>Select numbers of rooms</li>
    <li>Select numbers of beds (Single or double)</li>
    <li>Notify the employee to check in by 3pm.</li>
    <li>Specify employee name under hotel</li>
    <li>Employee name under hotel must have an I.D.</li>
    <li>Employee must pay deposit for incidentals.</li>
    <li>Any No Call No Show/Cancel will be a company loss.</li>
    </ul>
    </td>
    </tr>
    <tr>
    <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">district information</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; font-size: 100%;" colspan="0">DM:</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: bold; font-size: 100%;" colspan="5">${dm.userFirst} ${dm.userLast}</td>
    <!--
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D150:value}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D160:value}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D240:value}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D110:value}</td>--></tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black; font-size: 100%;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black; font-size: 100%;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">job location</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; text-transform: capitalize; font-size: 100%;" colspan="2">store location:</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: bold; font-size: 100%;" colspan="4">${store}</td>
    <!--
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <td>&nbsp;</td> --></tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">hotel information</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; font-size: 100%;" colspan="2">Check IN:</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${checkIn}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; font-size: 100%;" colspan="2">Check out:</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${checkOut}</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="2">How many rooms?</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${roomNum}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="2">How many beds?</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${beds}</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">Employee information</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="0">Employee 1</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal;" colspan="0">${listPs1}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="0">Employee 2</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; width: auto;" colspan="0">${listPs2}</td>
    </tr>
    <tr><!--Row of New Employee-->
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">New Employee Name</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="5">${newPS}</td>
    <!--
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal;" colspan="1">New Hire Form Sent?</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal;" colspan="0">{Yes}</td>--></tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">reason for hotel request</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="2">Site Visit/Project Type</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${hotelReason}</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;text-transform:capitalize;" colspan="2">work ticket number</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${WT}</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">notes</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="6">${notes}</td>
    </tr>
    <tr>
    <td style="border-left: 0px solid black; border-right: 0px solid black; font-size: 100%;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
    </tr>
    <tr>
    <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">office use only</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: bold; background: lightgray; text-transform: Capitalize;" rowspan="2">notes</td>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; background: lightgray; font-size: 100%;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; background: lightgray;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
    </tr>
    </tbody>
    </table>`;

  //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/hotel/${pdfFile}`, function(err, res) {
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
        path: `../../uploads/pdf/hotel/${pdfFile}`
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
    let form = new Hotel();
    form.dm = dm;
    form.store = store;
    form.checkIn = checkIn;
    form.checkOut = checkOut;
    form.listPs1 = listPs1;
    form.listPs2 = listPs2;
    form.roomNum = roomNum;
    form.peopleNum = peopleNum;
    form.beds = beds;
    form.newPS = newPS;
    form.hotelReason = hotelReason;
    form.WT = WT;
    form.notes = notes;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = hotelRouter;
