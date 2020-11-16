const nodemailer = require('nodemailer');
const HTML = require('../config/html');
const FormFunc = require('../admin/helpers/hbs_helpers');
const moment = require('moment');
const host = process.env.host;
const port = process.env.emailPort;
const authUser = process.env.authUser;
const authPass = process.env.authPass;
const rejectUnauthorized = process.env.rejectUnauthorized;
let DepartmentModel = require('../src/Model/departmentModel');
module.exports = {
    date: function() {
        //let date_ob = new Date().toDateString();
        // current date
        // adjust 0 before single digit date
        /*let day = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();*/
        //date_ob = date_ob.substr(4);
        //return date = `${date_ob}`;
        return moment().format('MMM DD YYYY'); 
    },
    time: function() {
      return moment().format('HH:mm');
    },
    uploadsDir: function() {
        return "/home/cbmportal/public_html/uploads/";
    },
    baseSite: function() {
        return "https://cbmportal.com/uploads/";
    },
    pdfOptions: function() {
        format = 'letter',
        orientation = 'portrait'
      },
    transporter: 
        nodemailer.createTransport({
            host: host,
            port: port,
            secure: false,
            auth: {
              user: authUser,
              pass: authPass,
            },
            tls: {
                rejectUnauthorized: rejectUnauthorized,
            }
          }),

    htmlGeneration: function(result, form) {
        if (form === "backpay") {
            let { employeeNum, employeeName, dm, comments, backpay, sig } = result;
            dm = dm.split(' ');
            return HTML.backPayHtml(employeeName, employeeNum, backpay, comments, dm[0], dm[1], date, module.exports.baseSite());
        } else if (form === 'bonus') {
            let { employeeNum, employeeName, dm, comments, bonus } = result;
            dm = dm.split(' ');
            return HTML.bonusHtml(employeeName, employeeNum, bonus, comments, date, module.exports.baseSite());
        } else if (form === 'hotel') {
            let { date, dm, store, checkIn, checkOut, listPs1, listPs2, newPS, WT, hotelReason, beds, roomNum, notes } = result;
            dm = dm.split(' ');
            return HTML.hotelHtml(date, dm[0], dm[1], store, checkIn, checkOut, listPs1, listPs2, newPS, WT, hotelReason, beds, roomNum, notes);
        } else if (form === 'mileage') {
            let { employeeName, employeeNum, dm, mileage, comments } = result;
            dm = dm.split(' ');
            return HTML.mileageHtml(employeeName, employeeNum, dm[0], dm[1], mileage, comments, date, module.exports.baseSite());
        } else if (form === 'newhire') {
            let { firstName, middleName, dm, firstLast, location, hireType, address, email, secondLast, phone, phone2, sex, numDays, wage, positions, hours, language, ssn, firstDay, dob, date, number, i91, i92, idbadge } = result;
            dm = dm.split(' ');
            positions = positions.split(' ');
            return HTML.newhire(firstName, middleName, dm[0], dm[1], firstLast, location, hireType, address, email="N/A", secondLast, phone, phone2, sex, numDays, wage, positions, hours, language, ssn, firstDay, dob, date, number, i91, i92, idbadge);
        } else if (form === 'perDiem') {
            let { city, employeeName, employeeNum, location, state, dm, comments, firstNight, lastNight, arrivalDate, departureDate, mileage } = result;
            console.log(mileage);
            dm = dm.split(' ');
            return HTML.perDiem(city, employeeName, employeeNum, location, state, dm[0], dm[1], comments, firstNight, lastNight, arrivalDate, departureDate, mileage, date, module.exports.baseSite());
        } else if (form === 'pto') {
            let { employeeName, employeeNum, dm, departments, hours, approval, comments, absencefrom, absenceto } = result;
            dm = dm.split(' ');
            console.log(absencefrom, ' ', absenceto);
            return HTML.pto(employeeName, employeeNum, dm[0], dm[1], departments, hours, approval, comments, absencefrom, absenceto );
        } else if (form === 'targetOrder') {
            let { employeeName, location, notes, order } = result;
            //dm = dm.split();
            return HTML.targetOrder(employeeName, location, notes, order, date, module.exports.baseSite());
        } else if (form === 'termination') {
            let { firstName, firstLast, employeeNum, secondLast, dm, date, rehire, norehireReason, quitReason, lastWorked, twoWeeks, warnings } = result;
            dm = dm.split(' ');
            return HTML.term(firstName, firstLast, employeeNum, secondLast, dm[0], dm[1], date, rehire, norehireReason, quitReason, lastWorked, twoWeeks, warnings, module.exports.baseSite());
        } else if (form === 'uniform') {
            let { employeeNum, firstName, lastName, address, apt, city, state, zip, cost, quantity, size, date } = result;
            //dm = dm.split();
            return HTML.uniform(employeeNum, firstName, lastName, address, apt, city, state, zip, cost, quantity, size, date, module.exports.baseSite());
        } else if (form === 'wt') {
            let { employeeNum, employeeName, dm, location, city, state, workType, Billable, currentLocation, orderSubmitted, orderNumber, notes, equipment, orderDate, startDate, endDate } = result;
            dm = dm.split(' ');
            return HTML.wt(employeeNum, employeeName, dm[0], dm[1], location, city, state, workType, Billable, currentLocation, orderSubmitted, orderNumber, notes, equipment, orderDate, startDate, endDate, module.exports.baseSite());
        }
    },
    departmentEmail: function(form) {
        switch(form) {
            
            case "backpay":
            return DepartmentModel.findOne({ department: 'Payroll'});

            case "bonus":
            return DepartmentModel.findOne({ department: 'Payroll'});

            case "hotel":
            return DepartmentModel.findOne({ department: 'Accounting'});

            case "mileage":
            return DepartmentModel.findOne({ department: 'Payroll'});

            case "newhire":
            return DepartmentModel.findOne({ department: 'New Hires'});

            case "perDiem":
            return DepartmentModel.findOne({ department: 'Accounting'});

            case "pto":
            return DepartmentModel.findOne({ department: 'Payroll'});

            case "termination":
            return DepartmentModel.findOne({ department: 'Carlson Terminations'});

            case "targetOrder":
            return DepartmentModel.findOne({ department: 'Supplies'});

            case "uniform":
            return DepartmentModel.findOne({ department: 'Payroll'});

            case "wt":
            return DepartmentModel.findOne({ department: 'Accounting'});
        }
    }
}