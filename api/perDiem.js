const express = require('express');
const perdiemRouter = express.Router();
const pdf = require('html-pdf');
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
let PerDiem = require('../src/Model/perdiemModel');
let DepartmentModel = require('../src/Model/departmentModel');

perdiemRouter.use(bodyParser.json());
perdiemRouter.use(bodyParser.urlencoded({extended: false}))

const date = apiFunc.date();
const uploadsDir = apiFunc.uploadsDir();


perdiemRouter.post('/', async (req, res, next) => {
    try {
        const {city, employeeName, employeeNum, location, state, dm }= req.body[0];
        let { comments, firstNight, lastNight, arrivalDate, departureDate } = req.body[0];
        firstNight = moment(firstNight).format('L');
        lastNight = moment(lastNight).format('L');
        arrivalDate = moment(arrivalDate).format('L');
        departureDate = moment(departureDate).format('L');
        const rows = [];
        const perDiemInfo = [];
        const receiver = await DepartmentModel.findOne({ department: 'Accounting'});
        comments = await translator(comments, {to: 'en', from: 'es'});
        let pdfFile = `PerDiem-Request-${employeeName}-${employeeNum}-${date}`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

        req.body.forEach( (item,i) => {
            rows.push(item.mileageDate);
            rows.push(item.arrivalStore);
            rows.push(item.destinationStore);
            rows.push(item.rtow);
            perDiemInfo.push('<tr>' +
            '<tr><!-- STARTS ROW1-->' +
            '<td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; font-size:90%;background: yellow;" colspan="0">' + moment(item.mileageDate).format('L') + '</td>' +
            '<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center;font-size:90%;background: yellow;" colspan="0">' + item.arrivalStore + '</td>' +
            '<td style="width: 250px; border: 2px solid black; padding:3px;text-align: center;font-size:90%;background: yellow;" colspan="0">' + item.destinationStore + '</td>' +
            '<td style="width: 60px; border: 2px solid black; padding:3px;text-align: center;font-size:90%;background: yellow;" colspan="0">' + item.rtow + '</td>' +
            '<td style="width: 70px; border: 2px solid black; padding:3px;text-align: center;font-size:90%; background: darkgray;" colspan="0">&nbsp;</td>' +
            '<td style="width: 70px; border: 2px solid black; padding:3px;text-align: center;font-size:90%; background: darkgray;" colspan="0">&nbsp;</td>' +
            '</tr><!-- ENDS ROW1-->');
    })
        let content = HTML.perDiem(city, employeeName, employeeNum, location, state, dm.userFirst, dm.userLast, comments, firstNight, lastNight, arrivalDate, departureDate, perDiemInfo, date);

        if (!content) {
            res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
        }
        
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/perDiem/${pdfFile}`, function(err, res) {
            if (err) {
                next(err);
            }
        });

    message = content;

    //Sending Mail
    mailOptions = {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        to: receiver.email, // list of receivers
        //to: 'joseph.schaeppi@carlsonbuilding.com',
        cc: dm.email,
        subject: pdfFile, // Subject line
        html: `${receiver.department} ${message}`, // html body
        attachments: [
            {
            filename: `${pdfFile}`,
            path: `${uploadsDir}pdf/perDiem/${pdfFile}`
            },
        ]
    };
        
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err)
            }
        });

        //DB insertions
        let form = new PerDiem();
        form.employeeName = employeeName;
        form.employeeNum = employeeNum;
        form.dm = `${dm.userFirst} ${dm.userLast}`;
        form.location = location;
        form.city = city;
        form.state = state;
        form.firstNight = firstNight;
        form.lastNight = lastNight;
        form.arrivalDate = arrivalDate;
        form.departureDate = departureDate;
        form.comments = comments;
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
                
    } catch (err) {
        next(err);
    }
});

module.exports = perdiemRouter;