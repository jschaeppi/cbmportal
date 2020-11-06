const express = require('express');
const hotelRouter = express.Router();
const pdf = require('html-pdf');
const fsPromises = require('fs').promises;
const bodyParser = require('body-parser');
const translator = require('translate');
const moment = require('moment');
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
let Hotel = require('../src/Model/hotelModel');
let PS = require('../src/Model/psModel');
let DepartmentModel = require('../src/Model/departmentModel');

hotelRouter.use(bodyParser.json());
hotelRouter.use(bodyParser.urlencoded({extended: false}))

const date = apiFunc.date();
const uploadsDir = apiFunc.uploadsDir();

hotelRouter.get('/ps/:district', async (req, res) => {
    const districts = req.params.district;
    if (districts.length > 1) {
        let result = await PS.find({district: {$in: districts.split(',')}}).lean().sort( { district: -1});
        res.json(result);
    } else {
        let result = await PS.find({ district: districts }).lean().sort({ district: -1})
        res.json(result);
}
});

hotelRouter.post('/', async (req, res, next) => {
    try {
        const { listPs1, listPs2, dm, store, checkIn, checkOut, roomNum, peopleNum, newPS, hotelReason, WT, beds } = req.body;
        let { notes } = req.body
        if (newPS !== "") {
            const listPs1 = "";
            const listPs2 = "";
        }
        notes = await translator(notes, {to: 'en', from: 'es'});
            await fsPromises.mkdir(`${uploadsDir}pdf/hotel/${date}`, {recursive: true});
        const receiver = await DepartmentModel.findOne({ department: 'Accounting'});
        let pdfFile = `Hotel-Request-${dm.userFirst} ${dm.userLast}-${time}`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

        let content = HTML.hotelHtml(date, dm.userFirst, dm.userLast, store, moment(checkIn).format('L'), moment(checkOut).format('L'), listPs1, listPs2, newPS, WT, hotelReason, beds, roomNum, notes)

    //Create PDF
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/hotel/${date}/${pdfFile}`, function(err, res) {
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
            filename: `Hotel-Request-${dm.userFirst} ${dm.userLast}`,
            path: `${uploadsDir}pdf/hotel/${date}/${pdfFile}`
            },
        ]
    };
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err)
            }
        });

        //DB insertions
        let form = new Hotel();
        form.dm = dm.fullName;
        form.store = store;
        form.checkIn = checkIn;
        form.checkOut = checkOut;
        form.listPs1 = listPs1;
        form.listPs2 = listPs2;
        form.roomNum = roomNum;
        form.peopleNum = peopleNum;
        form.beds = beds;
        form.newPS = newPS;
        form.hotelReason = hotelReason;
        form.WT = WT;
        form.notes = notes;
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

module.exports = hotelRouter;
