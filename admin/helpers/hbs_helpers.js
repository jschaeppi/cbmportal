const moment = require('moment');
module.exports = {
    makeLink: function(route, id, linkBG="light", text, text1) {
        const options = arguments[arguments.length - 1];
            if ((typeof text1) == "string") {
            const result = `<a class='text-white' href='/${route}/${id}' ><button type=button class='badge badge-${linkBG}' />${text} ${text1}</a>`;
            return result;
        } else if((typeof text) == "object") {
            text1 = " ";
            text = text.toDateString();
            const result = `<a class='text-white' href='${route}/${id}' ><button type=button class='badge badge-${linkBG}' />${text} ${text1}</a>`;
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
            if (permission > 3) {
                const result = '<a class="dropdown-item" href="/admin/dashboard/portalUsers">Portal Users</a>';
                return result;
            } 
        } else if (tool === 'stores') {
            const result = '<a class="dropdown-item" href="/admin/dashboard/stores">Store List</a>';                          
            return result;  
	   } else if (tool === 'psList') {
            const result = '<a class="dropdown-item" href="/admin/dashboard/psList">PS List</a>';                          
            return result;
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
        let result = '';
        if (form === 'mileage') {
            for (i=0; i < arr.length; i+=3) {
            result +='<tr>' +
                '<td height="25px" width="25%" style="border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">' + arr[i] + '</td>' +
                '<td height="25px" style="border: 1px solid black; border-bottom: 0; border-right: 0; padding: 3px;">' + arr[i+1] + '</td>' +
                '<td height="25px" style="border: 1px solid black; padding: 3px;">' + arr[i+2] + '</td>' +
                '</tr>';
            }
        } else if (form === 'perDiem') {
            for (i=0; i < arr.length; i+=4) {
                result += '<tr>' +
                '<tr><!-- STARTS ROW1-->' +
                '<td style="width: 20%;border: 2px solid black; padding:3px;text-align: center; font-size:90%;" class="col-md-2">' + arr[i]+ '</td>' +
                '<td style="width: 30%;border: 2px solid black; padding:3px;text-align: center;font-size:90%;" class="col-md-2">' + arr[i+1] + '</td>' +
                '<td style="width: 30%;border: 2px solid black; padding:3px;text-align: center;font-size:90%;" class="col-md-6">' + arr[i+2] + '</td>' +
                '<td style="width: 20%;border: 2px solid black; padding:3px;text-align: center;font-size:90%;"  class="col-md-2">' + arr[i+3] + '</td>' +
                '</tr><!-- ENDS ROW1-->';
            }
        }
        return result;
    },
    convertTime: function(time) {
        return moment(time).format('L');
    },
    detailsReturnBtn: function(form) {
        return `<a href=../../?form=${form}><button type="button" class="btn btn-primary">Back</button></a>`;
    }
}
