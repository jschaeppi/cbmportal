const express = require('express');
const propaneRouter = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
const Propane = require('../src/Model/propaneModel');
const Store = require('../src/Model/Stores')
let DepartmentModel = require('../src/Model/departmentModel');

propaneRouter.use(formidable({ uploadDir: './uploads/'}))

// current date
let date_ob = new Date();
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();
propaneRouter.get('/stores', (req, res) => {
    Store.find()
    .sort( { banner: -1 })
    .then(stores => res.json(stores));
    
});

propaneRouter.post('/', formidable(), async (req, res) => {
    const { employeeName, location, notes, tanksLeft, dm } = req.fields;
    const image = req.files.file;
    const imageName = image.name;
    const receiver = await DepartmentModel.findOne({ department: 'Operations'});

    await fs.mkdir(`../../uploads/locations/propane/${location}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder created successfully!');
    })
    await fs.rename(image.path, `../../uploads/locations/propane/${location}/${imageName}`, (err) => {
        if (err) {
            console.log('File couldn\'t be moved!');
        }
    })
    

   message = `<p>You have a new Propane Request</p>
   <p> </p>
   <table style="border-color: #000000; background-color: #5ecef7; width: 100%; height: 20px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="1">
   <tbody>
   <tr style="border-color: #000000;">
   <td style="border-color: #000000;">Store Number</td>
   <td style="border-color: #000000;">
   <pre>${location}</pre>
   </td>
   </tr>
   <tr style="border-color: #000000;">
   <td style="border-color: #000000;">Employee Name</td>
   <td style="border-color: #000000;"> 
   <pre>${employeeName}</pre>
   </td>
   </tr>
   <tr style="border-color: #000000;">
   <td style="border-color: #000000;">How many tanks left?</td>
   <td style="border-color: #000000;"> 
   <pre>${tanksLeft}</pre>
   </td>
   </tr>
   <tr style="border-color: #000000;">
   <td style="border-color: #000000;"> Notes:</td>
   <td style="border-color: #000000;"> 
   <pre> ${notes}</pre>
   </td>
   </tr>
   <tr style="border-color: #000000;">
   <td style="border-color: #000000;"> Date requested</td>
   <td style="border-color: #000000;">  ${month}/${day}/${year}</td>
   </tr>
   </tbody>
   </table>`;

   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: `Propane request for location ${location}`, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: {
        filename: imageName,
        path: `../../uploads/locations/propane/${location}/${imageName}`
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
    let form = new Propane();
    form.employeeName = employeeName;
    form.location = location;
    form.notes = notes;
    form.picture = `../../uploads/${image.name}`;
    form.tanksLeft = tanksLeft;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = propaneRouter;