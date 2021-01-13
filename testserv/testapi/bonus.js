const express = require('express');
const bonusRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const moment = require('moment');
const apiFunc = require('../../config/api_funcs');
const HTML = require('../../config/html');
let { transporter, mailOptions, message } = require('../../config/mailer');
require('../../config/html')
const Bonuses = require('../../src/Model/bonusModel');
const DepartmentModel = require('../../src/Model/departmentModel');
const translator = require('translate');

message = 'Please process this bonus request.';
bonusRouter.use(bodyParser.json());
bonusRouter.use(bodyParser.urlencoded({extended: false}));

// current date
const date = apiFunc.date();
const baseSite = apiFunc.baseSite();
const uploadsDir = apiFunc.uploadsDir();

bonusRouter.post('/test', async (req, res, next) => {
    try {
    //console.log(req.data[0].body.sig);
        const { dm, employeeNum, sig, employeeName } = req.body[0];
        let { comments } = req.body[0];
        const rows = [];
        let bonusInfo = [];
    const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
    
    //Translating from spanish to English
    comments = await translator(comments, { to: 'en', from: 'es'});

    //acquiring signature
    let base64String = sig;
    // Remove header
    let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
 
    //converting from base64 to image
    let base64Image = new Buffer.from(base64Data, 'base64');

    //Make new folder for request
    await fsPromises.mkdir(`../uploads/signatures/bonusPaySig/${employeeNum}`, { recursive: true });

    //Write signature to file
    await fsPromises.writeFile(`../uploads/signatures/bonusPaySig/${employeeNum}/${date}.png`, base64Image);

    //Generating Bonuse Rows
        req.body.forEach( (item,i) => {
                rows.push(item.date);
                rows.push(item.location);
                rows.push(item.bonus);
                bonusInfo.push('<tr style="height: 25px;">' +
    '<td style="width: 15%; height: 25px; text-align: center; font-weight: bold; border: 1px solid black;">&nbsp;' + moment(item.date).format('L') + '</td>' +
   '<td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 1px solid black;">&nbsp;' + item.location + '</td>' +
    '<td style="width: 15%; font-weight: bold; height: 25px; border: 1px solid black; text-align: center;">&nbsp;$' + item.bonus + '</td></tr>');
})
    let pdfFile = `Employee_${employeeNum}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'


    let content = HTML.bonusHtml(employeeName, employeeNum, bonusInfo, comments, date, baseSite);

  //Create PDF
    pdf.create(content, apiFunc.pdfOptions()).toFile(`../uploads/pdf/bonus/${pdfFile}`, function(err, res) {
      if (err) {
        next(err);
      }
   });


   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: 'joseph.schaeppi@carlsonbuilding.com', // list of receivers
    cc: dm.email,
    subject: `Bonus request for ${employeeNum}`, // Subject line
    text: `${receiver.department} ${message}`, // plain text body
    attachments: {
        filename: `${pdfFile}`,
        path: `${uploadsDir}pdf/bonus/${pdfFile}`.split(' ').join('')
    },
};
        apiFunc.transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            next(err);
        }
    });

    //DB insertions
    let form = new Bonuses();
        form.employeeName = employeeName;
        form.employeeNum = employeeNum;
        form.dm = dm.fullName;
        bonusInfo.forEach((item, i) => {
            form.bonus.push(item);
        })
        form.comments = comments;
        form.date = date;
        form.save(function(err) {
        if (err) {
            next(err);
        } else {
            return res.json({message: true});
        }
    });
            
    } catch (err) {
        next(err);
    }
})
bonusRouter.post('/', async (req, res, next) => {
    try {
        //console.log(req.data[0].body.sig);
        const { dm, employeeNum, sig, employeeName } = req.body[0];
        let { comments } = req.body[0];
        const rows = [];
        let bonusInfo = [];
        const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
        
        //Translating from spanish to English
        comments = await translator(comments, { to: 'en', from: 'es'});

        //acquiring signature
        let base64String = sig;
        // Remove header
        let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    
        //converting from base64 to image
        let base64Image = new Buffer.from(base64Data, 'base64');
        //Make new folder for request
        await fsPromises.mkdir(`${uploadsDir}signatures/bonusPaySig/${employeeNum}`, { recursive: true });
        //Write signature to file
        await fsPromises.writeFile(`${uploadsDir}signatures/bonusPaySig/${employeeNum}/${date}.png`, base64Image);

        //Generating Bonuse Rows
            req.body.forEach( (item,i) => {
                    rows.push(item.date);
                    rows.push(item.location);
                    rows.push(item.bonus);
                    bonusInfo.push('<tr style="height: 25px;">' +
        '<td style="width: 15%; height: 25px; text-align: center; font-weight: bold; border: 1px solid black;">&nbsp;' + moment(item.date).format('L') + '</td>' +
    '<td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 1px solid black;">&nbsp;' + item.location + '</td>' +
        '<td style="width: 15%; font-weight: bold; height: 25px; border: 1px solid black; text-align: center;">&nbsp;' + item.bonus + '</td></tr>');
    })
        let pdfFile = `Employee_${employeeNum}`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'


        let content = HTML.bonusHtml(employeeName, employeeNum, bonusInfo, comments, date, baseSite);

        if (!content) {
            res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
        }
        
    //Create PDF
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/bonus/${pdfFile}`, function(err, res) {
        if (err) {
            next(err);
        }
    });


    //Sending Mail
    mailOptions = {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        to: receiver.email, // list of receivers
        cc: dm.email,
        subject: `Bonus request for ${employeeNum}`, // Subject line
        text: `${receiver.department} ${message}`, // plain text body
        attachments: {
            filename: `${pdfFile}`,
            path: `${uploadsDir}pdf/bonus/${pdfFile}`.split(' ').join('')
        },
    };
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err);
            }
        });

        //DB insertions
        let form = new Bonuses();
            form.employeeName = employeeName;
            form.employeeNum = employeeNum;
            form.dm = dm.fullName;
            bonusInfo.forEach((item, i) => {
                form.bonus.push(item);
            })
            form.comments = comments;
            form.date = date;
            form.save(function(err) {
            if (err) {
                next(err);
            } else {
                return res.json({message: true});
            }
        });
    } catch (err) {
        next(err);
    }
});

module.exports = bonusRouter;