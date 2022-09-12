const moment = require('moment');
let Backpay = require('../../src/Model/backpayModel');
let Bonus = require('../../src/Model/bonusModel');
let Hotel = require('../../src/Model/hotelModel');
let Mileage = require('../../src/Model/mileageModel');
let Newhire = require('../../src/Model/newhireModel');
let PerDiem = require('../../src/Model/perdiemModel');
let PTO = require('../../src/Model/ptoModel');
let TargetSupply = require('../../src/Model/targetsupply');
let Term = require('../../src/Model/termModel');
let TimeAdjustment = require('../../src/Model/timeadjustModel');
let Uniform = require('../../src/Model/uniformModel');
let WT = require('../../src/Model/wtModel');
module.exports = {
    makeLink: function(route, id='', linkBG="light", text, text1) {
        const options = arguments[arguments.length - 1];
            if ((typeof text1) == "string") {
            const result = `<a class='text-white' href='/${route}/${id}' ><button type=button class='badge badge-${linkBG}' />${text} ${text1}</a>`;
            return result;
        } else if((typeof text) == "object") {
            text1 = " ";
            text = text.toDateString();
            const result = `<a class='text-white' href='${route}/${id}' ><button type=button class='badge badge-${linkBG}' />${text} ${text1}</a>`;
            return result;
        } else if ((typeof id) == "string" && (typeof text1) == "object") {
            const text1 = '';
            const result = `<a class='text-white' href='/admin/dashboard/${route}' ><button type=button class='btn btn-${linkBG} mr-3' />${text} ${text1}</a>`;
            return result;
        } else {
            text1 = " ";
            const result = `<a class='text-white' href='${route}/${id}' ><button type=button class='badge badge-${linkBG}' />${text} ${text1}</a>`;
            return result;
        }  
        },
    successMessage: function(method, status, name) {
        if (status) {
            if (method == "delete") {
                const result = '<div class="alert alert-success" role="alert">'+
                `${name} was deleted successfully!`+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
                '</button>'+
                '</div>';
                return result;
            } else if (method == "create") {
                const result = '<div class="alert alert-success" role="alert">'+
                `${name} was created successfully!`+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
                '</button>'+
                '</div>';
                return result;
            } else if (method =="updated") {
                const result = '<div class="alert alert-success" role="alert">'+
                `${name} was updated successfully!`+
                '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
                '<span aria-hidden="true">&times;</span>'+
                '</button>'+
                '</div>';
                return result;
            }
        } else if (status === false) {
            const result = '<div class="alert alert-danger" role="alert">'+
            `${name} was not updated successfully!`+
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">'+
            '<span aria-hidden="true">&times;</span>'+
            '</button>'+
            '</div>';
        return result;
        } else {
            const result ='';
            return result;
        }
    },
    permissionCheck: function(permission, tool) {
        if (tool === 'portalUsers') {
            if (permission == 5) {
                const result = '<option value="5">Super User</option>';
                return result;
            }
        }
        if (tool == "navPortalUsers") {
            if (permission > 4) {
                const result = '<a class="dropdown-item" href="/admin/dashboard/portalUsers">Portal Users</a>';
                return result;
            } 
        } else if (tool === 'stores') {
            const result = '<a class="dropdown-item" href="/admin/dashboard/stores">Store List</a>';                          
            return result;  
	   } else if (tool === 'psList') {
           if (permission > 2) {
            const result = '<a class="dropdown-item" href="/admin/dashboard/psList">PS List</a>';                          
            return result;
           } else {
               return;
           }
	   } else if (tool === 'Forms') {
           if (permission > 2) {
            const result = `<li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Forms
            </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="nav-link" href="/admin/dashboard?form=backpay">BackPay</a>
                <a class="nav-link" href="/admin/dashboard?form=bonus">Bonus</a>
                <a class="nav-link" href="/admin/dashboard?form=hotel">Hotel</a>
                <a class="nav-link" href="/admin/dashboard?form=mileage">Mileage</a>
                <a class="nav-link" href="/admin/dashboard?form=newhire">Newhire</a>
                <a class="nav-link" href="/admin/dashboard?form=perDiem">PerDiem</a>
                <a class="nav-link" href="/admin/dashboard?form=pto">PTO</a>
                <a class="nav-link" href="/admin/dashboard?form=targetOrder">Target Order</a>
                <a class="nav-link" href="/admin/dashboard?form=termination">Termination</a>
                <a class="nav-link disabled" href="/admin/dashboard?form=timeAdjustment">Time Adjustment</a>
                <a class="nav-link" href="/admin/dashboard?form=uniform">Uniform</a>
                <a class="nav-link" href="/admin/dashboard?form=wt">Work Ticket</a>
              </div>
            </li>`;                      
            return result;
           }
   }
    },
    districtCount: function(district) {
        districtArray = district.split(',');
        let result = "";
        if (districtArray.length > 1) {
            result += districtArray.map(item => {
                return `<option value="${item}">${item}</option>`;
            });
                    return result;
        }

    },
    camelCase: function(result, field) {
        for (i=0, field = field; i < result.length; i++) {
             let arr = result[i][field].split(' ');
            if (arr.length > 1) {
            arr[0] = arr[0].replace(arr[0].charAt(0), arr[0].charAt(0).toUpperCase());
            arr[1] = arr[1].replace(arr[1].charAt(0), arr[1].charAt(0).toUpperCase());
            result[i][field] = arr.join(" ");
            } else {
            arr[0] = arr[0].replace(arr[0].charAt(0), arr[0].charAt(0).toUpperCase());
            result[i][field] = arr.join(" ");
            
            }
        }
            return result;
    },
    upperTitle: function(form, text) {
        return form.replace(form[0],form[0].toUpperCase()) + ' ' + text.replace(text[0],text[0].toUpperCase());
    },
    mileageDetailsLoop: function(arr, form) {
        let result = [];
        if (form === 'mileage') {
            for (i=0; i < arr.length; i+=3) {
            result +='<tr>' +
                '<td height="25px" width="25%" style="border: 1px solid black; border-right: 0; padding: 3px;">' + arr[i] + '</td>' +
                '<td height="25px" style="border: 1px solid black; border-right: 0; padding: 3px;">' + arr[i+1] + '</td>' +
                '<td height="25px" style="border: 1px solid black; padding: 3px;">' + arr[i+2] + '</td>' +
                '</tr>';
            }
            return result;
        } else if (form === 'perDiem') {
            for (i=0; i < arr.length; i+=4) {
                result += '<tr>' +
                '<td style="width: 20%;border: 2px solid black; padding:3px;text-align: center; font-size:90%;" class="col-md-2">' + arr[i] + '</td>' +
                '<td style="width: 30%;border: 2px solid black; padding:3px;text-align: center;font-size:90%;" class="col-md-2">' + arr[i+1] + '</td>' +
                '<td style="width: 30%;border: 2px solid black; padding:3px;text-align: center;font-size:90%;" class="col-md-6">' + arr[i+2] + '</td>' +
                '<td style="width: 20%;border: 2px solid black; padding:3px;text-align: center;font-size:90%;"  class="col-md-2">' + arr[i+3] + '</td>' +
                '</tr><!-- ENDS ROW1-->';
            }
            return result;
        }
    },
    convertTime: function(time) {
        return moment(time).format('L');
    },
    detailsReturnBtn: function(form) {
        return `<a href=../../?form=${form}><button type="button" class="btn btn-primary">Back</button></a>`;
    },
    formSelection: async function(sort=true, form, id='') {
        if (sort === false) {
            switch (form) {

                case "backpay":
                result = await Backpay.findOne({_id: id}).lean();
                return result;

                case "bonus":
                result = await Bonus.findOne({_id: id}).lean();
                return result;

                case "hotel":
                result = await Hotel.findOne({_id: id}).lean();
                return result;

                case "mileage":
                result = await Mileage.findOne({_id: id}).lean();
                return result;

                case "newhire":
                result = await Newhire.findOne({_id: id}).lean();
                return result;
                
                case "perDiem":
                result = await PerDiem.findOne({_id: id}).lean();
                return result;

                case "pto":
                result = await PTO.findOne({_id: id}).lean();
                return result;

                case "termination":
                result = await Term.findOne({_id: id}).lean();
                return result;

                case "targetOrder":
                result = await TargetSupply.findOne({_id: id}).lean();
                return result;

                case "uniform":
                result = await Uniform.findOne({_id: id}).lean();
                return result;

                case "wt":
                result = await WT.findOne({_id: id}).lean();
                return result;
            }
        } else {
            switch (form) {
                case "backpay":
                result = await Backpay.find().lean().sort({dm: 1});
                return result;

                case"bonus":
                result = await Bonus.find().lean().sort({dm: 1});
                return result;

                case "hotel":
                result = await Hotel.find().lean().sort({dm: 1});
                return result;

                case "mileage":
                result = await Mileage.find().lean().sort({dm: 1});
                return result;

                case "newhire":
                result = await Newhire.find().lean().sort({ date: 1 });
                return result;
                
                case "perDiem":
                result = await PerDiem.find().lean().sort({dm: 1});
                return result;

                case "pto":
                result = await PTO.find().lean().sort({date: 1});
                return result;

                case "termination":
                result = await Term.find().lean().sort({dm: 1});
                return result;

                case "targetOrder":
                result = await TargetSupply.find().lean().sort({dm: 1});
                return result;

                case "uniform":
                result = await Uniform.find().lean().sort({employeeNum: 1});
                return result;
                
                case "wt":
                result = await WT.find().lean().sort({dm: 1});
                return result;
            }
        }
    },
    formSearch: async function(form, value) {
        switch (form) {

            case "backpay":
            result = await Backpay.find({employeeName: value}).lean();
            return result;

            case "bonus":
            result = await Bonus.findOne({_id: id}).lean();
            return result;

            case "hotel":
            result = await Hotel.findOne({_id: id}).lean();
            return result;

            case "mileage":
            result = await Mileage.findOne({_id: id}).lean();
            return result;

            case "newhire":
            result = await Newhire.findOne({_id: id}).lean();
            return result;
            
            case "perDiem":
            result = await PerDiem.findOne({_id: id}).lean();
            return result;

            case "pto":
            result = await PTO.findOne({_id: id}).lean();
            return result;

            case "termination":
            result = await Term.findOne({_id: id}).lean();
            return result;

            case "targetOrder":
            result = await TargetSupply.findOne({_id: id}).lean();
            return result;

            case "uniform":
            result = await Uniform.findOne({_id: id}).lean();
            return result;

            case "wt":
            result = await WT.findOne({_id: id}).lean();
            return result;
        }
    },
    setDistrict: function(district) {
        console.log(district);
       return (
        `<option value="MN RETAIL DIST" ${district.indexOf('MN RETAIL DIST') > -1 ? 'selected' : ''}>MN Retail District</option>
       <option value="MN Northern Dist" ${district.indexOf('MN Northern Dist') > -1 ? 'selected' : ''}>MN Northern District</option>
       <option value="MN Grocery-Retail" ${district.indexOf('MN Grocery-Retail') > -1 ? 'selected' : ''}>MN Grocery-Retail</option>
       <option value="Hospitality" ${district === 'Hospitality' ? 'selected' : ''}>Hospitality</option>
       <option value="IA-IL" ${district === 'IA-IL' ? 'selected' : ''}>IA-IL</option>
       <option value="IL-WI" ${district === 'IL-WI' ? 'selected' : ''}>IL-WI</option>
       <option value="ND-NW-MN" ${district === 'ND-NW-MN' ? 'selected' : ''}>ND-NW-MN</option>
       <option value="NEB-SD-Western-IA" ${district === 'NEB-SD-Western-IA' ? 'selected' : ''}>NEB-SD-Western-IA</option>
        <option value="office,MN RETAIL DIST,MN Northern Dist,MN Grocery-Retail,IA-IL,IL-WI,ND-NW-MN,NEB-SD-Western-IA" ${district.indexOf('office') > -1 ? 'selected' : ''}>Office</option>
    `)
    },
    setUserPermission: function(permissionLevel) {
        return (`
            <option value="5" ${permissionLevel === '5' ? 'selected' : ''}>Super User</option>
            <option value="4" ${permissionLevel === '4' ? 'selected' : ''}>Office</option>
            <option value="3" ${permissionLevel === '3' ? 'selected' : ''}>DM</option>
            <option value="2" ${permissionLevel === '2' ? 'selected' : ''}>PS/OS</option>
        `)
    }
}
