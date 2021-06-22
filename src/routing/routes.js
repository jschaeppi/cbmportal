import NewHire from '../pages/New_Hire';
import BackPay from '../pages/backPay';
import Bonus from '../pages/Bonus';
import HotelRequest from '../pages/hotelRequest';
import Mileage from '../pages/Mileage';
import PerDiem from '../pages/perDiem';
import PTO from '../pages/PTO';
import Term from '../pages/Term';
import TimeAdjustment from '../pages/timeAdjustment';
import TargetOrder from '../pages/targetOrder';
import Uniform from '../pages/Uniform';
import WorkTicket from '../pages/workTicket';
export const routes = [{
        "component": BackPay,
        "path": "/backPay", 
        "heading": "Back Pay"
        },
        {
        "component": Bonus,
        "path":"/bonus", 
        "heading": "Bonus"
        },
        {
        "component": HotelRequest,
        "path":"/hotelrequest",
        "heading": "Hotel Request" 
        },
        {
        "component": Mileage,
        "path":"/mileage",
        "heading": "Mileage" 
        },
        { 
        "component": NewHire,
        "path":"/newhire",
        "heading": "New Hire" 
        },
        {
        "component": PerDiem,
        "path":"/perdiem",
        "heading": "Per Diem" 
        },
        {
        "component":PTO,
        "path":"/pto",
        "heading": "PTO"
        },
        {
        "component":TargetOrder,
        "path":"/targetorder",
        "heading": "Target Order" 
        },
        {
        "component":Term,
        "path":"/term",
        "heading": "Termination"
        },
        {
        "component":TimeAdjustment,
        "path":"/timeadjustment",
        "heading": "Time Adjustment" 
        },
        {
        "component":Uniform,
        "path":"/uniform",
        "heading": "Uniform" 
        },
        {
        "component":WorkTicket,
        "path":"/workticket",
        "heading": "Work Ticket" 
        }
    ]