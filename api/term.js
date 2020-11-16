const express = require('express');
const termRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
const pdf = require('html-pdf');
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
const Term = require('../src/Model/termModel');
const DepartmentModel = require('../src/Model/departmentModel');

termRouter.use(bodyParser.json());
termRouter.use(bodyParser.urlencoded({ extended: false }));

const date = apiFunc.date();
const uploadsDir = apiFunc.uploadsDir();

termRouter.post('/', async (req, res) => {
    //Other
    const { firstName, firstLast, employeeNum, secondLast, dm, rehire, } = req.body[0];
    let { warnings, norehireReason, quitReason, twoWeeks, lastWorked } = req.body[0];
    
    twoWeeks = (twoWeeks != '')? twoWeeks:'';
    warnings = (warnings != '')? warnings:'';
    norehireReason = (norehireReason != '')? norehireReason:'';
    quitReason = (quitReason != '')? quitReason:'';
    lastWorked = moment(lastWorked).format('L');
    const receiver = await DepartmentModel.findOne({ department: 'Carlson Terminations'});
    norehireReason = await translator(norehireReason, {to: 'en', from: 'es'});
    quitReason = await translator(quitReason, {to: 'en', from: 'es'});
    let pdfFile = `Employee-${employeeNum}-${firstName} ${firstLast} ${secondLast}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    content = HTML.term(firstName, firstLast, employeeNum, secondLast, dm.userFirst, dm.userLast, date, rehire, norehireReason, quitReason, lastWorked, twoWeeks, warnings)

    if (!content) {
        res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
    }
    
    //Create PDF
    pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/term/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
     });
     const message = `<p>You have a new Termination form for ${firstName} ${firstLast} #${employeeNum}.</p>
     <p> </p>
     <p> </p>
     <p> </p>
     <p> </p>
     <p>Submited by ${dm}</p>`
   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: `Termination request for employee ${employeeNum} ${firstName} ${firstLast} ${secondLast}`, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: {
        filename: pdfFile,
        path: `${uploadsDir}pdf/term/${pdfFile}`
    },
};
    try { 
        apiFunc.transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            console.log(err)
        } else {
        }
    });
    
    } catch(err) {
    console.log(err);
    }

    //DB insertions
    let form = new Term();
    form.firstName = firstName;
    form.employeeNum = employeeNum;
    form.dm = `${dm.userFirst} ${dm.userLast}`;
    form.firstLast = firstLast
    form.secondLast = secondLast;
    form.warnings = warnings;
    form.rehire = rehire;
    form.norehireReason = norehireReason;
    form.lastWorked = lastWorked;
    form.twoWeeks = twoWeeks
    form.date = date;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = termRouter;