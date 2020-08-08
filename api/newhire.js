const express = require('express');
const newhireRouter = express.Router();
const formidable = require('express-formidable');
const fs = require('fs');
const pdf = require('html-pdf');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
const NewHire = require('../src/Model/newhireModel');
const Store = require('../src/Model/Stores');
const DepartmentModel = require('../src/Model/departmentModel');

newhireRouter.use(formidable({ uploadDir: './uploads/'}));

// current date
let date_ob = new Date();
// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();

newhireRouter.get('/stores/:id', (req, res) => {
    Store.find( { dm: req.params.id }, (err, result) => {
        if (err) {
            console.log(err)
        } else {
            res.json(result)
        }
    }
    )
});

newhireRouter.post('/', formidable(), async (req, res) => {

    const { firstName, middleName, dm, firstLast, firstDay, dob, location, hireType, address, email, secondLast, phone, phone2, sex, numDays, wage, positions, hours, language, ssn } = req.fields;
    const { file1, file2, file3 } = req.files;
    const receiver = await DepartmentModel.findOne({ department: 'Human Resources'});

    try {
        await fs.mkdir(`../../uploads/images/newhires/${firstName} ${firstLast}`, (err) => {
            if (err) {
                console.log(err);
            }
            console.log('Folder created successfully!');
        })
        await fs.rename(file1.path, `../../uploads/images/newhires/${firstName} ${firstLast}/${file1.name}`, (err) => {
            if (err) {
                console.log('File couldn\'t be moved!');
            }
        })
        await fs.rename(file2.path, `../../uploads/images/newhires/${firstName} ${firstLast}/${file2.name}`, (err) => {
            if (err) {
                console.log('File couldn\'t be moved!');
            }
        })
        await fs.rename(file3.path, `../../uploads/images/newhires/${firstName} ${firstLast}/${file3.name}`, (err) => {
            if (err) {
                console.log('File couldn\'t be moved!');
            }
        })
    } catch(err) {
        console.log(err);
    }
    


    let pdfFile = `Employee-${firstName}-${firstLast} ${secondLast}`;
    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    content = `<html>
    <head>
    <style>
    .EEsignature img{
    width:200px; vertical-align: text-bottom;
    }
    .DMOSsign img{
    width:200px;vertical-align: text-bottom;
    }
    html {
        zoom: .55;
    }
    </style>
    </head>
    <body>
    <table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
<tbody>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
<tbody>
<tr>
<td><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="336" height="102" /></td>
<td style="text-align: right; font-weight: bold; font-size: 330%;">Carlson Building Maintenance</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 140%;">&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 140%;">&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 190%; padding-left: 5px;">New Hire Form</td>
<td style="font-weight: bold; font-size: 190%; padding-left: 5px;text-align:right">&nbsp;${month}/${day}/${year}</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
<tbody>
<tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: #25354c;">
<td style="height: 29px; font-weight: bold; font-size: 110%;">New Hire Details</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
<tbody>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">New Hire/Rehire</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${hireType}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">First Name</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${firstName}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Middle Name</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${middleName}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Last name</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${firstLast} </td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Second Last Name</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${secondLast}</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
<td style="border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
<td style="border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Address</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${address}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Phone Number</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${phone}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Phone Alternative</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${phone2}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Email</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${email}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Social Security Number</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${ssn}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Date Of Birth</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${dob}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Male/Female</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${sex}</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
<td style="border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
<td style="border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">First Day Worked</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${firstDay}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Title Position</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${positions}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Store Name and Number</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${location}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">District Manager</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${dm}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Pay Rate/hour</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${wage}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Hours Scheduled per week</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${hours}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Number of Working Days</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${numDays}</td>
</tr>
<tr>
<td style="width: 48%; border: 1px solid black; padding: 3px;">Preferred Language</td>
<td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
<td style="width: 48%; border: 1px solid black; padding: 3px;">${language}</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
<tbody>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
</tbody>
</table>
    </body>
    </html>`;

    //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/newhires/${pdfFile}`, function(err, res) {
        if (err) {
        return console.log(err);
        }
     });

     const message = `<p>Hello HR team, You have a New Hire Information for <strong>${firstName} ${middleName} ${firstLast} ${secondLast} </strong>assigned to the account <strong>${location}</strong><br /> Please process the information and send out the employee PIN number ASAP. Thanks </p>
     <p> </p>
     <p><strong>${dm}</strong></p>
     <p> </p>`
   
     //Sending Mail
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    subject: `New Hire request for employee ${firstName} ${firstLast} ${secondLast}`, // Subject line
    html: `${receiver.department} ${message}`, // html body
    attachments: [
        {
        filename: pdfFile,
        path: `../../uploads/pdf/newhires/${pdfFile}`
    },
    {
        filename: file1.name,
        path: `../../uploads/images/newhires/${firstName} ${firstLast}/${file1.name}`
    },
    {
        filename: file2.name,
        path: `../../uploads/images/newhires/${firstName} ${firstLast}/${file2.name}`
    },
    {
        filename: file3.name,
        path: `../../uploads/images/newhires/${firstName} ${firstLast}/${file3.name}`
    },
    ]
};
    try { 
        transporter.sendMail(mailOptions,(err, info) => {
        if (err) {
            console.log(err)
        } else {
        }
    });
    
    } catch(err) {
    console.log(err);
    }

    //DB insertions
    let form = new NewHire();
    form.firstName = firstName;
    form.middleName = middleName;
    form.dm = dm;
    form.firstLast = firstLast;
    form.firstDay = firstDay;
    form.dob = dob;
    form.location = location;
    form.hireType = hireType;
    form.address = address;
    form.email = email;
    form.secondLast = secondLast;
    form.phone = phone;
    form.phone2 = phone2;
    form.sex = sex;
    form.numDays = numDays;
    form.wage = wage;
    form.positions = positions;
    form.hours = hours;
    form.language = language;
    form.ssn = ssn;
    form.i91 = `../../uploads/${file1.name}`;
    form.i92 =  `../../uploads/${file2.name}`;
    form.idbadge = `../../uploads/${file3.name}`;
    form.save(function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = newhireRouter;