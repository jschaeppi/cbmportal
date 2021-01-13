const express = require('express');
const moment = require('moment');
const backpayRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const apiFunc = require('../../config/api_funcs');
const HTML = require('../../config/html');
let Backpay = require('../../src/Model/backpayModel');
let DepartmentModel = require('../../src/Model/departmentModel');
backpayRouter.use(bodyParser.json());
backpayRouter.use(bodyParser.urlencoded({extended: false}));

const date = apiFunc.date();
const baseSite = apiFunc.baseSite();
const uploadsDir = '../uploads';

backpayRouter.post('/', async (req, res, next) => {
    try {
        const { dm, employeeNum, employeeName, sig, store } = req.body[0];
        let { comments } = req.body[0], backpayInfo = [], total = 0, shift = 0, breakTime = 0; 
        let base64String = sig;
        //Translating from spanish to English
        comments = await translator(comments, { to: 'en', from: 'es'});
        
        // Converting signature to base64
        let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        let base64Image = new Buffer.from(base64Data, 'base64');

        //Insert Signatures into files
        const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
        await fsPromises.mkdir(`${uploadsDir}signatures/backPaySig/${employeeNum}`, { recursive: true });
        await fsPromises.writeFile(`${uploadsDir}signatures/backPaySig/${employeeNum}/${date}.png`, base64Image);
            
        //Generating Bonuse Rows
        backpayInfo = req.body.map( (item,i) => {
            item.out = moment(item.out, 'HH:mm').format()
            item.in = moment(item.in, 'HH:mm').format();
            if ((!item.return_lunch) || (!item.left_lunch)) {
                total = moment(item.out).diff(item.in, 'hours');
                return ('<tr>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.date).format('l') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.in).format('LT') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;"> No Time </td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;"> No Time </td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.out).format('LT') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + total + ' hrs</td>' +
                '</tr>');
            } else {
                item.return_lunch = moment(item.return_lunch, 'HH:mm').format();
                item.left_lunch = moment(item.left_lunch, 'HH:mm').format();
                shift = moment(item.out).diff(item.in, 'hours');
                breakTime = moment(item.return_lunch).diff(item.left_lunch, 'hours');
                total = (shift-breakTime);
                return ('<tr>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.date).format('l') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.in).format('LT') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.left_lunch).format('LT') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.return_lunch).format('LT') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + moment(item.out).format('LT') + '</td>' +
                '<td style="width: 150px; height: 20px; border: 1px solid black; padding: 1px; text-align: center;">' + total + ' hrs</td>' +
                '</tr>');
            }
                    
    })
        
        let pdfFile = `Employee_${employeeNum}`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

        //Combine HTML & Data
        let content = HTML.backPayHtml(employeeName, employeeNum, backpayInfo, comments, store, dm.userFirst, dm.userLast, date, baseSite);
        if (!content) {
            res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
        }

        message = 'Please process this backpay request.';
        
        //PDF Generation
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/backpay/${pdfFile}`, function(err, res) {
        if (err) {
            next(err);
        }
    });


    //Sending Mail
    mailOptions = {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        to: 'joseph.schaeppi@carlsonbuilding.com', // list of receivers
        cc: dm.email,
        subject: `Backpay request for ${employeeNum}`, // Subject line
        text: `${receiver.department} ${message}`, // plain text body
        attachments: {
            filename: `${pdfFile}`,
            path: `${uploadsDir}pdf/backpay/${pdfFile}`
        },
    };
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err);
            }
        });

        //DB insertions
        let form = new Backpay();
            form.employeeName = employeeName;
            form.employeeNum = employeeNum;
            form.dm = dm.fullName;
            backpayInfo.forEach((item, i) => {
                form.backpay.push(item);
            })
            form.comments = comments;
            form.date = date;
            form.sig = `${baseSite}signatures/backPaySig/${employeeNum}/${date}.png`;
            form.save(function(err) {
            if (err) {
                next(err)
            } else {
                return res.json({message: true});
            }
        });
    } catch (err) {
        next(err);    
    }
});

module.exports = backpayRouter;