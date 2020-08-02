    import React, { Component } from 'react'
    import '../css/workTicket.css';
    export class workTicket extends Component {
        constructor() {
            super();
            this.state = {
                employeeName: '',
                employeeNum: '',
                dm: '',
                location: '',
                city: '', 
                state: '',
                workType: '', 
                Billable: '',
                notes: '',
                equipment: '',
                currentLocation: '',
                orderSubmitted: '',
                orderDate: '',
                orderNumber: '',
                startDate: '',
                endDate: '',
                stores: [],
            }
        }

        handleChange = (e) => {
            const value = e.target.value;
            this.setState({
                [e.target.name]: value
            })
        }

        onSubmit = (e) => {
            e.preventDefault();
            
            fetch('http://portal.cbmportal.com:5000/api/WT',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    employeeName: this.state.employeeName,
                    employeeNum: this.state.employeeNum,
                    dm: this.state.dm,
                    location: this.state.location,
                    city: this.state.city, 
                    state: this.state.state,
                    workType: this.state.workType, 
                    Billable: this.state.Billable,
                    notes: this.state.notes,
                    equipment: this.state.equipment,
                    currentLocation: this.state.currentLocation,
                    orderSubmitted: this.state.orderSubmitted,
                    orderDate: this.state.orderDate,
                    orderNumber: this.state.orderNumber,
                    startDate: this.state.startDate,
                    endDate: this.state.endDate,
                })
            })
            .then (res => res.json())
            .then( data => {
                if (data.message) this.props.history.push('/success');
            })
            .catch(err => console.log(err))
        }

        componentDidMount () {
            fetch(`http://portal.cbmportal.com:5000/api/WT/stores`)
            .then(res => res.json())
            .then(data => this.setState({ stores: data }))
    }
        render() {

            return (
                <div className="container">
                    <h1 className="mainHeading"><span>Work Ticket Request</span></h1><br />
                        <form onSubmit={this.onSubmit} className="mainForm">
                            <div className="wrapper1">
                                <div>
                                    <label htmlFor="employeename"> Employee Name:</label>
                                    <input type="text" id="employeename" name="employeeName" required title="Please enter the required information" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="employeenum">Employee #:</label>
                                    <input type="text" id="employeenum" name="employeeNum" maxlength="6" required title="Please enter the required information" onChange={this.handleChange}/>
                                </div>
                            </div>
                        <br />
                            <div className="wrapper1">
                                <div>
                                    <label htmlFor="dm">DM:</label><br />
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
                                <div>
                                    <label >Store Number:</label>
                                    <select name="location" id="storeList" required title="Please select an option" onChange={this.handleChange}>
                                        {this.state.stores.map((store, i) => {
                                            return <option key={i} value={store.store}>{store.store}</option>
                                            })}
                                    </select>
                                 </div>
                            </div>
                        <br /><br />
                            <div className="wrapper1">
                                 <div>
                                    <label htmlFor="city">City:</label><br />
                                    <input type="text" id="city" name="city" required title="Please enter the required information" onChange={this.handleChange}/>
                                </div>
                                <div>
                                    <label htmlFor="state"> State:</label><br />
                                    <input type="text" id="state" name="state" required title="Please enter the required information" onChange={this.handleChange}/>
                                </div>
                            </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="workType">Type of Work:</label><br />
                                <select onChange={this.handleChange} required title="Please select an option" name="workType">
                                    <option value="">Select Type of Work</option>
                                    <option value="Annual Strip">Annual Strip</option>
                                    <option value="Partial Strip">Partial Strip</option>
                                    <option value="Full Extraction">Full Extraction</option>
                                    <option value="Store Remodel">Store Remodel</option>
                                    <option value="Office Recoat">Office Recoat</option>
                                    <option value="Deep Scrub and Recoat">Deep Scrub and Recoat</option>
                                    <option value="Bounce Back">Bounce Back</option>
                                    <option value="4th Quarter Prep">4th Quarter Prep</option>
                                </select>
                            </div>
                            <div>
                                <label>Billable/Non</label><br />
                                <select required title="Please select an option" onChange={this.handleChange} name="Billable">
                                    <option value="">Select - Selecionar</option>
                                    <option value="Billable">Billable</option>
                                    <option value="NON-Billable">NON-Billable</option>
                                </select>
                            </div>
                        </div>
                        <br /><br />
                            <div className="wrapper1">
                            <div id="specialNotes">
                                <label>Special Notes:</label> <br />
                                <textarea id="notes" name="notes" onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="equipmentMoved">
                                <label htmlFor="equipment">What equipment needs to be moved:</label><br />
                                <textarea id="notes" name="equipment" required title="Please enter the required information" onChange={this.handleChange}></textarea>
                            </div>
                        </div>
                        <br /><br />
                    
                        <div className="wrapper1">
                            <label htmlFor="currentLocation">Curent location:</label><br />
                            <select name="currentLocation" id="storeList" required title="Please select an option" onChange={this.handleChange}>
                                {this.state.stores.map((store, i) => {
                                    return <option key={i} value={store.store}>{store.store}</option>
                                    })}
                            </select>
                        </div>
                        <div className="wrapper1" id="orderSubmit">
                            <div id="supplyOrderSubmit">
                                <label >Supply Order Submitted:</label><br />
                                <label htmlFor="orderSubmitted">Yes</label>
                                <input type="radio" name="orderSubmitted" value="yes" required title="Please enter the required information" onChange={this.handleChange}></input>
                                <label htmlFor="orderSubmitted">No</label>
                                <input type="radio" name="orderSubmitted" value="no" required title="Please enter the required information" onChange={this.handleChange}></input>
                            </div>
                         </div>
                         <br /><br />
                        <div className="wrapper1">
                            <div id="supplyOrder">
                                <label>Supply Order Date:</label><br />
                                <input type="date" id="orderDate" name="orderDate" required title="Please enter the required information" onChange={this.handleChange}></input>  
                            </div>
                            <div id="supplyOrder">
                                <label htmlFor="orderNumber">Supply Order Number:</label><br />
                                <input type="text" id="orderNumber" name="orderNumber" required title="Please enter the required information" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label>Project Start Date:</label>
                                <input type="date" id="startDate" name="startDate" required title="Please enter the required information" onChange={this.handleChange}></input>
                             </div>
                            <div>
                                <label>Project End Date:</label>
                                <input type="date" id="endDate" name="endDate" required title="Please enter the required information" onChange={this.handleChange}></input>
                            </div>
                        </div>
                        <br />
                            <input type="submit" className="btn" />
                    </form>
                </div>
            )
        }
    }
    
    export default workTicket
    