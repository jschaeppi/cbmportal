const express = require('express');
const mileageRouter = express.Router();
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
let Mileage = require('../src/Model/mileageModel');
let DepartmentModel = require('../src/Model/departmentModel');


mileageRouter.use(bodyParser.json());
mileageRouter.use(bodyParser.urlencoded({extended: false}))

const date = apiFunc.date();

mileageRouter.post('/', async (req, res, next) => {
    const { dm, employeeName, employeeNum } = req.body[0];
    let { comments } = req.body[0];
    const rows = [];
    const mileageInfo = [];
    const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
    comments = await translator(comments, {to: 'en', from: 'es'});
    let pdfFile = `Mileage-Request-${employeeName}-${date}`;

    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    req.body.forEach( (item,i) => {
        rows.push(item.mileageDate);
        rows.push(item.starting);
        rows.push(item.destination);
        mileageInfo.push('<tr>' +
        '<td height="25px" width="25%" style="border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">' + moment(item.mileageDate).format('L') + '</td>' +
        '<td height="25px" style="border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">' + item.starting + '</td>' +
        '<td height="25px" style="border: 1px solid black; border-bottom: 0; padding: 3px;">' + item.destination + '</td>' +
        '</tr>');
})
    let content = HTML.mileageHtml(employeeName, employeeNum, dm.userFirst, dm.userLast, mileageInfo, comments)
  //Create PDF
  pdf.create(content, apiFunc.pdfOptions()).toFile(`${apiFunc.uploadsDir()}pdf/mileage/${pdfFile}`, function(err, res) {
    if (err) {
        next(err);
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
        path: `${apiFunc.uploadsDir()}pdf/mileage/${pdfFile}`
        },
    ]
};
    try { 
        apiFunc.transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            next(err)
        }
    });
    
    } catch(err) {
        next(err);
    }

    //DB insertions
    let form = new Mileage();
    form.dm = `${dm.userFirst} ${dm.userLast}`;
    form.employeeName = employeeName;
    form.employeeNum = employeeNum;
    form.notes = comments;
    form.date = date;
    rows.forEach((item, i) => {
        form.mileage.push(item);
    })
    form.save(function(err) {
        if (err) {
            next(err);
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = mileageRouter;