/* global document */
const express = require('express');
const uniformRouter = express.Router();
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const fs = require('fs');
let { transporter, mailOptions, receiver, message } = require('../src/config/mailer');
let { options } = require('../src/config/html')
let Uniform = require('../src/Model/uniformModel');
let DepartmentModel = require('../src/Model/departmentModel');

uniformRouter.use(bodyParser.json());
uniformRouter.use(bodyParser.urlencoded({extended: false}));

// current date
let date_ob = new Date();

// adjust 0 before single digit date
let day = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();

uniformRouter.get('/', (req, res) => {

    
});

uniformRouter.post('/', async (req, res) => {
  const { employeeNum, firstName, lastName, address, apt, city, state, zip, cost, quantity, size, date, dm } = req.body;
  const receiver = await DepartmentModel.findOne({ department: 'Payroll'});
    let base64String = req.body.sig;
    // Remove header
    let base64Data = base64String.replace(/^data:image\/(png|jpeg|jpg);base64,/, '');
    let base64Image = new Buffer.from(base64Data, 'base64');

    await fs.mkdir(`../../uploads/signatures/${employeeNum}`, (err) => {
      if (err) {
          console.log(err);
      }
      console.log('Folder created successfully!');
  })
    await fs.writeFile(`../../uploads/signatures/${employeeNum}/uniformSig${month}-${day}-${year}.png`, base64Image, (err) => {
      if (err) {
        console.log(err);
      }
      console.log('File succeeded.');
    });

    let pdfFile = `Uniform-Order-${employeeNum}`;

    // Stripping special characters
    pdfFile = encodeURIComponent(pdfFile) + '.pdf'

    let content = `<html>
    <head>
    <style>
    table {
    }
    .EEsignature img{
    width:150px; vertical-align: top;
    }
    td {
      text-align: center;
    }
    html {
      zoom: .55;
  }


    </style>
    </head>
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
    <td><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="100%" /></td>
    <td style="text-align: right; font-weight: bold; font-size: 200%;">Carlson Building Maintenance</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 100%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 100%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 125%; padding-left: 5px;">Uniform Policy and </td>
    <td style="font-weight: bold; font-size: 125%; padding-left: 5px;text-align:right">&nbsp;${month}/${day}/${year}</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 125%;">Voluntary T-Shirt Order</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 125%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr>
    <td style="" colspan="6">
    <p>All employees performing cleaning duties at site locations must wear either:
    <ul>
    <li> the company provided high-visibility vest over a dark colored (navy blue or black) shirt</li>
    <br>
    <center> 
      OR 
    </center>
    <br>
    <li> at the employee's option, he or she may purchase blue t-shirts with the Carlson logo and
      wear the t-shirt rather than the vest while working.
    </li>
    </ul>
    <p>The employee may also wear the Carlson t-shirts while off duty, except that employees may never wear the t-shirts while working for another employer.  This is to prevent confusion by customers or others.  
    </p>
    <p>
    The Company does not require employees to wear other specific items of clothing, except that for safety reasons employees must wear long slacks or jeans (rather than shorts or skirts).  Shoes should be practical with closed toes (for example, no high heels or open toed sandals).    Employees’ clothing, including the optional Carlson t-shirt if selected, are to be clean and presentable at all times at the assigned job location.   
    </p>
    <p>
    T-shirts can be purchased anytime at the cost of $6.00 per shirt.  Payment will be taken through payroll deduction.  Employees who wish to purchase shirts must complete this order form and give it to their manager, who will provide the employee with the requested number of t-shirts.  The manager must forward the completed order form to the Payroll Department before the end of the payroll period.  
    </p>
    </td>
    </tr
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    ><tr>
    <td style="text-align:center; font-weight:bold;" colspan="6">
    PURCHASE OF T-SHIRTS IS COMPLETELY VOLUNTARY
    </td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 1px; width:10%; text-align:right;">Last name:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px; " >${lastName}</td>
    <td width="16%" style="padding: 1px; text-align:right;">First Name:</td>
    <td width="24%" style="border-bottom: 1px solid black; padding: 1px; " >${firstName}</td>
    <td width="10%" style="padding: 1px; width:10%;">Employee #:</td>
    <td width="20%" style="border-bottom: 1px solid black; padding: 1px; ">${employeeNum}</td>
    </td>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 1px; text-align:right;">Address:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px;" colspan="3">${address}</td>
    <td style="padding: 1px; text-align:right;">Apt:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px;" >${apt}</td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 1px; text-align:right;">City:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px;" >${city}</td>
    <td style="padding: 1px; text-align:right;">State:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px;">${state}</td>
    <td style="padding: 1px; text-align:right;">Zip:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px;" >${zip}</td>
    </tr>
    <tr>
    <td colspan="6">&nbsp;
    </td>
    </tr>
    <tr>
    <td colspan="6">
    <div>
      <p>I wish to volumtarily purchase Carlson T-Shirts.  I authorize Carlson to deduct the amount indicated below from my paycheck for the cost of the t-shirts.   <strong>GIVE THIS ORDER FORM TO YOUR MANAGER OR MAIL TO HUMAN RESOURCES</strong></p>
    </div>
    </td>
    </tr>
    <tr>
    <td colspan="6">&nbsp;
    
    </td>
    </tr>
    <tr>
    <td style=" padding: 1px; text-align:center; text-decoration:underline;" colspan="2">Item and Cost</td>
    
    <td style="text-decoration:underline; padding: 1px; text-align:center;" >Quantity</td>
    <td style="text-decoration:underline; padding: 1px; text-align:center;" colspan="3">Total to be deducted from Paycheck</td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 1px;" colspan="2">T-Shirt @ $6.00/ea &nbsp;&nbsp;&nbsp;&nbsp; X</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px; text-align:center;" >${quantity}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
    <td style="padding: 1px;" >=</td>
    <td style="border-bottom: 1px solid black; padding: 1px;" colspan="2"> ${cost}</td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 1px;" colspan="2" >Size (Check One): </td>
    <td style="border-bottom: 1px solid black; padding: 1px; text-align:center;" colspan="1">${size}</td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="padding: 1px; vertical-align:bottom" colspan="2">Employee Signature:</td>
    
    <td style="border-bottom: 1px solid black; padding: 1px; height:15px; vertical-align:bottom;" colspan="2"><div class=EEsignature><img src="http://portal.cbmportal.com/uploads/signatures/${employeeNum}/uniformSig${month}-${day}-${year}.png"></img></div></td>
    <td style="padding: 1px; vertical-align:bottom">Date:</td>
    
    <td style="padding: 1px; text-decoration:underline; vertical-align:bottom">${month}/${day}/${year}</td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td width="11%"  style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="19%" style="border-bottom: 0px solid black;">&nbsp;</td>
    <td width="16%" style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td colspan="6">&nbsp;
    
    </td>
    </tr>
    <tr>
    <td colspan="4">
    <strong>I provided the employee with the requested number of shirts by: </strong>
    </td>
    <td >
    ____Mail
    </td>
    <td >
    ____In Person
    </td>
    </tr>
    <tr>
    <td colspan="6">&nbsp;
    
    </td>
    </tr>
    <td >
    <strong>Name:</strong>
    </td>
    <td style="" colspan="3">___________________________________________
    </td>
    <td >
    <strong>Date:</strong>
    </td>
    <td style="" >
    ____________
    </td>
    </tr>
    </tbody>
    </table>
    </html>`;
  //Create PDF
    pdf.create(content, options).toFile(`../../uploads/pdf/uniform/${pdfFile}`, function(err, res) {
      if (err) {
      return console.log(err);
      }
   });

   message = `Please process this uniform order for employee ${employeeNum} ${firstName} ${lastName}`;

   //Sending Mail
   try { 
   mailOptions = {
    from: '"CBM IT" <cbmmailer@carlsonbuilding.com>', // sender address
    to: receiver.email, // list of receivers
    cc: dm.email,
    subject: pdfFile, // Subject line
    html: `${receiver.department} ${message} <br /> ${content}`, // html body
    attachments: {
        filename: `${pdfFile}`,
        path: `../../uploads/pdf/uniform/${pdfFile}`
    },
};
    
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
            console.log(err);
            return;
        } else {
            return res.json({message: true});
        }
    });
});

module.exports = uniformRouter;