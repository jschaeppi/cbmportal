import React, { Component } from 'react'
import '../css/propane.css';
import Stores from '../Components/Stores';
import axios from 'axios';
export class Propane extends Component {
    constructor() {
        super();
        this.state = {
            stores: [],
            notes: '',
            employeeName: '',
            tanksLeft: '',
            location: '',
            picture: null,
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleChange = (e) => {
    
        const {name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
            const upload_file = document.getElementById('uploadPicture').files[0];
            const formData = new FormData();
            formData.append('file', upload_file);
            formData.append('location', this.state.location);
            formData.append('employeeName', this.state.employeeName);
            formData.append('notes', this.state.notes);
            formData.append('tanksLeft', this.state.tanksLeft);
            axios.post('http://portal.cbmportal.com:5000/api/propane/', formData)
            .then( res => {
                if (res.data.message) this.props.history.push('/success');
            })
            .catch(err => console.log(err))
}

    componentDidMount () {
        fetch('http://portal.cbmportal.com:5000/api/propane/stores')
        .then(res => res.json())
        .then(data => this.setState({stores: data})
        );
    }

    render() {
        return (
            <div className="container">
                <h1><span>Propane Request</span></h1><br />
                    <form onSubmit={this.onSubmit} >
                        <div className="wrapper1">
                            <label>Store Number:</label>
                            <br />
                            <select name="location" id="storeList" required title="Please select an option" onChange={this.handleChange}>
                            <Stores stores={this.state.stores} />
                            </select>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label forhtml="employeename">Employee Name</label><br />
                            <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={this.handleChange}/>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label forhtml="tanksLeft">How many tanks are left in the cage:</label><br />
                            <input type="number" id="tanksLeft" name="tanksLeft" maxLength="3" required title="Please enter the required information" onChange={this.handleChange}/>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label forhtml="picture">Take Picture:</label><br />
                            <input type="file" name="picture" id="uploadPicture" required title="Please select a file" onChange={this.handleChange}></input>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label >Notes:</label> <br />
                            <textarea id="propaneNotes" name="notes" onChange={this.handleChange}></textarea>
                        </div>
                    <br /><br />
                    <input type="submit" className="btn" />
                </form>
            </div>
        )
    }
}

export default Propane
