import React, { Component } from 'react'

export class Nofirstday extends Component {
    render() {
        return (
            <div className="container">
                <h1 className="heading"><span>&nbsp;&nbsp;&nbsp;No First Day</span></h1><br />
                <form >
                    <label for="employeenum">Employee #:</label><br />
                    <input type="text" id="employeenum" name="employeenum"/><br /><br />
                    <label for="firstLastName">EE Last Name</label><br />
                    <input type="text" id="firstLastName" name="firstLastName"/>
                    <br /><br />
                    <label for="secondLastName">EE Second Last Name:</label><br />
                    <input type="text" id="secondLastName" name="secondLastName"/><br /><br />
                    <label for="firstname">EE First Name:</label><br />
                    <input type="text" id="firstname" name="firstname"/><br /><br />
                    <label for="dm">DM:</label><br />
                    <select id="dm" name="dm">
                    <option value="Ausencio Cruz">Ausencio Cruz</option>
                    <option value="Cruz Hernandez">Cruz Hernandez</option>
                    <option value="Daniel De la Paz">Daniel De la Paz</option>
                    <option value="Lino Huerta">Lino Huerta</option>
                    <option value="Jose Lopez">Jose Lopez</option>
                    <option value="Zach Harlow">Zach Harlow"</option>
                    </select><br /><br />
                    <label >Eligible for rehire:</label><br />
                    <label for="yes_rehire" >Yes</label>&nbsp;
                    <input type="radio"  name="rehire" id="yes_rehire" value="yes" />
                    &nbsp;|&nbsp;
                    <label for="no_rehire" >No</label>&nbsp;
                    <input type="radio"  name="rehire" id="no_rehire" value="no" /> <br /><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }
}

export default Nofirstday
