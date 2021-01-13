const express = require('express');
const wtRouter = express.Router();
const bodyParser = require('body-parser');
const translator = require('translate');
const pdf = require('html-pdf');
const moment = require('moment');
const apiFunc = require('../../config/api_funcs');
const HTML = require('../../config/html');
let WorkTicket = require('../../src/Model/wtModel');
let DepartmentModel = require('../../src/Model/departmentModel');

wtRouter.use(bodyParser.json());
wtRouter.use(bodyParser.urlencoded({ extended: false }));

const date = apiFunc.date();
const uploadsDir = '../uploads/';

wtRouter.post('/', async (req, res, next) => {
    try {
    const { employeeNum, employeeName, dm, location, city, state, workType, Billable, currentLocation, orderSubmitted, orderNumber } = req.body;
    let { notes, equipment, orderDate, startDate, endDate } = req.body;
    orderDate = moment(orderDate).format('L');
    startDate = moment(startDate).format('L');
    endDate = moment(endDate).format('L');
    const receiver = await DepartmentModel.findOne({ department: 'Accounting'});
    notes = await translator(notes, {to: 'en', from: 'es'});
    equipment = await translator(equipment, {to: 'en', from: 'es'});
    let pdfFile = `WT-request-${dm.userFirst} ${dm.userLast}-${date}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    let content = HTML.wt(employeeNum, employeeName, dm.userFirst, dm.userLast, location, city, state, workType, Billable, currentLocation, orderSubmitted, orderNumber, notes, equipment, orderDate, startDate, endDate);
  
    if (!content) {
        res.status(500).json({ msg: 'Your form wasn\'t submitted successfully. Please reach out to IT.'})
    }
    
    //Create PDF
    pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/wt/${pdfFile}`, function(err, res) {
      if (err) {
        next(err);
      }
   });

   message = '<p>Attention Accounting Dept,</p>' +
   '<p>Please find attched a Project Work Ticket Request for the store <strong>' + location + '</strong>.</p>' +
   '<p>If you have any questions please contact me.</p>' +
   '<p>Thanks,</p>' +
   '<p>'+ dm.fullName + '</p>';

   //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    //to: receiver.email, // list of receivers
    to: 'joseph.schaeppi@carlsonbuilding.com',
    cc: dm.email,
    subject: pdfFile, // Subject line
    html: `${message}`, // html body
    attachments:
        {
        filename: `${pdfFile}`,
        path: `${uploadsDir}pdf/wt/${pdfFile}`
    },
};
     
        apiFunc.transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            next(err);
        }
    });

    //DB insertions
        let form = new WorkTicket();
        form.employeeName = employeeName;
        form.employeeNum = employeeNum;
        form.dm = `${dm.userFirst} ${dm.userLast}`;
        form.location = location;
        form.city = city;
        form.state = state;
        form.workType = workType; 
        form.Billable = Billable;
        form.notes = notes;
        form.equipment = equipment;
        form.currentLocation = currentLocation;
        form.orderSubmitted = orderSubmitted;
        form.orderDate = orderDate;
        form.orderNumber = orderNumber;
        form.startDate = startDate;
        form.endDate = endDate;
        form.date = date;
        form.save(function(err) {
            if (err) {
                next(err);
            } else {
                return res.json({message: true});
            }
        });
    } catch(err) {
        next(err)
    }
});

module.exports = wtRouter;