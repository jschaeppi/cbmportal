import React, { Component } from 'react'

export class Nocall extends Component {
    constructor() {
        super();
            this.state = {
                rehire: 'yes',
                isHidden: true
            }
    }
    noRehire(e) {
        console.log(e.target.value);
        this.setState({
            rehire: e.target.value,
            isHidden: (e.target.value === "yes") ? true:false
        })
    }
    render() {
        return (
            <div className="container">
                <h1 className="heading"><span>No Show/No Call</span></h1><br />
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
                    <label for="lastworked">Last day worked:</label><br />
                    <input type="date" id="lastworked" name="lastworked" /><br /><br />
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
                    <input type="radio"  name="rehire" id="yes_rehire" value="yes" onChange={this.noRehire.bind(this)}/>
                    &nbsp;|&nbsp;
                    <label for="no_rehire" >No</label>&nbsp;
                    <input type="radio"  name="rehire" id="no_rehire" value="no" onChange={this.noRehire.bind(this)}/> <br /><br />
                    <p style={{visibility: this.state.isHidden ? "hidden":"visible"}}>Please include why you wouldn't rehire the employee?</p>
                    <label for="norehirereason" style={{visibility: this.state.isHidden ? "hidden":"visible"}}>Reason for no rehire:</label> <br />
                    <textarea name="norehirereason" id="norehirereason" style={{visibility: this.state.isHidden ? "hidden":"visible"}}></textarea><br /><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }
}

export default Nocall
