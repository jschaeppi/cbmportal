const moment = require('moment');
module.exports = {
    backPayHtml: function(employeeName, employeeNum, backpayInfo, comments, dmUserFirst, dmUserLast, date=moment().format('MM/DD/YYYY'), baseSite) {
      return `<html>
    <head>
    <style>
    .EEsignature img{
    width:150px; vertical-align: text-bottom;
    }
    .DMOSsign img{
    width:150px;vertical-align:bottom;
    }
    html {
        zoom: .65;
    }
    </style>
    </head>
    <body>
    <table style="width: 100%;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
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
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;">Back Pay Form</td>
    <td style="font-weight: bold; font-size: 190%; padding-left: 5px;text-align:right">&nbsp;${date}</td>
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
    <td style="height: 29px; font-weight: bold; font-size: 110%;">Back Pay Details</td>
    </tr>
    </tbody>
    </table>
    <table align="center" style="width: 600px;" border="0" cellpadding="1" cellspacing="0">
    <tbody>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 100px; padding: 1px;">Employee Number: </td>
    <td style="width: 100px; padding: 1px; text-decoration: underline;">${employeeNum}</td>
    <td style="width: 50px; padding: 1px;">Employee Name:</td>
    <td style="width: 200px; padding: 1px; text-decoration:underline;">${employeeName}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="4">&nbsp;</td>
    
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="4">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-size:24px; font-weight:bold" colspan="5">Missed Pay (to be added through the employee's next generated check):</td>
    </tr>
    <tr>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">In:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Left for Lunch: </th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Returned from lunch: </th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Out:</th>
    <th style="width: 150px; height: 20px;  border: 1px solid black; padding: 1px;">Total Hours:</th>
    </tr>
    ${backpayInfo.join().replace(/,/g," ")}
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <th style=" padding: 1px; text-align:left;" colspan="5">Reason this pay was missed:</th>
    </tr>
    <tr>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px;" colspan="5">${comments}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; font-weight:bold;" colspan="5">**Signature/Approval - Please make sure to sign and print your name before turning in this form.</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;" colspan="5">&nbsp;</td>
    </tr>
    <tr style="height: 50px; vertical-align: bottom;">
    <td style=" width: 150px; padding: 1px;">Manager:</td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${dmUserFirst} ${dmUserLast}</td>
    <td style=" width: 150px; height: 20px; border-bottom: border: 1px solid black; padding: 1px; vertical-align:bottom">
    <div class="DMOSsign"><img src="${baseSite}signatures/backPaySig/${employeeNum}/${date}.png"></img></div>
    </td>
    <td style=" width: 150px; border-bottom: border: 1px solid black; padding: 1px; text-align:center;">${date}</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc;">&nbsp;</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Print</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Sign</td>
    <td style="width: 150px; border-bottom: 0px solid black; background-color: #f9fafc; font-weight: bold; text-align:center;">Date</td>
    </tr>
    <tr>
    <td style="width: 150px; border-bottom: 0px solid black; font-weight:bold;" colspan="5">*Please Return this Completed form to the Payroll Department</td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`;
    },

    bonusHtml: function(employeeName, employeeNum, bonusInfo, comments, date=moment().format('MM/DD/YYYY'), baseSite) {
      return `<head>
      <style>
      .EEsignature img{
      width:100px; vertical-align: text-bottom;
      }
      .DMOSsign img{
      width:100px;vertical-align: text-bottom;
      }
      table {
          border-spacing: 0;
      }
      html {
        zoom: .55;
    }
    td {
        padding-top: 5px;
    }
      </style>
      </head>
      <body>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: white; border: 20px solid #EDEDED; padding: 5px;"><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="336" height="102" /></td>
      </tr>
      <tr>
      <td style="font-weight: bold; font-size: 190%; text-align: center;">BONUS FORM</td>
      </tr>
      <tr>
      <td style="font-weight: bold; font-size: 190%; text-align: center;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;Name</td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 40%; font-weight: bold; height: 25px;">&nbsp;${employeeName}</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 40%; font-weight: bold; text-align: right; height: 25px;">&nbsp;Emp#</td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 30%; font-weight: bold; height: 25px; text-align: center;">${employeeNum}</td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 40%; font-weight: bold; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 30%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: center; font-weight: bold; border: 1px solid black;"><span style="font-size: 16pt;">Date</span></td>
      <td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 1px solid black;"><span style="font-size: 16pt; line-height: 22.8571px;">Location</span></td>
      <td style="width: 15%; font-weight: bold; height: 25px; border: 1px solid black; text-align: center;"><span style="font-size: 16pt;">Amount</span></td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
     ${bonusInfo.join().replace(/,/g," ")}
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr style="height: 25px;">
      <td style="width: %; height: 25px; text-align: left; font-weight: bold;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr style="height: 50px; vertical-align: bottom;">
      <td style="width: 15%; height: 25px; text-align: right; font-weight: normal;">&nbsp;Manager:</td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 40%; font-weight: bold; height: 25px;">&nbsp;
      <div class="DMOSsign"><img src="${baseSite}signatures/bonusPaySig/${employeeNum}/${date}.png"</div>
      </td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: normal; text-align: right; height: 25px;">&nbsp;Date:</td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 20%; font-weight: bold; height: 25px;">&nbsp;${date}</td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: left; font-weight: bold; vertical-align: bottom;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;"><sup>sign</sup></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: left; font-weight: bold;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: left; font-weight: bold;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 50%; font-weight: bold; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; font-weight: bold; text-align: right; height: 25px;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 15%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr style="height: 25px; vertical-align: bottom;">
      <td style="width: 15%; height: 25px; text-align: right; font-weight: normal;">&nbsp;Comments:</td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 85%; font-weight: bold; height: 25px;"> ${comments}</td>
      </tr>
      <tr style="height: 25px; vertical-align: bottom;">
      <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;</td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 85%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      <tr style="height: 25px; vertical-align: bottom;">
      <td style="width: 15%; height: 25px; text-align: right; font-weight: bold;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: left; width: 85%; font-weight: bold; height: 25px;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellspacing="0" cellpadding="0">
      <tbody>
      <tr style="height: 10px;">
      <td style="width: 15%; height: 25px; text-align: center; font-weight: bold;">&nbsp;</td>
      <td style="text-align: center; width: 70%; font-weight: bold; height: 25px; border: 2px solid black;"><span style="font-size: 16px; line-height: 25px;">Payroll Use Only </span></td>
      <td style="width: 15%; font-weight: bold; height: 25px; text-align: center;">&nbsp;</td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 15%; height: 25px; text-align: center; font-weight: bold;">&nbsp;</td>
      <td style="text-align: center; width: 70%; font-weight: bold; height: 200px; border: 2px solid black;">&nbsp;</td>
      <td style="width: 15%; font-weight: bold; height: 25px; text-align: center;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    },

    hotelHtml: function(date, dmUserFirst, dmUserLast, store, checkIn, checkOut, listPs1, listPs2, newPS, WT, hotelReason,beds, roomNum, notes) {
      return `<head>
      <style>
      html {
          zoom: .55;
      }
      </style>
      </head>
      <table style="width: 100%;" border="0" cellspacing="0" cellpadding="1">
      <tbody>
      <tr>
      <td colspan="2">&nbsp; <img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="346" height="112" /></td>
      <td style="text-align: right; font-weight: bold; font-size: 200%;" colspan="4">&nbsp;Carlson Building Maintenance</td>
      </tr>
      <tr>
      <td colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="font-weight: bold; font-size: 190%; padding-left: 3px;" colspan="3">Hotel Request</td>
      <td style="font-weight: bold; font-size: 190%; padding-left: 3px; text-align: right;" colspan="3">&nbsp; ${date}</td>
      </tr>
      <tr>
      <td colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; background: yellow; color: red; font-weight: bold; font-size: 100%;" colspan="4">
      <ul>
      <li>Hotel request must be requested ahead of time.</li>
      <li>Select numbers of rooms</li>
      <li>Select numbers of beds (Single or double)</li>
      <li>Notify the employee to check in by 3pm.</li>
      <li>Specify employee name under hotel</li>
      <li>Employee name under hotel must have an I.D.</li>
      <li>Employee must pay deposit for incidentals.</li>
      <li>Any No Call No Show/Cancel will be a company loss.</li>
      </ul>
      </td>
      </tr>
      <tr>
      <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">district information</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; font-size: 100%;" colspan="0">DM:</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: bold; font-size: 100%;" colspan="5">${dmUserFirst} ${dmUserLast}</td>
      <!--
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D150:value}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D160:value}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D240:value}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold;" colspan="0">{D110:value}</td>--></tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black; font-size: 100%;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black; font-size: 100%;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">job location</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; text-transform: capitalize; font-size: 100%;" colspan="2">store location:</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: bold; font-size: 100%;" colspan="4">${store}</td>
      <!--
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td>
      <td>&nbsp;</td> --></tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">hotel information</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; font-size: 100%;" colspan="2">Check IN:</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${checkIn}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: left; font-weight: bold; font-size: 100%;" colspan="2">Check out:</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${checkOut}</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="2">How many rooms?</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${roomNum}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="2">How many beds?</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${beds}</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">Employee information</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="0">Employee 1</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal;" colspan="0">${listPs1}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="0">Employee 2</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; width: auto;" colspan="0">${listPs2}</td>
      </tr>
      <tr><!--Row of New Employee-->
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">New Employee Name</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="5">${newPS}</td>
      <!--
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal;" colspan="1">New Hire Form Sent?</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal;" colspan="0">{Yes}</td>--></tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">reason for hotel request</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="2">Site Visit/Project Type</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${hotelReason}</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;text-transform:capitalize;" colspan="2">work ticket number</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="1">${WT}</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 2px solid black; border-right: 2px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">notes</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; font-size: 100%;" colspan="6">${notes}</td>
      </tr>
      <tr>
      <td style="border-left: 0px solid black; border-right: 0px solid black; font-size: 100%;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
      </tr>
      <tr>
      <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: black; padding: 3px; text-align: center; font-weight: bold; text-transform: uppercase; font-size: 100%;" colspan="6">office use only</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: bold; background: lightgray; text-transform: Capitalize;" rowspan="2">notes</td>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; background: lightgray; font-size: 100%;" colspan="5">&nbsp;</td>
      </tr>
      <tr>
      <td style="border: 2px solid black; padding: 3px; text-align: center; font-weight: normal; background: lightgray;" colspan="5">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-left: 0px solid black; border-right: 0px solid black;" colspan="6">&nbsp;</td>
      </tr>
      </tbody>
      </table>`;
    },

    mileageHtml: function(employeeName, employeeNum, dmUserFirst, dmUserLast, mileageInfo, comments, date=moment().format('MM/DD/YYYY')) {
      return `
      <head>
      <style>
      html {
          zoom: .45;
      }
      table {
          border-spacing: 0;
      }
      </style>
      </head>
      <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
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
      <td style="font-weight: bold; font-size: 190%; padding-left: 5px;">7 County Mileage Form</td>
      <td style="font-weight: bold; font-size: 190%; padding-left: 5px;text-align:right">&nbsp;${date}</td>
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
      <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
      <tbody>
      <tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: #25354c;">
      <td style="height: 29px; font-weight: bold; font-size: 100%;">7 County Mileage Details</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%; height:auto;"  cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      <td width="20%" style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      <tr>
      <td style="width: 48%; border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">Employee Name</td>
      <td style="width: 48%; border: 1px solid black; border-bottom: 0; padding: 3px;" colspan="3">${employeeName}</td>
      </tr>
      <tr>
      <td style="width: 48%; border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">Employee Number</td>
      <td style="width: 48%; border: 1px solid black; border-bottom: 0; padding: 3px;" colspan="3">${employeeNum}</td>
      </tr>
      <tr>
      <td style="width: 48%; border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">Manager</td>
      <td style="width: 48%; border: 1px solid black; border-bottom: 0; padding: 3px;" colspan="3">${dmUserFirst} ${dmUserLast}</td>
      </tr>
      <tr>
      <td style="width: 48%; border: 1px solid black; border-right: 0; padding: 3px;">Comments</td>
      <td style="width: 48%; border: 1px solid black; padding: 3px;" colspan="3">${comments}</td>
      </tr>
      <tr>
      <td style="border-bottom: 0px solid black; background-color: #f9fafc;" colspan="3">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-bottom: 0px solid black; background-color: #f9fafc; font-size:18px;font-weight:bold; text-align: center; column-span:3" colspan="3">MILEAGE</td>
      </tr>
      <tbody>
      </table>
      <table style="width: 100%; height:auto; border-bottom: 1px solid black;" border="0" cellpadding="0" cellspacing="0">
      <tbody>
      ${mileageInfo.join().replace(/,/g," ")}
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0" cellspacing="0">
      <tbody>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      </tbody>
      </table>`;  
    },

    term: function(firstName, firstLast, employeeNum, secondLast, dmUserFirst, dmUserLast, date, rehire, norehireReason, quitReason='N/a', lastWorked, twoWeeks='N/a', warnings='N/a') {
      const warningTwoWeeks = (warnings === '') ? `<td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">Was two weeks given?</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${twoWeeks}</span></td>`: `<td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">Were warnings given?</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${warnings}</span></td>`;

      const otherWhyQuit = (warnings !== '') ? `<tr style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
      <td style="width: 23;"><span style="font-size: 12pt;">&nbsp; Explain missed shifts by employee:</span></td>
      <td style="width: 72.38%;">&nbsp;<span style="font-size: 14pt;">${quitReason}</span></td>
      </tr>`:`<tr style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
      <td style="width: 23;"><span style="font-size: 12pt;">&nbsp; Employee reason for quitting:</span></td>
      <td style="width: 72.38%;">&nbsp;<span style="font-size: 14pt;">${quitReason}</span></td>
      </tr>`;
     return `
    <head>
    <style>
    html {
        zoom: .55;
    }
    </style>
    </head>
    <table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
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
<td style="font-weight: bold; font-size: 190%; padding-left: 5px;">Employee Termination Form</td>
<td>&nbsp;</td>
</tr>
<tr>
<td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: gray;">
<td style="height: 29px; font-weight: bold; font-size: 110%;">Quit</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr>
<td style="border-bottom: 0px solid black;">&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="0">
<tbody>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Number:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${employeeNum}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Last Name:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${firstLast}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Second Last Name:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${secondLast}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee First Name:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${firstName}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr>
<td style="width: 22.9143%;"><span style="font-size: 12pt;">Last Day Of Work:</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${lastWorked}</span></td>
</tr>
<tr>
<td style="width: 22.9143%;">&nbsp;</td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr>
<td>&nbsp;<span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<!--<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 23px;">
<td style="width: 59.4093%; height: 23px; vertical-align: bottom; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
<div class="EEsignature">&nbsp;</div>
</td>
<td style="width: 25.5907%; height: 23px; vertical-align: bottom; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">&nbsp; &nbsp;</td>
</tr>
<tr style="height: 23px; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;">
<td style="width: 59.4093%; height: 23px; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp;</span></td>
<td style="width: 25.5907%; height: 23px; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
</tbody>
</table> -->
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 23px;">
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
</tr>
<tr style="height: 23px;">
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
</tr>
<tr style="color: white; font-weight: bold; font-size: 110%; font-family: verdana; text-align: center; height: 30px; background-color: gray;">
<td style="height: 30px;"><span style="font-size: 12pt;">District Manager</span></td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 25px;">
${warningTwoWeeks} 
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; text-align: right; height: 25px;"><span style="font-size: 12pt;">&nbsp;&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; font-weight: bold; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr style="height: 25px;">
<td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
<tr style="height: 25px;">
<td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">Eligible for rehire?</span></td>
<td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${rehire} ${norehireReason}</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; text-align: right; height: 25px;"><span style="font-size: 12pt;">&nbsp;&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; font-weight: bold; height: 25px;">&nbsp;</td>
</tr>
<tr style="height: 25px;">
<td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
${otherWhyQuit}
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 43px;">
<td style="width: 70%; border-bottom: 1px solid black; vertical-align: bottom; height: 43px;">&nbsp; &nbsp; &nbsp;&nbsp;
<div class="DMOSsign">${dmUserFirst} ${dmUserLast}</div>
</td>
<td style="width: 30%; border-bottom: 1px solid black; vertical-align: bottom; height: 43px;">&nbsp;${date}</td>
</tr>
<tr style="height: 29px;">
<td style="width: 70%; border-bottom: 0px solid black; height: 29px;"><span style="font-size: 14pt;">&nbsp;&nbsp;</span></td>
<td style="width: 30%; border-bottom: 0px solid black; height: 29px;"><span style="font-size: 14pt;">&nbsp;</span></td>
</tr>
<tr style="height: 23px;">
<td style="width: 70%; height: 23px;">&nbsp;</td>
<td style="width: 30%; height: 23px;">&nbsp;</td>
</tr>
</tbody>
</table>
<table style="width: 100%;" border="0" cellpadding="1">
<tbody>
<tr style="height: 33px;">
<td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; font-style: italic; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 12px; line-height: 30px; font-family: Georgia, serif; height: 33px;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;">Submit to HR after completed</span></td>
</tr>
</tbody>
</table>`;
    },

    newhire: function(firstName, middleName='', dm_userFirst, dm_userLast, firstLast, location, hireType, address, email="N/A", secondLast='', phone, phone2, sex, numDays, wage, positions, hours, language, ssn, firstDay, dob, date=moment().format('MM/DD/YYYY'), number='', newHireNotes='', i91="No Link", i92="No Link", idbadge="No Link") {
      return `<html>
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
  <td style="font-weight: bold; font-size: 190%; padding-left: 5px;text-align:right">&nbsp;${date}</td>
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
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${positions} ${number}</td>
  </tr>
  <tr>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">Store Name and Number</td>
  <td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${location}</td>
  </tr>
  <tr>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">District Manager</td>
  <td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${dm_userFirst} ${dm_userLast}</td>
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
  <td style="width: 48%; border: 1px solid black; padding: 3px;">Comments/Notes</td>
  <td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${newHireNotes}</td>
  </tr>
  <tr>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">I-9 First Page</td>
  <td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${i91}</td>
  </tr>
  <tr>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">I-9 Second Page</td>
  <td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${i92}</td>
  </tr>
  <tr>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">Employee Picture</td>
  <td style="width: 2%; border: 1px solid black; background-color: #25354c;">&nbsp;</td>
  <td style="width: 48%; border: 1px solid black; padding: 3px;">${idbadge}</td>
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
    },

    perDiem: function(city, employeeName, employeeNum, location, state, dmUserFirst, dmUserLast, comments, firstNight, lastNight, arrivalDate, departureDate, perDiemInfo, date=moment().format('MM/DD/YYYY')) {
      return `
      <head>
      <style>
      html {
          zoom: .65;
      }
      </style>
      </head>
      <center>
  <table style="width: 838px;" border="0" cellspacing="0" cellpadding="1">
  <tbody>
  <tr>
  <td colspan="2">&nbsp; <img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="346" height="112" /></td>
  <td style="text-align: right; font-weight: bold; font-size: 340%;" colspan="4">&nbsp;Carlson Building Maintenance</td>
  </tr>
  <tr>
  <td colspan="0">&nbsp;</td>
  <td colspan="0">&nbsp;</td>
  <td colspan="0">&nbsp;</td>
  <td colspan="0">&nbsp;</td>
  <td colspan="0">&nbsp;</td>
  <td colspan="0">&nbsp;</td>
  </tr>
  <tr>
  <td style="font-weight: bold; font-size: 190%; padding-left: 3px;" colspan="2">&nbsp;Per Diem Request</td>
  <td style="font-weight: bold; font-size: 190%; padding-left: 3px; text-align: right;" colspan="4">&nbsp; ${date}</td>
  </tr>
  <tr>
  <td colspan="2">&nbsp;</td>
  <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
  <td colspan="2">&nbsp;</td>
  <td colspan="4">&nbsp;</td>
  </tr>
  <tr>
  <td style="background: lightgray; border: 2px solid black; border-right: 2px solid black; color: red; padding: 3px;" colspan="6">&bull; This form is to be submitted by District Managers only.<br /> &bull; Forms submitted by anyone else will not be processed. <br />&bull; Fill out all applicable fields highlighted in yellow. Incomplete forms will be returned and reimbursement will be delayed.<br /> &bull; Submit one form per employee. Forms with multiple employees will be returned and reimbursement will be delayed. <br />&bull; Requests for Per Diem/Mileage will be processed once per week by the Finance Department <br />&bull; Requests must be submitted by Tuesday at 12:00 PM for the previous calendar week<br /> &bull; Requests received after 12 PM Tuesday will be processed the following week.<br />&bull; Special notes are required for irregular circumstances</td>
  </tr>
  <tr>
  <td colspan="6">&nbsp;</td>
  </tr>
  <tr>
  <td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black; text-transform: uppercase;" colspan="6">employee information</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold;" colspan="2">EMPLOYEE NAME</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${employeeName}</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold;" colspan="2">EMPLOYEE NUMBER</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${employeeNum}</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold;" colspan="2">DISTRICT MANAGER</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${dmUserFirst} ${dmUserLast}</td>
  </tr>
  <tr>
  <td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black;" colspan="6">JOB SITE</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">store location</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${location}</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">city</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${city}</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">state</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${state}</td>
  </tr>
  <tr>
  <td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black; text-transform: uppercase;" colspan="6">hotel</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">first night needed</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${firstNight}</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: left; font-weight: bold; text-transform: uppercase;" colspan="2">last night needed</td>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: yellow;font-size:90%;" colspan="4">${lastNight}</td>
  </tr>
  <tr>
  <td colspan="6">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: auto; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: lightgray;" colspan="4">per diem</td>
  <td style="width: 220px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;font-size:90%;color: red;" colspan="2">FOR OFFICE USE ONLY</td>
  </tr>
  <tr>
  <td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; font-weight: bold;" colspan="2">ARRIVAL DATE</td>
  <td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; font-weight: bold;" colspan="2">DEPARTURE DATE</td>
  <td style="width: 28px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;color: red;" colspan="2">amt</td>
  </tr>
  <tr>
  <td style="width: 280px; border: 2px solid black; padding:3px;text-align: center; font-weight: normal;font-size:90%;background: yellow;" colspan="2">${arrivalDate}</td>
  <td style="width: 280px; border: 2px solid black; padding:3px;text-align: center; font-weight: normal;font-size:90%;background: yellow;" colspan="2">${departureDate}</td>
  <td style="width: 220px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 280px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: lightgray;" colspan="4">mileage</td>
  <td style="width: 220px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;font-size:90%;color: red;" colspan="2">FOR OFFICE USE ONLY</td>
  </tr>
  <tr><!-- STARTS ROW HEADERS-->
  <td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">date</td>
  <td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">departed from</td>
  <td style="width: 250px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">destonation/store</td>
  <td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold;" colspan="0">rt/ow</td>
  <td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;color: red;" colspan="0">mi</td>
  <td style="width: 20px; border: 2px solid black; padding:3px;text-align: center; text-transform: uppercase; font-weight: bold; background: darkgray;color: red;" colspan="0">amt</td>
  </tr><!-- ENDS ROW HEADERS-->
  ${perDiemInfo.join().replace(/,/g," ")}
  <tr><!--NOTES-->
  <td style="background: lightgray; font-height: 120%; font-weight: bold; text-align: center; border: 2px solid black; text-transform: uppercase;" colspan="6">notes</td>
  </tr>
  <tr>
  <td style="background: lightgray; font-height: 120%; font-weight: normal; text-align: center; border: 2px solid black; text-transform: capitalize; font-size: 85%; height: 23px;" colspan="6">${comments}</td>
  </tr>
  <tr>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  <td>&nbsp;</td>
  </tr>
  <tr>
  <td style="border: 2px solid black; padding:3px;text-align: center; background: darkgray; font-weight: bold;color: red;" colspan="6">FOR OFFICE USE ONLY</td>
  </tr>
  <tr><!-- OFFICE-->
  <td style="width: auto; border: 2px solid black; padding:3px;text-align: center; background: darkgray; font-weight: bold;color: red;" colspan="0">GRAND TOTAL</td>
  <td style="width: auto; border: 2px solid black; padding:3px;text-align: center; background: darkgray;" colspan="5">&nbsp;</td>
  </tr>
  <!-- OFFICE-->
  <tr>
  <td style="border: 0px solid black; text-align: center; font-weight: bold; font-size: 73%; background: WHITE; font-style: normal;" colspan="6">REVISED 02/01/2016</td>
  </tr>
  </tbody>
  </table>`;
    },

    targetOrder: function(employeeName, location, notes, orders) {
      return `<html>
    <head>
    <style>
    html {
        zoom: .55;
    }
    </style>
    </head>
    <body>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
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
    <td style="font-weight: bold; font-size: 190%;">&nbsp;Target Supply Order</td>
    <td>&nbsp;</td>
    </tr>
    <tr>
    <td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: gray;">
    <td style="height: 29px; font-weight: bold; font-size: 110%;">Target Supply Order</td>
    </tr>
    </tbody>
    </table>
    <table style="width: 100%;" border="0" cellpadding="1">
    <tbody>
    <tr>
    <td style="border-bottom: 0px solid black;">&nbsp;</td>
    </tr>
    <tr>
    <td>&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="margin: 0 auto; width:65%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; width: 30%;"><span style="font-size: 12pt;">Store Number:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 70%;"><span style="font-size: 12pt;">${location}</span></td>
    </tr>
    <tr>
    <td style="width: 30%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 70%;"><span style="font-size: 12pt;">&nbsp;</span></td>
    </tr>
    <tr>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 30%;"><span style="font-size: 12pt;">Employee Name:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 70%;"><span style="font-size: 12pt;">&nbsp;${employeeName}</span></td>
    </tr>
    </tbody>
    </table>
    <table style="margin: 0 auto; width:65%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="width: 30%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
    </tr>
    ${orders.join().replace(/,/g," ")}
    <tr>
    <td style="width: 70%;">&nbsp;</td>
    <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <table style="margin: 0 auto; width:65%;" border="0" cellpadding="0">
    <tbody>
    <tr>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 30%;"><span style="font-size: 12pt;">Notes:</span></td>
    <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 70%;"><span style="font-size: 12pt;">${notes}</span></td>
    </tr>
    </tbody>
    </table>
    </body>
    </html>`;
    },

    uniform: function(employeeNum, firstName, lastName, address, apt, city, state, zip, cost, quantity, size, date=moment().format('MM/DD/YYYY')) {
      return `<html>
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
      <td style="font-weight: bold; font-size: 125%; padding-left: 5px;text-align:right">&nbsp;${date}</td>
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
      
      <td style="border-bottom: 1px solid black; padding: 1px; height:15px; vertical-align:bottom;" colspan="2"><div class=EEsignature><img src="http://portal.cbmportal.com/uploads/signatures/${employeeNum}/uniformSig${date}.png"></img></div></td>
      <td style="padding: 1px; vertical-align:bottom">Date:</td>
      
      <td style="padding: 1px; text-decoration:underline; vertical-align:bottom">${date}</td>
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
    },

    wt: function(employeeNum, employeeName, dmUserFirst, dmUserLast, location, city, state, workType, Billable, currentLocation, orderSubmitted, orderNumber, notes, equipment, orderDate, startDate, endDate) {
      return `<head>
      <style>
      html {
          zoom: .55;
      }
      </style>
      </head>
      <table style="width: 100%;" border="0">
  <tbody>
  <tr>
  <td>&nbsp;</td>
  </tr>
  <tr>
  <td>&nbsp;</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="2" cellspacing="0" cellpadding="2">
  <tbody>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: center;" colspan="2">Project Work Sheet</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: center;" colspan="2"><img src="http://portal.cbmportal.com/cbm_forms/images/CBM_Logo.png" alt="" width="336" height="102" /></td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">CREW INFORMATION</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">EMPLOYEE NAMES:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${employeeName}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">EMPLOYEE NUMBERS:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${employeeNum}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">DISTRICT MANAGER:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${dmUserFirst} ${dmUserLast}<td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">JOB INFORMATION</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">STORE:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${location}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">CITY:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${city}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">STATE:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${state}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">TYPE OF WORK:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${workType}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">BILLABLE/NON:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${Billable}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">SPECIAL NOTES:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${notes}</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">OPERATIONS DETAILS</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">WHAT EQUIPMENTS NEEDS TO BE MOVED:<small>(List all, including barrels,etc.)</small></td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${equipment}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">Current Location:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${currentLocation}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">SUPPLY ORDER SUBMITTED:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${orderSubmitted}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">Supply Order Date:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${orderDate}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: yellow; font-weight: bold; padding: 3px; text-align: center;">Supply Order Number:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${orderNumber}</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: gray; font-weight: bold; padding: 3px; text-align: center;" colspan="2">PROJECT DATES:</td>
  </tr>
  <tr>
  <td style="width: 100%; border: 2px solid black; background: black; font-weight: bold; padding: 3px; text-align: center;" colspan="2">&nbsp;</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">Project Start Date:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${startDate}</td>
  </tr>
  <tr>
  <td style="width: 35%; border: 2px solid black; background: orange; font-weight: bold; padding: 3px; text-align: center;">Project E0nd Date:</td>
  <td style="width: 59%; border: 2px solid black; background: white; font-weight: bold; padding: 3px; text-align: left;">${endDate}</td>
  </tr>
  </tbody>
  </table>
  <table style="width: 100%;" border="0">
  <tbody>
  <tr>
  <td>&nbsp;</td>
  </tr>
  </tbody>
  </table>`;
    },

    pto: function(employeeName, employeeNum, dmUserFirst, dmUserLast, departments, hours, approval, comments, absencefrom, absenceto, date=moment().format('MM/DD/YYYY')) {

      return `<html>
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
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
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
      <td style="font-weight: bold; font-size: 190%;">&nbsp;Paid Time Off (PTO) Request</td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td style="font-weight: bold; font-size: 190%;">&nbsp;</td>
      <td>&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="color: white; font-weight: bold; font-size: 140%; font-family: Arial; text-align: center; height: 29px; background-color: gray;">
      <td style="height: 29px; font-weight: bold; font-size: 110%;">PTO Form</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr>
      <td style="border-bottom: 0px solid black;">&nbsp;</td>
      </tr>
      <tr>
      <td>&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="0">
      <tbody>
      <tr>
      <td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Name:</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${employeeName}</span></td>
      </tr>
      <tr>
      <td style="width: 22.9143%;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;</span></td>
      </tr>
      <tr>
      <td style="width: 22.9143%;"><span style="font-size: 12pt;">Employee Number:</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">&nbsp;${employeeNum}</span></td>
      </tr>
      <tr>
      <td style="width: 22.9143%;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
      </tr>
      <tr>
      <td style="width: 22.9143%;"><span style="font-size: 12pt;">Department:</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${departments}</span></td>
      </tr>
      <tr>
      <td style="width: 22.9143%;">&nbsp;</td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;">&nbsp;</td>
      </tr>
      <tr>
      <td style="width: 22.9143%;"><span style="font-size: 12pt;">Manager:</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 57.0857%;"><span style="font-size: 12pt;">${dmUserFirst} ${dmUserLast}</span></td>
      </tr>
      <tr>
      <td style="width: 22.9143%;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr>
      <td>&nbsp;<span style="font-size: 14pt;">&nbsp;Dates of Absence</span></td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="height: 25px;">
      <td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 14pt;">From:</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; text-align: center; width: 27%; font-weight: bold; height: 25px;"><span style="font-size: 16px; line-height: 22.8571px;">${absencefrom}</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 10%; text-align: right; height: 25px;"><span style="font-size: 12pt;">&nbsp;To: &nbsp;</span></td>
      <td style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; width: 26%; font-weight: bold; height: 25px;"><span style="font-size: 12pt;">${absenceto}</span></td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid;  width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid;  width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 25%; height: 25px; text-align: right;"><span style="font-size: 12pt;">&nbsp; Number of hours:</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; width: 27%; font-weight: bold; height: 25px;">&nbsp;<span style="font-size: 12pt;">${hours}</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 10%; height: 25px; text-align: right;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      </tr>
      <tr style="height: 25px;">
      <td style="width: 25%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid;  width: 27%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 10%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="border-bottom-width: 0px; border-bottom-style: solid; width: 26%; height: 25px;"><span style="font-size: 12pt;">&nbsp;</span></td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="height: 23px;">
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
      </tr>
      <tr style="height: 23px;">
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
      </tr>
      <tr style="color: white; font-weight: bold; font-size: 110%; font-family: verdana; text-align: center; height: 30px; background-color: gray;">
      <td style="height: 30px;"><span style="font-size: 12pt;">Manager Approval</span></td>
      </tr>
      <tr style="height: 23px;">
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
      </tr>
      <tr style="height: 23px;">
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; height: 23px;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="height: 23px;">
      <td style="height: 23px; width: 49.5083%;"><input type="checkbox" name="approvalCheck" checked />&nbsp;&nbsp;<span style="font-size: 14pt;">${approval}</span></td>
      <td style="height: 23px; width: 47.4917%;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr>
      <td>&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="height: 23px;">
      <td style="height: 23px; width: 47.906%;"><img title="box" src="images/unchecked_checkbox.png" alt="bok" width="25" height="25" /><span style="font-size: 14pt;"> Rejected</span></td>
      <td style="height: 23px; width: 46.094%;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="height: 15px;">
      <td style="height: 15px;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;">
      <td style="width: 25.6156%; text-align: right; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;">&nbsp;<span style="font-size: 14pt;">Comments:</span></td>
      <td style="width: 72.3844%;">&nbsp;</td>
      </tr>
      <tr style="border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black;">
      <td style="width: 25.6156%;"><span style="font-size: 12pt;">&nbsp;</span></td>
      <td style="width: 72.3844%;">&nbsp;<span style="font-size: 14pt;">${comments}</span></td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr>
      <td style="width: 70%;">&nbsp;</td>
      <td style="width: 30%;">&nbsp;</td>
      </tr>
      <tr>
      <td style="width: 70%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; vertical-align: bottom;">&nbsp; &nbsp; &nbsp;&nbsp;
      <div class="DMOSsign"><img src="http://portal.cbmportal.com/uploads/signatures/ptoSig/${employeeNum}/${date}.png"></img></div>
      </td>
      <td style="width: 30%; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: black; vertical-align: bottom;">&nbsp;${date}</td>
      </tr>
      <tr>
      <td style="width: 70%; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp;Manager Signature&nbsp;</span></td>
      <td style="width: 30%; border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black;"><span style="font-size: 14pt;">&nbsp; Date: </span></td>
      </tr>
      <tr>
      <td style="width: 70%;">&nbsp;</td>
      <td style="width: 30%;">&nbsp;</td>
      </tr>
      </tbody>
      </table>
      <table style="width: 100%;" border="0" cellpadding="1">
      <tbody>
      <tr style="height: 33px;">
      <td style="border-bottom-width: 0px; border-bottom-style: solid; border-bottom-color: black; text-align: center; font-style: italic; font-variant: normal; font-weight: bold; font-stretch: normal; font-size: 12px; line-height: 30px; font-family: Georgia, serif; height: 33px;"><span style="font-size: 10pt; font-family: arial, helvetica, sans-serif;">Submit to HR after completed</span></td>
      </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    }
  }