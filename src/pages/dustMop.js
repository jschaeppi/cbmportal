import React, { Component } from 'react'
import '../css/dustmop.css';
import axios from 'axios';
export class dustMop extends Component {
    constructor() {
        super();
        this.state = {
            stores: [],
            picture: '',
            employeeName: '', 
            mopsLeft: '',
            location: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    handleChange = (e) => {
        if (e.target.name === "picture") {  
            console.log(document.getElementById('uploadPicture').files[0])
            this.setState({ picture: document.getElementById('uploadPicture').files[0]})
        }
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        })
    }


    onSubmit = (e) => {
        e.preventDefault();
        const upload_file = document.getElementById('uploadPicture').files[0];
        const formData = new FormData();
        formData.append('file', upload_file);
        formData.append('location', this.state.location);
        formData.append('employeeName', this.state.employeeName);
        formData.append('mopsLeft', this.state.mopsLeft);
        console.log(...formData);
        axios.post('http://portal.cbmportal.com:5000/api/dustmop/', formData)
        .then( res => {
            if (res.data.message) this.props.history.push('/success');
        })
        .catch(err => console.log(err))
    }


    componentDidMount() {
        fetch('http://portal.cbmportal.com:5000/api/dustmop/stores')
        .then(res => res.json())
        .then(data => this.setState({stores: data})
        );
    }

    render() {
        return (
            <div className="container">
                <h1 id="dustmopHeading" className="mainHeading"><span>Dustmop Request</span></h1><br />
                    <form onSubmit={this.onSubmit} id="dustmopForm" className="mainHeading">
                        <div className="wrapper1">
                            <div>
                                <label >Store Number:</label>
                                <select onChange={this.handleChange} required name="location" id="storeList">
                                    {this.state.stores.map((store, i) => {
                                        return <option key={i} value={store.store}>{store.store}</option>
                                            })}
                                </select>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="employeename">Employee Name</label><br />
                                <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br /> 
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="mopsLeft">Dust mops left:</label><br />
                                <input type="number" id="mopsLeft" name="mopsLeft" required title="Please enter the required information" onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="picture">Take Picture:</label><br />
                                <input type="file" name="picture" id="uploadPicture" required title="Please select a file" onChange={this.handleChange}></input>
                            </div>
                        </div>
                        <br /><br />
                        <input type="submit" className="btn" />
                    </form>
            </div>
        )
    }
}

export default dustMop
