import React, { Component } from 'react'
import '../css/PTO.css';
import SignatureCanvas from 'react-signature-canvas'
export class PTO extends Component {
    constructor() {
        super();
        this.state = {
            employeeNum: '',
            employeeName: '',
            dm: '',
            departments: '',
            absencefrom: '',
            absenceto: '',
            hours: '',
            approval: 'Approved',
            comments: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }

    clearPad(e) {
        e.preventDefault();
        this.sigPad.clear();
    }

    onSubmit = (e) => {
        e.preventDefault();
            fetch('http://portal.cbmportal.com:5000/api/pto/', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    employeeNum: this.state.employeeNum,
                    employeeName: this.state.employeeName,
                    dm: this.state.dm,
                    departments: this.state.departments,
                    absencefrom: this.state.absencefrom,
                    absenceto: this.state.absenceto,
                    hours: this.state.hours,
                    approval: this.state.approval,
                    comments: this.state.comments,
                    sig: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),
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
                <h1 className="mainHeading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>PTO</span></h1><br />
                <form onSubmit={this.onSubmit} className="mainForm">
                    <div className="wrapper1">
                        <div>
                            <label forhtml="employeeNum">Employee #:</label>
                            <input type="number" id="ptoemployeeNum" name="employeeNum" maxLength="6" required title="Please enter the required information" onChange={this.handleChange}/>
                        </div>
                        <div>
                            <label forhtml="employeeName">Employee Name</label>
                            <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={this.handleChange}/>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div>
                            <label forhtml="departments">Departments:</label>
                            <select id="departments" name="departments" required title="Please select an option" onChange={this.handleChange}>
                                <option value="Service">Service</option>
                                <option value="Operations">Operations</option>
                                <option value="HR">HR</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                        <div>
                            <label forhtml="dm">DM:</label><br />
                            <select id="dm" name="dm" required title="Please select an option" onChange={this.handleChange}>
                            <option>Select a DM</option>
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
                        <div>
                            <label forhtml="absencefrom">Absence From:</label><br />
                            <input type="date" id="absencefrom" name="absencefrom" required title="Please enter the required information" onChange={this.handleChange} />
                        </div>
                        <div>
                            <label forhtml="absenceto">Absence To:</label><br />
                            <input type="date" id="absenceto" name="absenceto" required title="Please enter the required information" onChange={this.handleChange} />
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1" id="approval">
                        <div>
                            <label forhtml="hours">Enter hours:</label>
                            <input type="number" step="any" id="hours" name="hours" required title="Please enter the required information" onChange={this.handleChange}></input>
                        </div>
                        <div>
                            <label >Manager Approval:</label><br />
                            <label >Approved:</label>
                            <input type="checkbox" name="approval" id="approved" value="Approved" defaultChecked></input><br />
                            <label >Not approved:</label>
                            <input type="checkbox" name="approval" id="approved" value="Not Approved"></input>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div id="sig">
                            <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(255, 255, 255, 1)', width: 400, height: 100, className: 'sigPad'}} ref={(ref) => { this.sigPad = ref }} />
                            <button id="sigClear" onClick={this.clearPad.bind(this)} type="button ">Clear</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="wrapper1">
                        <div id="ptoCommentsDiv">
                            <label forhtml="comments">Comments:</label><br />
                            <textarea id="ptocomments" name="comments" onChange={this.handleChange}></textarea>
                        </div>
                    </div>
                    <br />
                    <input type="submit" className="btn" />
                    
                </form>
            </div>
        )
    }
}

export default PTO
