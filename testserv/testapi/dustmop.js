const express = require('express');
const dustmopRouter = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');
const path = require('path');
let { transporter, mailOptions, message } = require('../../config/mailer');
let { options } = require('../../config/html')
const Dustmop = require('../../src/Model/dustmopModel');
const Store = require('../../src/Model/Stores')

dustmopRouter.use(formidable({ uploadDir: './../uploads/'}))
let date_ob = new Date();
// current date
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();

dustmopRouter.get('/stores', (req, res) => {
    Store.find()
    .sort( { banner: -1 })
    .then(stores => res.json(stores));
    
});

dustmopRouter.post('/', formidable(), async (req, res) => {
    const { employeeName, location, mopsLeft, dm } = req.fields;
    const image = req.files.file;
    const imageName = image.name;
    await fs.mkdir(`../uploads/images/locations/dustmop/${location}`, (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Folder created successfully!');
    })
    await fs.rename(image.path, `../uploads/images/locations/dustmop/${location}/${imageName}`, (err) => {
        if (err) {
            console.log('File couldn\'t be moved!');
        }
    })
    

   receiver = 'joseph.schaeppi@carlsonbuilding.com';
   message = `<head>
   <style>
   html {
    50%;
}
</style>
   </head<<p>You have a new request of Dust Mops</p>
   <p> </p>
   <table style="border-color: #000000; background-color: #5ecef7; width: 100%; height: 20px; margin-left: auto; margin-right: auto;" border="1" cellspacing="0" cellpadding="1">
   <tbody>
   <tr>
   <td>Store Number</td>
   <td>
   <pre> ${location}</pre>
   </td>
   </tr>
   <tr>
   <td>Employee Name</td>
   <td> 
   <pre>${employeeName}</pre>
   </td>
   </tr>
   <tr>
   <td>How Many clean are left?</td>
   <td> 
   <pre>${mopsLeft}</pre>
   </td>
   </tr>
   <tr>
   <td> Date requested</td>
   <td>  ${month}/${day}/${year}</td>
   </tr>
   </tbody>
   </table>`;

   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: 'joseph.schaeppi@carlsonbuilding.com', // list of receivers
    cc: dm.email,
    subject: `Dustmop request for location ${location}`, // Subject line
    html: message, // html body
    attachments: {
        filename: imageName,
        path: `../uploads/images/locations/dustmop/${location}/${imageName}`
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
    let form = new Dustmop();
    form.employeeName = employeeName;
    form.location = location;
    form.picture = `../../uploads/images/locations/dustmop/${location}/${imageName}`;
    form.mopsLeft = mopsLeft;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = dustmopRouter;