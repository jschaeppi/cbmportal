import React, { Component } from 'react';
import '../css/uniform.css';
import Sigpad from '../Components/sigPad';
import Moment from 'react-moment';
import 'moment-timezone';

export class Uniform extends Component {
    constructor() {
        super();
        this.state = {
            numShirts: ''
        }
    }
    handleChange = (e) => {
        this.setState({
            numShirts: e.target.value
        })
    }

    getCost = () => {
        const cost = '$' + (Number(this.state.numShirts) *6);
        return (
            <div>
                <input type="text" name="cost" value={cost  }></input>
            </div>
        );
    }
    render() {
        const dateToFormat = new Date();
        return (
            <div className ="container">
            <h1 className="heading"><span>Uniform Order </span></h1><br />
                <form >
                    <label for="employeenum">Employee #:</label><br />
                    <input type="text" id="employeenum" name="employeenum"/><br /><br />
                    <label for="firstName">Employee First Name:</label><br />
                    <input type="text" id="firstName" name="firstName"/><br /><br />
                    <label for="firstLastName">Employee Last Name:</label><br />
                    <input type="text" id="secondLastName" name="secondLastName"/><br /><br />
                    <label for="address" id="address">Address:</label> <br />
                    <textarea name="address" id="address"></textarea><br /><br />
                    <label for="apt">Apt # </label><br />
                    <input type="text" id="apt" name="apt"/><br /><br />
                    <label for="city">City:</label><br />
                    <input type="text" id="city" name="city"/><br /><br />
                    <label for="state">State:</label><br />
                    <input type="text" id="state" name="state"/><br /><br />
                    <label for="zip">Zip:<br />
                    <input type="text" id="zip" name="zip" /></label><br /><br />
                    <label for="quantity">Enter Shirt Quantity:</label><br />
                    <input type="text" id="quantity" name="quantity" onChange={this.handleChange.bind(this)} /><br /><br />
                    <label for="shirtCost">Total to be Deducted from paycheck:</label><br />
                    {this.getCost()}
                    <br /><br />
                    <label>Uniform Size:</label><br />
                    <input type="radio" id="small" name="size" value="small"/>
                    <label for="small" id="uniformSize">Small</label>
                    <input type="radio" id="medium" name="size" value="medium"/>
                    <label for="medium" id="uniformSize">Medium</label>
                    <input type="radio" id="large" name="size"  value="large"/>
                    <label for="large" id="uniformSize">Large</label>
                    <input type="radio" id="x-large" name="size" value="x-large"/>
                    <label for="x-large" id="uniformSize">X-Large</label><br />
                    <br />
                    <label >Signature:</label><br />
                    <Sigpad />
                    <br /><br /><br />
                    <label for="date">Date:</label><br />
                    <div id="date">
                        <Moment format="MM/DD/YYYY" date={dateToFormat} />
                    </div><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
    }
}

export default Uniform
