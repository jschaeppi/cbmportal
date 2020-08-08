import React, { useState, useEffect, useContext } from 'react';
import '../css/New_Hire.css';
import Stores from '../Components/Stores';
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
const NewHire = () =>  {

    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { loginStatus, isAuthenticated, loading, getStores, stores} = cbmContext;
    const { userFirst, userLast, district} = cbmContext.user;
    
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        getStores(district);
        // eslint-disable-next-line
    }, [district])

    const [hidden, setHidden] = useState(true);
    const [data, setData] = useState([{
        firstName: '',
        dm: `${userFirst} ${userLast}`,
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
    }])

    const formatPhone = (e) => {
        const { name, value } = e.target;
        const list = [...data];
        let phoneForm = value.replace(/\D/g,'').substring(0,15);
        let first, middle, end = '';
        first = phoneForm.substring(0,3)
        middle = phoneForm.substring(3,6);
        end = phoneForm.substring(6,11);
        list[0][name] = `${first} - ${middle} - ${end}`;
        setData(list);
    }

    const formatSSN = (e) => {
        const { name, value } = e.target;
        const list = [...data];
        let ssnForm = value.replace(/\D/g,'').substring(0,10);
        let first, middle, end = '';
        first = ssnForm.substring(0,3)
        middle = ssnForm.substring(3,5);
        end = ssnForm.substring(5, 10);
        list[0][name] = `${first}-${middle}-${end}`;
        setData(list);
    }

    const ssnHide = (e) => {
        setHidden(!hidden);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        const list = [...data];
        list[0][name] = value
        setData(list);
        
    }

    const onSubmit = (e) => {
        e.preventDefault();   
        const file1 = document.getElementById('i91_file').files[0];
        const file2 = document.getElementById('i92_file').files[0];
        const file3 = document.getElementById('idbadge_file').files[0];
        const formData = new FormData();
        formData.append('file1', file1);
        formData.append('file2', file2);
        formData.append('file3', file3);
        for (let key in data[0]) {
            formData.append(key, data[0][key])
            console.log(key, data[0][key]);
        }
        console.log(formData.entries());
        fetch('http://portal.cbmportal.com:5000/api/newhire',
            {
                method: 'POST',
                body: formData
            })
        .then (res => res.json())
        .then( data => {
            if (data.message) history.push('/success');
        })
        .catch(err => console.log(err))
    }
    
        return (
            <div className="container">
                <h1 className="mainheading">&nbsp;&nbsp;&nbsp;&nbsp;<span>New Hire Form </span></h1><br />
                    <form className="mainForm" onSubmit={e => onSubmit(e)}>
                        <div className="wrapper1">
                            <div id="radio">
                            <label htmlFor="newhire" className="hiretype" >New Hire:</label>
                            <input type="radio" className="radiohire" name="hireType" id="newhire" value="newhire" title="Please enter the required information" required onChange={e => handleChange(e)}/>
                            <label htmlFor="rehire" className="hiretype">Rehire:</label>
                            <input type="radio" className="radiohire" name="hireType" id="rehire" value="rehire"   title="Please enter the required information" required onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br />
                        <div className="wrapper1">
                            <div className="content">
                            <label htmlFor="firstName">First Name:</label><br />
                            <input type="text" id="firstName" name="firstName"   title="Please enter the required information" required onChange={e => handleChange(e)}/>
                            </div>
                            <div className="content">
                            <label htmlFor="middleName">Middle Name:</label>
                            <input type="text" id="middleName" name="middleName"   title="Please enter the required information" required onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                            <label htmlFor="firstLastName">First Last Name:</label>
                            <input type="text" id="firstLastName" name="firstLast"   title="Please enter the required information" required onChange={e => handleChange(e)}/> 
                            </div>
                            <div className="content">
                            <label htmlFor="secondLastName">Second Last Name:</label>
                            <input type="text" id="secondLastName" name="secondLast"   title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                            <label htmlFor="address" id="address">Address:</label><br />
                            <textarea name="address" id="address" title="Please enter the required information" required onChange={e => handleChange(e)}></textarea> 
                            </div>
                            <div className="content">
                            <label htmlFor="email">Email:</label><br />
                            <input type="email" id="email" name="email" title="Please enter an email in the format <user@domain.com>" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                            <label htmlFor="phone">Phone: </label><br />
                            <input type="tel" id="phone" name="phone"  value={data[0].phone} required minLength="1" maxLength="16" onChange={e => formatPhone(e)}/>
                            </div>
                            <div className="content">
                            <label htmlFor="phone2">Alt phone:</label><br />
                            <input type="tel" id="phone2" name="phone2" value={data[0].phone2} minLength="1" maxLength="16" onChange={e => formatPhone(e)}/> 
                            </div>
                        </div>
                        <br />
                        <div className="wrapper1">
                            <div id="ssnInfo">
                                <label htmlFor="ssn">SSN:</label>
                                <br />
                                <input type={(hidden) ? "password":"text"} id="ssn" name="ssn" value={data[0].ssn} required minLength="1" maxLength="11"  onChange={e => formatSSN(e)}/>
                                <i className="far fa-eye" onClick={e => ssnHide(e)}></i>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                            <label htmlFor="dob">DOB:</label><br />
                            <input type="date" id="dob" name="dob" className="dob"  title="Please enter the required information" required onChange={e => handleChange(e)} />
                            </div>
                            <div className="content">
                                <label htmlFor="sex">Gender</label><br />
                                <select id="sex" name="sex"   title="Please enter the required information" required onChange={e => handleChange(e)}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unknown">Identifies as another gender</option>
                                </select>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                                <label htmlFor="firstday">First Day Worked:</label>
                                <input type="date" id="firstday"   title="Please enter the required information" required name="firstDay" className="firstday" onChange={e => handleChange(e)}/>
                            </div>
                            <div className="content">
                                <label htmlFor="numDays"># Work Days</label>
                                <input type="number" id="numDays"   title="Please enter the required information" required maxLength="2" name="numDays" onChange={e => handleChange(e)}/> 
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                                <label htmlFor="store">Store #/Name:</label>
                                <select name="location" id="storeList"   title="Please select an option" required onChange={e => handleChange(e)}>
                                    <option key="start" value="">Select Starting Point</option>
                                    <option key="home" value="Home">Home</option>
                                    <Stores stores={stores} />
                                </select>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div className="content">
                                <label htmlFor="wage">Pay rate /hr:</label>
                                <input type="number" step="any" id="wage" name="wage"  title="Please enter the required information"  required minLength="1" maxLength="5" onChange={e => handleChange(e)} />
                            </div>
                            <div className="content">
                                <label htmlFor="positions">Positions:</label><br />
                                <select id="positions" name="positions"  title="Please select an option" required  onChange={e => handleChange(e)}>
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
                                &nbsp;<input type="radio" className="daysWorked" name="hours" id="30more" value="More than 30 hours"  title="Please enter the required information"  required onChange={e => handleChange(e)}/>
                                <br />
                                <label htmlFor="30less" id="hoursLabel">Less than 30hrs</label>
                                &nbsp;<input type="radio" className="daysWorked" name="hours" id="30less" value="Under 30 hours"  title="Please enter the required information"  required onChange={e => handleChange(e)}/> 

                            </div>
                        <div>
                            <div id="prefLanguage">
                                <label >Preferred Language</label>
                            </div>
                            <div>
                                <label htmlFor="english" >English</label>
                        
                                &nbsp;<input type="radio" className="radiohire" name="language" id="english" value="English"  title="Please select a language" required onChange={e => handleChange(e)}/><br />
                       
                                <label htmlFor="spanish" >Spanish</label> 
                                &nbsp;<input type="radio" className="radiohire" name="language" id="spanish" value="Spanish"  title="Please select a language" required onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div id="i91">
                        <label htmlFor="i91">Take Picture of section 1 of I9</label>
                        <input type="file" id="i91_file" name="i91" title="Please select a file" accept="image/x-png, image/jpeg" required />
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                    <div id="i92">
                        <label htmlFor="numdays">Take Picture of section 2 of I9</label>
                        <input type="file" id="i92_file" name="i92" title="Please select a file" accept="image/x-png, image/jpeg" required />
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                    <div id="idbadge">
                        <label htmlFor="idbadge">Upload a picture for ID Badge</label>
                        <input type="file" id="idbadge_file" name="idbadge"  title="Please select a file" accept="image/x-png, image/jpeg" required />
                        </div>
                    </div>
                    <br /><br />
                    <input type="submit" className="btn" />
                </form>
            </div>
        );
}

export default NewHire;