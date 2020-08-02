import React, { Component } from 'react';
import '../css/uniform.css';
import SignatureCanvas from 'react-signature-canvas'
import 'moment-timezone';

export class Uniform extends Component {
    constructor() {
        super();
        this.state = {
            employeeNum: 0,
            firstName: '',
            lastName: '',
            address: '', 
            apt: '',
            city: '',
            state: '',
            zip: 0,
            cost: 0, 
            quantity: 0,
            size:'',
            date: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.getCost = this.getCost.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    getCost = (e) => {
        const value = e.target.value
        this.setState({
            quantity: value,
            cost: (Number(value) *6)
        })
    }

    clearPad(e) {
        e.preventDefault();
        this.sigPad.clear();
    }

    onSubmit = (e) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        e.preventDefault();
        this.setState({
            date: `${month}/${date}/${year}`
        })
        fetch('http://portal.cbmportal.com:5000/api/uniform', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                employeeNum: this.state.employeeNum,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address, 
                apt: this.state.apt,
                city: this.state.city,
                state: this.state.state,
                zip: this.state.zip,
                cost: this.state.cost, 
                quantity: this.state.quantity,
                size:this.state.size,
                date: this.state.date,
                sig: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),
            }),
            })
            .then(res => res.json())
            .then(data =>  {
                if (data.message) {
                    this.props.history.push('/success');
                }
            })
            .catch(err => console.log(err))


    }
    render() {

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        return (
            <div className ="container">
                <h1 className="mainHeading"><span>Uniform Order </span></h1><br />
                    <form onSubmit={this.onSubmit} className="mainForm">
                        <div className="wrapper1">
                            <label htmlFor="employeenum">Employee #:</label><br />
                            <input type="number" className="employeeNum" id="employeeNum" name="employeeNum" maxLength="6" required title="Please enter the required information" onChange={this.handleChange}/>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="uniformFirstName">
                                <label htmlFor="firstName">Employee First Name:</label>
                                <input type="text" id="firstName" name="firstName" required title="Please enter the required information" onChange={this.handleChange}/>
                            </div>
                            <div id="uniformFirstLast">
                                <label htmlFor="firstLastName">Employee Last Name:</label>
                                <input type="text" id="firstLastName" name="lastName" required title="Please enter the required information" onChange={this.handleChange}/>
                            </div>
                         </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="addressDiv">
                                 <label htmlFor="address" id="address">Address:</label><br />
                                <textarea name="address" id="address" required title="Please enter the required information" onChange={this.handleChange}></textarea>
                            </div>
                            <div id="addressDiv">  
                                <label htmlFor="apt">Apt # </label><br />
                                <input type="text" id="apt" name="apt" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1" id="geo">
                            <div id="cityDiv">
                            <label htmlFor="city">City:</label><br />
                            <input type="text" id="city" name="city" required title="Please enter the required information" onChange={this.handleChange}/>
                             </div>
                            <div id="stateDiv">
                            <label htmlFor="state">State:</label><br />
                            <input type="text" id="state" name="state" required title="Please enter the required information" onChange={this.handleChange}/>
                        
                            </div>
                            <div id="zipDiv">
                            <label htmlFor="zip">Zip:</label><br />
                            <input type="number" id="zip" name="zip" required title="Please enter the required information" onChange={this.handleChange} />
                            </div>
                        </div>
                         <br /><br />
                        <div className="wrapper1">
                            <div id="quantity">
                            <label htmlFor="quantity">Enter Shirt Quantity:</label>
                            <input type="number" name="quantity" required title="Please enter the required information" onChange={this.getCost} />
                        
                            </div>
                            <div id="quantity">
                            <label htmlFor="shirtCost">Total to be Deducted from paycheck:</label>
                        
                            <input type="number" name="quantity" placeholder={this.state.cost} value={this.state.cost} readOnly/>
                            </div>
                        </div>
                         <br /><br />
                         <div id="sizes">
                            <label>Uniform Size:</label><br />
                            <input type="radio" id="small" name="size" value="small" required title="Please enter the required information"onChange={this.handleChange}/>
                            <label htmlFor="small" id="uniformSize">Small</label>
                            <input type="radio" id="medium" name="size" value="medium" required title="Please enter the required information"onChange={this.handleChange}/>
                            <label htmlFor="medium" >Medium</label>
                            <input type="radio" id="large" name="size"  value="large" required title="Please enter the required information"onChange={this.handleChange}/>
                            <label htmlFor="large" id="uniformSize">Large</label>
                            <input type="radio" id="x-large" name="size" value="x-large" required title="Please enter the required information"onChange={this.handleChange}/>
                            <label htmlFor="x-large" id="uniformSize">X-Large</label><br />
                         </div>
                         <br />
                        <div className="wrapper1">
                            <div id="uniformSig">
                                <label >Signature:</label><br />
                                <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(255, 255, 255, 1)', width: 400, height: 100, className: 'sigPad'}} ref={(ref) => { this.sigPad = ref }} />
                                <button id="sigClear" onClick={this.clearPad.bind(this)} type="button ">Clear</button>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div id="dateContainer">
                            <label htmlFor="date">Date:</label>
                            <label>{`${month}/${date}/${year}`}</label>
                        </div><br />
                         <input type="submit" className="btn" />
                    </form>
                </div>
        )
    }
}

export default Uniform
