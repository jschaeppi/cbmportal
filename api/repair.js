const express = require('express');
const repairRouter = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');;
const path = require('path');
const pdf = require('html-pdf');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let Repair = require('../src/Model/repairModel');
let Store = require('../src/Model/Stores');

repairRouter.use(formidable({ uploadDir: './uploads/'}))
let date_ob = new Date();

// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);

// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// current year
let year = date_ob.getFullYear();

repairRouter.get('/stores', (req, res) => {
    Store.find()
    .sort( { banner: -1 })
    .then(stores => res.json(stores));
    
});

repairRouter.post('/', (req, res) => {
    const location = req.fields.location;
    const machineType = req.fields.machineType;
    const machineTag = req.fields.machineTag;
    const problem = req.fields.problem;
    const reported = req.fields.reported;
    const brandName = req.fields.brandName;
    const image = req.files.file;
    fs.mkdir(`../../uploads/images/locations/repair/${location}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder created successfully!');
    })
    fs.rename(image.path, `../../uploads/images/locations/repair/${location}/${image.name}`, (err) => {
        if (err) {
            console.log('File couldn\'t be moved!');
        }
    })
    
    let pdfFile = `Repair-request-${reported}`;
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
    <center /><table style="text-align: center;border: 1px solid #000000;margin-bottom: 10px">
    <thead>
    <tr>
    <th colspan="2" style="border-bottom: 1px solid black;">Store: ${location} </th>
    <!--<th>head2</th>--></tr>
    </thead>
    <tbody>
    <tr >
    <td style="border-bottom: 1px solid black;">Store:</td>
    <td style="border-bottom: 1px solid black;">${location}</td>
    </tr>
    <tr>
    <td style="border-bottom: 1px solid black;">Machine Type:</td>
    <td style="border-bottom: 1px solid black;">${machineType}</td>
    </tr>
    <tr>
    <td style="border-bottom: 1px solid black;">Tag #:</td>
    <td style="border-bottom: 1px solid black;">${machineTag}</td>
    </tr>
    <tr>
    <td style="border-bottom: 1px solid black;">Problem Description:</td>
    <td style="border-bottom: 1px solid black;">${problem}</td>
    </tr>
    <tr>
    <td style="border-bottom: 1px solid black;">Reported By:</td>
    <td style="border-bottom: 1px solid black;">${reported}</td>
    </tr>
    </tbody>
    <tfoot>
    <tr>
    <td style="border-bottom: 1px solid black;">Reported on</td>
    <td style="border-bottom: 1px solid black;">${month}/${date}/${year}</td>
    </tr>
    </tfoot>
    </table>`;
  //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/repair/${pdfFile}`, function(err, res) {
      if (err) {
      return console.log(err);
      }
   });
   receiver = 'joseph.schaeppi@carlsonbuilding.com';
   message = content;

   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver, // list of receivers
    subject: pdfFile, // Subject line
    html: message, // html body
    attachments: [
        {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/repair/${pdfFile}`
    },
    {
        filename: image.name,
        path: `../../uploads/images/locations/repair/${location}/${image.name}`
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
    let form = new Repair();
    form.location = location;
    form.brandName = brandName;
    form.machineType = machineType;
    form.machineTag = machineTag;
    form.problem = problem;
    form.repotedBy = reported;
    form.picture = `../../uploads/images/locations/repair/${location}/${image.name}`;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = repairRouter;