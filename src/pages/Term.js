import React, { Component } from 'react'
import Nocall from '../Components/Nocall';
import Quit from '../Components/Quit';
import Nofirstday from '../Components/Nofirstday';
import Other from '../Components/Other';
import '../css/term.css';

export class Term extends Component {
    constructor () {
        super();
        this.state = {
            termtype: ''
        }
    }
    termtype(e) {
        console.log(e.target.value);
        this.setState({
            termtype: e.target.value
        })
    }

    render() {
        const component = this.state.termtype;
        if (!component) {
            return (
                <div>
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={this.termtype.bind(this)}>
                        <option value=''>Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    <div>
                        No Termination form was selected
                    </div>
                </div>
            )
        } else if (component === "quit" ) {
            return (
                <div>
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={this.termtype.bind(this)}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    <div>
                        <Quit />
                    </div>
                </div>
            )
        }   
        else if (component === "nocall" ) {
            return (
                <div>
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={this.termtype.bind(this)}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    <div>
                        <Nocall />
                    </div>
                </div>
            )
        }   
        else if (component === "noFirstDay" ) {
            return (
                <div>
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={this.termtype.bind(this)}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    <div>
                        <Nofirstday />
                    </div>
                </div>
            )
        }   
        else if (component === "other" ) {
            return (
                <div>
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={this.termtype.bind(this)}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    <div>
                        <Other />
                    </div>
                </div>
            )
        }   
    }
}

export default Term
