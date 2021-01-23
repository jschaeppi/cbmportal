const express = require('express');
const ptoRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const apiFunc = require('../../config/api_funcs');
const HTML = require('../../config/html');
const PTO = require('../../src/Model/ptoModel');
let DepartmentModel = require('../../src/Model/departmentModel');
const { nextTick } = require('process');

ptoRouter.use(bodyParser.json());
ptoRouter.use(bodyParser.urlencoded({ extended: false }));
const date = apiFunc.date();
const uploadsDir = '../uploads/';
const baseSite = 'https://cbmportal.com/cbm_forms/frontend/testserv/uploads/';

ptoRouter.post('/', async (req, res, next) => {
    try {
        const { employeeName, employeeNum, dm, departments, hours, approval, sig } = req.body;
        let { comments, absencefrom, absenceto } = req.body;
        absencefrom = moment(absencefrom).format('L');
        absenceto = moment(absenceto).format('L');
        const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
        comments = await translator(comments, {to: 'en', from: 'es'});
        let base64String = sig;
        // Remove header
        let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
        let base64Image = new Buffer.from(base64Data, 'base64');
                await fsPromises.mkdir(`${uploadsDir}signatures/ptoSig/${employeeNum}`, { recursive: true });
                await fsPromises.writeFile(`${uploadsDir}signatures/ptoSig/${employeeNum}/${date}.png`, base64Image);
        let pdfFile = `Employee-${employeeNum}-${employeeName}`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

        content = HTML.pto(employeeName, employeeNum, dm.userFirst, dm.userLast, departments, hours, approval, comments, absencefrom, absenceto, date);

        if (!content) {
            res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
        }
        
        //Create PDF
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/pto/${pdfFile}`, function(err, res) {
            if (err) {
            return console.log(err);
            }
        });

        const message = `<p><span style="font-size: 12pt;">Attention Payroll Department, Attached is a PTO Form for the employee <strong>${employeeName} #</strong><strong>${employeeNum}.</strong></span></p>
        <p><span style="font-size: 12pt;">Please Process this form ASAP.</span></p>
        <p><span style="font-size: 12pt;">Thank you for your cooperation.</span></p>
        <p><span style="font-size: 12pt;"></span></p>
        <p> </p>
        <p> </p>
        <p> </p>
        <hr />
        <p>PTO Form submitted on <em>${date}</em></p>`
    
        //Sending Mail
    mailOptions = {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        //to: receiver.email, // list of receivers
        to: 'joseph.schaeppi@carlsonbuilding.com', 
        cc: dm.email,
        subject: `PTO request for employee ${employeeNum} ${employeeName}`, // Subject line
        html: `${message}`, // html body
        attachments: {
            filename: pdfFile,
            path: `${uploadsDir}pdf/pto/${pdfFile}`
        },
    };
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
                if (err) {
                    next(err);
                }
            });

        //DB insertions
        let form = new PTO();
        form.employeeName = employeeName;
        form.employeeNum = employeeNum;
        form.dm = `${dm.userFirst} ${dm.userLast}`;
        form.departments = departments
        form.absencefrom = absencefrom;
        form.absenceto = absenceto;
        form.hours = hours;
        form.approval = approval;
        form.comments = comments;
        form.date = date;
        form.sig = `${baseSite}signatures/ptoSig/${employeeNum}/${date}.png/`
        form.save(function(err) {
            if (err) {
                next(err);
            } else {
                return res.json({message: true});
            }
        });
    } catch (err) {
        next(err)       
    }
});

module.exports = ptoRouter;