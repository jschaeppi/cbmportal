/* global document */
const express = require('express');
const uniformRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
let Uniform = require('../src/Model/uniformModel');
let DepartmentModel = require('../src/Model/departmentModel');

uniformRouter.use(bodyParser.json());
uniformRouter.use(bodyParser.urlencoded({extended: false}));

const date = apiFunc.date();
const uploadsDir = apiFunc.uploadsDir();


uniformRouter.post('/', async (req, res, next) => {
    try {
        const { employeeNum, firstName, lastName, address, apt, city, state, zip, cost, quantity, size, date, dm, sig } = req.body;
        const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
        let base64String = sig;
        // Remove header
        let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
        let base64Image = new Buffer.from(base64Data, 'base64');

        await fsPromises.mkdir(`${uploadsDir}signatures/${employeeNum}`.split(' ').join(''), { recursive: true });
        await fsPromises.writeFile(`${uploadsDir}signatures/${employeeNum}/uniformSig${date}.png`, base64Image);

        let pdfFile = `Uniform-Order-${employeeNum}`;

        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

        let content = HTML.uniform(employeeNum, firstName, lastName, address, apt, city, state, zip, cost, quantity, size, date, dm);

    //Create PDF
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/uniform/${pdfFile}`, function(err, res) {
        if (err) {
            next(err);
        }
    });

    message = `Please process this uniform order for employee ${employeeNum} ${firstName} ${lastName}`;

    //Sending Mail
    mailOptions = {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        to: receiver.email, // list of receivers
        //to: 'joseph.schaeppi@carlsonbuilding.com',
        cc: dm.email,
        subject: pdfFile, // Subject line
        html: `${receiver.department} ${message} <br /> ${content}`, // html body
        attachments: {
            filename: `${pdfFile}`,
            path: `${uploadsDir}pdf/uniform/${pdfFile}`
        },
    };
        
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err);
            }
        });

        //DB insertions
        let form = new Uniform();
        form.employeeNum = employeeNum,
        form.firstName = firstName,
        form.lastName = lastName,
        form.address = address, 
        form.apt = apt,
        form.city = city,
        form.state = state,
        form.zip = zip,
        form.cost = cost, 
        form.quantity = quantity,
        form.size = size,
        form.date = date
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

module.exports = uniformRouter;