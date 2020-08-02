import React, { Component } from 'react'

export class Other extends Component {
    constructor() {
        super();
            this.state = {
                rehire: 'yes',
                isHidden: true,
                firstName: '',
                employeeNum: '',
                dm: '',
                firstLast: '',
                secondLast: '',
                //rehire: '',
                norehireReason: '',
                lastWorked: '',
                warnings: '',
                quitReason: '',
            }
            this.noRehire = this.noRehire.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.handleChange = this.handleChange.bind(this);

    }
    noRehire = (e) => {
        console.log(e.target.value);
        this.setState({
            rehire: e.target.value,
            isHidden: (e.target.value === "yes") ? true:false
        })
    }

    handleChange = (e) => {
        console.log(e.target.name)
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
            fetch('http://portal.cbmportal.com:5000/api/other/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                employeeNum: this.state.employeeNum,
                dm: this.state.dm,
                firstLast: this.state.firstLast,
                secondLast: this.state.secondLast,
                rehire: this.state.rehire,
                norehireReason: this.state.norehireReason,
                lastWorked: this.state.lastWorked,
                warnings: this.state.warnings,
                quitReason: this.state.quitReason,
            })
            })
            .then(res => res.json())
            .then( data => {
                if (data.message) this.props.history.push('/success');
            })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div className="container">
                <h1 id="termHeading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Other</span></h1><br />
                <form onSubmit={this.onSubmit} id="termForm">
                <div className="wrapper1">
                <div>
                    <label forhtml="employeenum">Employee #:</label><br />
                    <input type="text" id="employeeNum" name="employeeNum" maxlength="6" required title="Please enter the required information" onChange={this.handleChange}/>
                    </div>
                    <div>
                    <label forhtml="firstLastName">EE Last Name</label>
                    <input type="text" id="firstLastName" name="firstLast" required title="Please enter the required information" onChange={this.handleChange}/>
                    </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">  
                    <div>
                    <label forhtml="secondLastName">EE Second Last Name:</label>
                    <input type="text" id="secondLastName" name="secondLast" onChange={this.handleChange}/>
                    </div> 
                    <div>
                    <label forhtml="firstname">EE First Name:</label>
                    <input type="text" id="firstName" name="firstName" required title="Please enter the required information" onChange={this.handleChange}/>
                    </div>
                    </div><br /><br />
                    <div className="wrapper1">
                    <div>
                    <label forhtml="lastWorked">Last day worked:</label>
                    <input type="date" id="lastWorked" name="lastWorked" required title="Please enter the required information" onChange={this.handleChange} />
                    
                    </div>
                    <div>
                    <label forhtml="dm">DM:</label><br />
                    <select id="dm" name="dm" required title="Please select an option" onChange={this.handleChange}>
                    <option value="Ausencio Cruz">Ausencio Cruz</option>
                    <option value="Cruz Hernandez">Cruz Hernandez</option>
                    <option value="Daniel De la Paz">Daniel De la Paz</option>
                    <option value="Lino Huerta">Lino Huerta</option>
                    <option value="Jose Lopez">Jose Lopez</option>
                    <option value="Zach Harlow">Zach Harlow"</option>
                    </select>
                    </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div id="discipline">
                    <label >Any prior verbal discussions/warnings given:</label>
                    
                    <label for="yes_warning" >Yes</label>&nbsp;
                    <input type="radio" name="warnings" id="yes_warning" value="yes" required title="Please enter the required information" onChange={this.handleChange}/>
                    &nbsp;|&nbsp;
                    <label for="no_warning" >No</label>&nbsp;
                    <input type="radio" name="warnings" id="no_warning" value="no" required title="Please enter the required information" onChange={this.handleChange}/>
                    </div>
                    <div>
                    <label >Eligible for rehire:</label><br /><br />
                    <label for="yes_rehire" >Yes</label>&nbsp;
                    <input type="radio"  name="rehire" id="yes_rehire" value="yes" required title="Please enter the required information" onChange={this.noRehire}/>
                    &nbsp;|&nbsp;
                    <label for="no_rehire" >No</label>&nbsp;
                    <input type="radio"  name="rehire" id="no_rehire" value="no" required title="Please enter the required information" onChange={this.noRehire}/>
                    </div> </div><br /><br />
                    <div className="wrapper1">
                        <div>
                    <label for="norehirereason" style={{visibility: this.state.isHidden ? "hidden":"visible"}}>Explain why not to re-hire this EE:</label>
                    <textarea name="norehireReason" id="norehireReason" style={{visibility: this.state.isHidden ? "hidden":"visible"}} onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                    <label for="quitReason">Employee reason for quitting:</label><br /><br />
                    <textarea name="quitReason" id="quitReason" required title="Please enter the required information" onChange={this.handleChange}></textarea>
                    </div>
                    </div>
                    <br />
                    <br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }
}

export default Other
