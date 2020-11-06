const express = require('express');
const targetorderRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const pdf = require('html-pdf');
const fs = require('fs');
const fsPromises = fs.promises;
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
const supplyOrder = require('../src/Model/targetsupply');
let DepartmentModel = require('../src/Model/departmentModel');
const cors = require('cors');

targetorderRouter.use(cors({
    origin: ['http://portal.cbmportal.com','http://portal.cbmportal.com:5000', 'http://127.0.0.1'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
  }));

targetorderRouter.use(bodyParser.json());
targetorderRouter.use(bodyParser.urlencoded({ extended: false }));

const date = apiFunc.date();
const uploadsDir = apiFunc.uploadsDir();

targetorderRouter.post('/', async (req, res, next) => {
    try {
        const { employeeName, location, order } = req.body;
        const dm = req.body.dm;
        let { notes } = req.body;
        notes = await translator(notes, {to: 'en', from: 'es'});
        order.shift();
        const receiver = await DepartmentModel.findOne({ department: 'Supplies'});
        await fsPromises.mkdir(`${uploadsDir}pdf/targetsupply/${date}`, {recursive: true});

        //Filter C code items and sorted numerically
        const sortedOrder = order.filter(item => {
            if (item['item'].charAt(0) === "C" && item['amount'] != 0 && item['amount'] != 'Quantity' ) {;
                return item['item'];
            }
        }).sort((a,b) => {
            if (a['item'] > b['item']) {
                return 1
            } else if (a['item'] < b['item']) {
                return -1
            } else {
                return 0;
            }
        });
        //Added the non C code items to sorted Array
        order.forEach(item => {
            if (item['item'].charAt(0) !== "C" && item['amount'] != 0 && item['amount'] != "Quantity") {
                sortedOrder.push(item);
                
            }
        })

            //Created HTML Item list for PDF
            let orders = [];
            sortedOrder.forEach(item => {
            orders.push('<tr>'+
            '<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;  width: 70%;">' + item["item"] + '</td>' +
                '<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;  width: 30%;">' + item["amount"] + '</td>' +
            '</tr>')
        })

        let pdfFile = `${location}-Monthly supply order`;
        // Stripping special characters
        pdfFile = encodeURIComponent(pdfFile) + '.pdf'

        const content = HTML.targetOrder(employeeName, location, notes, orders);

        //Create PDF
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/targetsupply/${date}/${pdfFile}`, function(err, res) {
            if (err) {
                next(err);
            }
        });
        const message = `<p><span style="font-size: 12pt;">Here is a new supply request from ${location}
        <p><span style="font-size: 12pt;"></span></p>
        <p> </p>
        <p>Target Supply submitted by ${dm.userFirst} ${dm.userLast}</p>`
    //Sending Mail
        mailOptions = {
            from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
            to: receiver.email, // list of receivers
            //to: 'joseph.schaeppi@carlsonbuilding.com',
            cc: dm.email,
            subject: `${location} - Monthly supply order`, // Subject line
            html: message, // html body
            attachments: {
                filename: pdfFile,
                path: `${uploadsDir}pdf/targetsupply/${date}/${pdfFile}`
            },
        };
        apiFunc.transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            next(err);
        }
    });
        //DB insertions
        let form = new supplyOrder();
        form.employeeName = employeeName;
        form.dm = `${dm.userFirst} ${dm.userLast}`;
        orders.forEach((item, i) => {
            form.order.push(item);
        })
        form.location = location;
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

module.exports = targetorderRouter;