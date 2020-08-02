import React from 'react';
import '../css/New_Hire.css';
import Stores from '../Components/Stores';
import DM from '../Components/DM';

class NewHire extends React.Component {
    constructor() {
        super();
            this.state = {
                isHidden: true,
                firstName: '',
                dm: '',
                location: '',
                hireType: '', 
                middleName: '',
                firstLast: '',
                secondLast: '',
                address: '',
                email: '',
                phone: '',
                phone2: '',
                ssn: '',
                dob: '',
                sex: '',
                firstDay: '',
                numDays: '',
                wage: '',
                positions: '',
                language: '',
                stores: ['Please select Manager'],
            }
            this.handleChange = this.handleChange.bind(this);
            this.onSubmit = this.onSubmit.bind(this);
            this.ssnHide = this.ssnHide.bind(this);
    }
    ssnHide() {
        this.setState({
            isHidden: (!this.state.isHidden)
        })
    }

    handleChange = (e) => {
        const {name, value} = e.target;
        if (name === "dm") {
            this.setState({
                dm: value
            }, () => {
            fetch(`http://portal.cbmportal.com:5000/api/newhire/stores/${this.state.dm}`)
            .then(res => res.json())
            .then(data => this.setState({ stores: data }))
            })
            
        }
        this.setState({
            [name]: value
        })
        
    }

    onSubmit = (e) => {
        e.preventDefault();
            
            const file1 = document.getElementById('i91').files[0];
            const file2 = document.getElementById('i92').files[0];
            const file3 = document.getElementById('idbadge').files[0];
            const formData = new FormData();
            formData.append('file1', file1);
            formData.append('file2', file2);
            formData.append('file3', file3);
            for (let key in this.state) {
                if (key !== "stores" || key !== "isHidden") {
                    formData.append(key, this.state[key])
                }
            }
            fetch('http://portal.cbmportal.com:5000/api/newhire',
                {
                    method: 'POST',
                    body: formData
                })
            .then (res => res.json())
            .then( data => {
                if (data.message) this.props.history.push('/success');
            })
            .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div className="container">
                <h1 className="mainheading">&nbsp;&nbsp;&nbsp;&nbsp;<span>New Hire Form </span></h1><br />
                    <form className="mainForm" onSubmit={this.onSubmit}>
                        <div className="wrapper1">
                            <div id="radio">
                            <label htmlFor="newhire" className="hiretype" >New Hire:</label>
                            <input type="radio" className="radiohire" name="hireType" id="newhire" value="newhire" title="Please enter the required information" required onChange={this.handleChange}/>
                            <label htmlFor="rehire" className="hiretype">Rehire:</label>
                            <input type="radio" className="radiohire" name="hireType" id="rehire" value="rehire"   title="Please enter the required information" required onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br />
                        <div className="wrapper1">
                            <div class="content">
                            <label htmlFor="firstName">First Name:</label><br />
                            <input type="text" id="firstName" name="firstName"   title="Please enter the required information" required onChange={this.handleChange}/>
                            </div>
                            <div class="content">
                            <label htmlFor="middleName">Middle Name:</label>
                            <input type="text" id="middleName" name="middleName"   title="Please enter the required information" required onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                            <label htmlFor="firstLastName">First Last Name:</label>
                            <input type="text" id="firstLastName" name="firstLast"   title="Please enter the required information" required onChange={this.handleChange}/> 
                            </div>
                            <div class="content">
                            <label htmlFor="secondLastName">Second Last Name:</label>
                            <input type="text" id="secondLastName" name="secondLast"   title="Please enter the required information" required onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                            <label htmlFor="address" id="address">Address:</label><br />
                            <textarea name="address" id="address" title="Please enter the required information" required onChange={this.handleChange}></textarea> 
                            </div>
                            <div class="content">
                            <label htmlFor="email">Email:</label><br />
                            <input type="email" id="email" name="email" title="Please enter an email in the format <user@domain.com>" required onChange={this.handleChange}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                            <label htmlFor="phone">Phone: </label><br />
                            <input type="tel" id="phone" name="phone"  required minlength="1" maxLength="12" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Enter in format ###-###-####" onChange={this.handleChange}/>
                            </div>
                            <div class="content">
                            <label htmlFor="phone2">Alt phone:</label><br />
                            <input type="tel" id="phone2" name="phone2" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" title="Enter in format ###-###-####" onChange={this.handleChange}/> 
                            </div>
                        </div>
                        <br />
                        <div class="wrapper1">
                            <div id="ssnInfo">
                                <label htmlFor="ssn">SSN:</label>
                                <br />
                                <input type={(this.state.isHidden) ? "password":"text"} id="ssn" name="ssn"  required minlength="1" maxLength="11" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}" title="Enter in format ###-##-####"  onChange={this.handleChange}/>
                                <i className="far fa-eye" onClick={this.ssnHide}></i>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                            <label htmlFor="dob">DOB:</label><br />
                            <input type="date" id="dob" name="dob" className="dob"  title="Please enter the required information" required onChange={this.handleChange} />
                            </div>
                            <div class="content">
                                <label htmlFor="sex">Gender</label><br />
                                <select id="sex" name="sex"   title="Please enter the required information" required onChange={this.handleChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unknown">Identifies as another gender</option>
                                </select>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                                <label htmlFor="firstday">First Day Worked:</label>
                                <input type="date" id="firstday"   title="Please enter the required information" required name="firstDay" className="firstday" onChange={this.handleChange}/>
                            </div>
                            <div class="content">
                                <label htmlFor="numDays"># Work Days</label>
                                <input type="number" id="numDays"   title="Please enter the required information" required maxLength="2" name="numDays" onChange={this.handleChange}/> 
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                                <label htmlFor="store">Store #/Name:</label>
                                <select name="location" id="storeList"   title="Please select an option" required onChange={this.handleChange}>
                                    <option key="start" value="">Select Starting Point</option>
                                    <option key="home" value="Home">Home</option>
                                    <Stores stores={this.state.stores} />
                                </select>
                            </div>
                            <div class="content">
                                <label htmlFor="dm">DM:</label><br />
                                <DM handleChange={this.handleChange} />
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div class="content">
                                <label htmlFor="wage">Pay rate /hr:</label>
                                <input type="number" step="any" id="wage" name="wage"  title="Please enter the required information"  required minlength="1" maxLength="5" onChange={this.handleChange} />
                            </div>
                            <div class="content">
                                <label htmlFor="positions">Positions:</label><br />
                                <select id="positions" name="positions"  title="Please select an option" required  onChange={this.handleChange}>
                                    <option value="lead">Site Lead</option>
                                    <option value="floortech">Floor Tech</option>
                                    <option value="floater">Floater</option>
                                    <option value="substitute">Substitute</option>
                                    <option value="ps">Project Specialist</option>
                                </select>
                            </div>
                        </div>
                        <br /><br />
                    <div className="wrapper1">
                            <div id="hours">
                                <div id="prefLanguage">
                                    <label >How many hours:</label>
                                </div>
                                <label htmlFor="30more" id="hoursLabel">More than 30hrs</label>
                                &nbsp;<input type="radio" className="daysWorked" name="hours" id="30more" value="More than 30 hours"  title="Please enter the required information"  required onChange={this.handleChange}/>
                                <br />
                                <label htmlFor="30less" id="hoursLabel">Less than 30hrs</label>
                                &nbsp;<input type="radio" className="daysWorked" name="hours" id="30less" value="Under 30 hours"  title="Please enter the required information"  required onChange={this.handleChange}/> 

                            </div>
                        <div>
                            <div id="prefLanguage">
                                <label >Preferred Language</label>
                            </div>
                            <div>
                                <label htmlFor="english" >English</label>
                        
                                &nbsp;<input type="radio" className="radiohire" name="language" id="english" value="English"  title="Please select a language" required onChange={this.handleChange}/><br />
                       
                                <label htmlFor="spanish" >Spanish</label> 
                                &nbsp;<input type="radio" className="radiohire" name="language" id="spanish" value="Spanish"  title="Please select a language" required onChange={this.handleChange}/>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <label htmlFor="i91">Take Picture of section 1 of I9</label>
                        <input type="file" id="i91" name="i91" title="Please select a file" required />
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <label htmlFor="numdays">Take Picture of section 2 of I9</label>
                        <input type="file" id="i92" name="i92" title="Please select a file"  required />
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <label htmlFor="idbadge">Upload a picture for ID Badge</label>
                        <input type="file" id="idbadge" name="idbadge"  title="Please select a file" required />
                    </div>
                    <br /><br />
                    <input type="submit" className="btn" />
                </form>
            </div>
        );
    }
}

export default NewHire;