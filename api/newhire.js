const express = require('express');
const newhireRouter = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');
const pdf = require('html-pdf');
const moment = require('moment')
const apiFunc = require('../config/api_funcs');
const HTML = require('../config/html');
const NewHire = require('../src/Model/newhireModel');
const DepartmentModel = require('../src/Model/departmentModel');

newhireRouter.use(formidable({ uploadDir: './uploads/'}));

const date = apiFunc.date();
const uploadsDir = apiFunc.uploadsDir();
const baseSite = apiFunc.baseSite();

newhireRouter.post('/', formidable(), async (req, res, next) => {
    try {
        const { dm_userFirst, dm_userLast, dm_email, location, hireType, email, address, phone, phone2, sex, numDays, wage, positions, hours, language, ssn, number } = req.fields;
        let { file1, file2, file3 } = req.files;
        let {firstDay, dob, firstName, firstLast, secondLast, middleName, newHireNotes } = req.fields;
        firstDay = moment(firstDay).format('MMM DD YYYY');
        dob = moment(dob).format('MMM DD YYYY');
        firstName = firstName.trim();
        firstLast = firstLast.trim();
        const receiver = await DepartmentModel.findOne({ department: 'New Hires'});
        if (file1.name === file2.name) {
            file2.name = path.basename(file2.name, path.extname(file2.name)) + "(1)" + path.extname(file2.name);
        }
            await fsPromises.mkdir(`${uploadsDir}images/newhires/${firstName}-${firstLast}`,{ recursive: true })
            await fsPromises.rename(file1.path, `${uploadsDir}images/newhires/${firstName}-${firstLast}/I-9-Page-1${path.extname(file1.name)}`);
            await fsPromises.rename(file2.path, `${uploadsDir}images/newhires/${firstName}-${firstLast}/I-9-Page-2${path.extname(file2.name)}`);
            await fsPromises.rename(file3.path, `${uploadsDir}images/newhires/${firstName}-${firstLast}/${file3.name}`.split(' ').join(''));
        
        let pdfFile = `Employee-${firstName}-${firstLast}-${secondLast}`;
        // Stripping special characters
        pdfFile = pdfFile + '.pdf'
        content = HTML.newhire(firstName, middleName, dm_userFirst, dm_userLast, firstLast, location, hireType, address, email, secondLast, phone, phone2, sex, numDays, wage, positions, hours, language, ssn, firstDay, dob, date, number, newHireNotes, i91=`${baseSite}images/newhires/${firstName}-${firstLast}/I-9-Page-1${path.extname(file1.name)}`, i92=`${baseSite}images/newhires/${firstName}-${firstLast}/I-9-Page-2${path.extname(file2.name)}`, idbadge=`${baseSite}images/newhires/${firstName}-${firstLast}/${file3.name}`.split(' ').join(''))
        if (!content) {
            res.status(500).json({ msg: 'Your form didn\'t process successfully.  Please reach out to IT.'});
        }
        //Create PDF
        pdf.create(content, apiFunc.pdfOptions()).toFile(`${uploadsDir}pdf/newhires/${pdfFile}`, function(err, res) {
            if (err) {
                next(err);
            }
        });

        const message = `<p>Hello HR team, You have a New Hire Information for <strong>${firstName} ${middleName} ${firstLast} ${secondLast} </strong>assigned to the account <strong>${location}</strong><br /> Please process the information and send out the employee PIN number ASAP. Thanks </p>
        <p> </p>
        <p><strong>${dm_userFirst} ${dm_userLast}</strong></p>
        <p> </p>`
    
        //Sending Mail
    mailOptions = {
        from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
        to: receiver.email, // list of receivers
        cc: dm_email,
        subject: `New Hire request for employee ${firstName} ${firstLast} ${secondLast}`, // Subject line
        html: `${receiver.department} ${message}`, // html body
        attachments: [
            {
            filename: pdfFile,
            path: `${uploadsDir}pdf/newhires/${pdfFile}`
        },
        {
            filename: `I-9 Page 1${path.extname(file2.name)}`,
            path: `${uploadsDir}images/newhires/${firstName}-${firstLast}/I-9-Page-1${path.extname(file1.name)}`.split(' ').join('')
        },
        {
            filename: `I-9 Page 2${path.extname(file2.name)}`,
            path: `${uploadsDir}images/newhires/${firstName}-${firstLast}/I-9-Page-2${path.extname(file2.name)}`.split(' ').join('')
        },
        {
            filename: file3.name,
            path: `${uploadsDir}images/newhires/${firstName}-${firstLast}/${file3.name}`.split(' ').join('')
        },
        ]
    };
            apiFunc.transporter.sendMail(mailOptions,(err, info) => {
            if (err) {
                next(err);
            }
        });

        //DB insertions
        let form = new NewHire();
        form.date = date;
        form.firstName = firstName;
        form.middleName = middleName;
        form.firstLast = firstLast;
        form.secondLast = secondLast;
        form.dm = `${dm_userFirst} ${dm_userLast}`;
        form.firstDay = firstDay;
        form.dob = dob;
        form.location = location;
        form.hireType = hireType;
        form.address = address;
        form.email = email;
        form.phone = phone;
        form.phone2 = phone2;
        form.sex = sex;
        form.numDays = numDays;
        form.wage = wage;
        form.positions = positions;
        form.hours = hours;
        form.language = language;
        form.ssn = ssn;
        form.i91 = `${baseSite}images/newhires/${firstName}-${firstLast}/I-9-Page-1${path.extname(file1.name)}`.split(' ').join('');
        form.i92 =  `${baseSite}images/newhires/${firstName}-${firstLast}/I-9-Page-2${path.extname(file2.name)}`.split(' ').join('');
        form.idbadge = `${baseSite}images/newhires/${firstName}-${firstLast}/${file3.name}`.split(' ').join('');
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

module.exports = newhireRouter;
