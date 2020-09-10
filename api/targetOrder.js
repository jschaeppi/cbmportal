const express = require('express');
const targetorderRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
const supplyOrder = require('../src/Model/targetsupply');
let DepartmentModel = require('../src/Model/departmentModel');
const cors = require('cors');
targetorderRouter.use(cors({
    origin: ['http://portal.cbmportal.com','http://portal.cbmportal.com:5000', 'http://127.0.0.1'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
//const PTO = require('../src/Model/ptoModel');
const Store = require('../src/Model/Stores');
targetorderRouter.use(bodyParser.json());
targetorderRouter.use(bodyParser.urlencoded({ extended: false }));
let date_ob = new Date();
// current date
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();

targetorderRouter.post('/', async (req, res) => {
    const employeeName = req.body.employeeName;
    const location = req.body.location;
    const notes = req.body.notes;
    const order = req.body.order;
    const dm = req.body.dm;
    order.shift();
    const receiver = await DepartmentModel.findOne({ department: 'Supplies'});
    try {
        await fs.mkdir(`../../uploads/pdf/targetsupply/${month}-${day}-${year}`, { recursive: true }, (err, result) => {
            if (err) {
                console.log(err);
            } else if(result) {
            console.log('Folder created successfully!');
            }
        })
    } catch (error) {
        console.log(error);
    }

        //Filter C code items and sorted numerically
        const sortedOrder = order.filter(item => {
            if (item['item'].charAt(0) === "C") {
                return item['item'];
            }
        }).sort((a,b) => {
            if (a['item'] > b['item']) {
                return 1
            } else if (a['item'] < b['item']) {
                return -1
            } else {
                return 0;
            }
        });
        //Added the non C code items to sorted Array
        order.forEach(item => {
            if (item['item'].charAt(0) !== "C") {
                sortedOrder.push(item);
                
            }
        })

        //Created HTML Item list for PDF
        const orders = [];
        sortedOrder.forEach(item => {
        orders.push('<tr>'+
        '<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;  width: 70%;">' + item["item"] + '</td>' +
            '<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;  width: 30%;">' + item["amount"] + '</td>' +
        '</tr>')
    })
    let pdfFile = `${location}-Monthly supply order`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'
    // Setting response to 'attachment' (download).

    content = `<html>
    <head>
    <style>
    html {
        zoom: .55;
    }
    </style>
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
    <td style="font-weight: bold; font-size: 190%;">&nbsp;Target Supply Order</td>
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
    <td style="height: 29px; font-weight: bold; font-size: 110%;">Target Supply Order</td>
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
    <table style="margin: 0 auto; width:65%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; width: 30%;"><span style="font-size: 12pt;">Store Number:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 70%;"><span style="font-size: 12pt;">${location}</span></td>
    </tr>
    <tr>
    <td style="width: 30%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 70%;"><span style="font-size: 12pt;">&nbsp;</span></td>
    </tr>
    <tr>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 30%;"><span style="font-size: 12pt;">Employee Name:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 70%;"><span style="font-size: 12pt;">&nbsp;${employeeName}</span></td>
    </tr>
    </tbody>
    </table>
    <table style="margin: 0 auto; width:65%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="width: 30%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
    </tr>
    ${orders.join().replace(/,/g," ")}
    <tr>
    <td style="width: 70%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="margin: 0 auto; width:65%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 30%;"><span style="font-size: 12pt;">Notes:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 70%;"><span style="font-size: 12pt;">${notes}</span></td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`;

    //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/targetsupply/${month}-${day}-${year}/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
     });
     const message = `<p><span style="font-size: 12pt;">Here is a new supply request from ${location}
     <p><span style="font-size: 12pt;"></span></p>
     <p> </p>
     <p>Target Supply submitted by ${dm.userFirst} ${dm.userLast}</p>`
   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    //cc: dm.email,
    subject: `${location} - Monthly supply order`, // Subject line
    html: message, // html body
    attachments: {
        filename: pdfFile,
        path: `../../uploads/pdf/targetsupply/${month}-${day}-${year}/${pdfFile}`
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
    let form = new supplyOrder();
    form.employeeName = employeeName;
    form.dm = `${dm.userFirst} ${dm.userLast}`;
    orders.forEach((item, i) => {
        form.order.push(item);
    })
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

module.exports = targetorderRouter;