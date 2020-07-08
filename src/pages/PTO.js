import React, { Component } from 'react'
import '../css/PTO.css';
import SigPad from '../Components/sigPad';
export class PTO extends Component {
    render() {
        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>PTO</span></h1><br />
                <form>
                    <label for="employeenum">Employee #:</label><br />
                    <input type="number" id="employeenum" name="employeenum"/><br /><br />
                    <label for="employeename">Employee Name</label><br />
                    <input type="text" id="employeename" name="employeename"/>
                    <br /><br />
                    <label for="departments">Departments:</label><br />
                    <select id="departments" name="departments">
                        <option value="Service">Service</option>
                        <option value="Operations">Operations</option>
                        <option value="HR">HR</option>
                        <option value="Maintenance">Maintenance</option>
                    </select><br /><br />
                    <label for="dm">DM:</label><br />
                    <select id="dm" name="dm">
                        <option value="Ausencio Cruz">Ausencio Cruz</option>
                        <option value="Cruz Hernandez">Cruz Hernandez</option>
                        <option value="Daniel De la Paz">Daniel De la Paz</option>
                        <option value="Lino Huerta">Lino Huerta</option>
                        <option value="Jose Lopez">Jose Lopez</option>
                        <option value="Zach Harlow">Zach Harlow"</option>
                    </select><br /><br />
                    <label for="absencefrom">Absence From:</label><br />
                    <input type="date" id="absencefrom" name="absencefrom" /><br /><br />
                    <label for="absenceto">Absence To:</label><br />
                    <input type="date" id="absenceto" name="absenceto" /><br /><br />
                    <label for="hours">Enter hours:</label><br />
                    <input type="number" id="hours" name="hours"></input><br /><br />
                    <label >Manager Approval:</label><br />
                    <label >Approved:</label>
                    <input type="checkbox" name="approval" id="approved" defaultChecked></input>
                    &nbsp;|&nbsp;<label >Not approved:</label>
                    <input type="checkbox" name="approval" id="approved"></input><br /><br />
                    <SigPad />
                    <br />
                    <br />
                    <br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                    
                </form>
            </div>
        )
    }
}

export default PTO
