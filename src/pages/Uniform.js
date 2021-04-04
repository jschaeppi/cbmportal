import React, { useState, useEffect, useContext, useRef } from 'react';
import '../css/uniform.css';
import SignatureCanvas from 'react-signature-canvas'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import 'moment-timezone';

const Uniform = () => {
    
    
    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { loginStatus, isAuthenticated, loading, user, formSubmit, success} = cbmContext;
    let body = '';
    const employeePad = useRef({});
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        // eslint-disable-next-line
    }, [])
    const [data, setData] = useState([{
        employeeNum: '',
        firstName: '',
        lastName: '',
        address: '', 
        apt: '',
        city: '',
        state: '',
        zip: '',
        cost: 0, 
        quantity: 0,
        size:'',
        date: '',
    }])
    const handleChange = (e) => {
        const { name, value } = e.target;
        const list = [...data];
        list[0][name] = value;
        setData(list);
    }

    const cityList = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        // getCities(value);
        const list = [...data];
        list[0][name] = value;
        setData(list);
    }

    const getCost = (e) => {
        const { value } = e.target

        const list = [...data];
        const cost = (Number(value)*6);
        list[0].cost = cost;
        list[0].quantity = value;
        setData(list);
    }

    const clearPad = (e) => {
        e.preventDefault();
        employeePad.current.clear();
    }

    const onSubmit = (e) => {
        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        e.preventDefault();
        if (employeePad.current.isEmpty()) {
            alert('Please provide a signature');
        } else {
        const list = [...data];
        list[0][date] = `${month}/${date}/${year}`
        setData(list);

            body = JSON.stringify({
                employeeNum: data[0].employeeNum,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                address: data[0].address, 
                apt: data[0].apt,
                city: data[0].city,
                state: data[0].state,
                zip: data[0].zip,
                cost: data[0].cost, 
                quantity: data[0].quantity,
                size:data[0].size,
                date: data[0].date,
                sig: employeePad.current.getTrimmedCanvas().toDataURL('image/png'),
                dm: user,
            })
            formSubmit(body, 'uniform');
            if (success && !loading) {
                console.log('I\'m redirecting');
                console.log(success);
                history.push('/success');
            } else {
                history.push('/')
            }
    }
}

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        return (
            <div className ="container">
                <h1 className="mainHeading"><span>Uniform Order </span></h1><br />
                    <form onSubmit={e => onSubmit(e)} className="mainForm">
                        <div className="wrapper1">
                            <label htmlFor="employeenum">Employee #:</label><br />
                            <input type="number" className="employeeNum" id="employeeNum" name="employeeNum" maxLength="6" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="uniformFirstName">
                                <label htmlFor="firstName">Employee First Name:</label>
                                <input type="text" id="firstName" name="firstName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                            <div id="uniformFirstLast">
                                <label htmlFor="firstLastName">Employee Last Name:</label>
                                <input type="text" id="firstLastName" name="lastName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                         </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="addressDiv">
                                 <label htmlFor="address" id="address">Address:</label><br />
                                <textarea name="address" id="address" required title="Please enter the required information" onChange={e => handleChange(e)}></textarea>
                            </div>
                            <div id="addressDiv">  
                                <label htmlFor="apt">Apt # </label><br />
                                <input type="text" id="apt" name="apt" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1" id="geo">
                            <div id="stateDiv">
                                <label htmlFor="state">State:</label><br />
                                <input type="text" id="state" name="state" list="states" placeholder="Select State" onChange={e => handleChange(e)} />
                                        {/* <datalist id="states">
                                            {usstates.map((state, i) => {
                                                return <option key={i}>{state.state_name} </option>
                                            })}
                                        </datalist> */}
                             </div>
                            <div id="cityDiv">
                                <label htmlFor="city">City:</label><br />
                                <input type="text" id="city" name="city" list="cities" placeholder="Select City" onChange={e => cityList(e)} />
                                    {/* <datalist id="cities">
                                        {(cities !== '') ? (cities.map((city,i) => {
                                            return <option key={i}>{city.city_name}</option>
                                        })): <option>No Cities Found</option>}
                                    </datalist> */}
                        
                            </div>
                            <div id="zipDiv">
                            <label htmlFor="zip">Zip:</label><br />
                            <input type="number" id="zip" name="zip" required title="Please enter the required information" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                         <br /><br />
                        <div className="wrapper1">
                            <div id="quantity">
                            <label htmlFor="quantity">Enter Shirt Quantity:</label>
                            <input type="number" name="quantity" required title="Please enter the required information" onChange={e => getCost(e)} />
                        
                            </div>
                            <div id="quantity">
                            <label htmlFor="shirtCost">Total to be Deducted from paycheck:</label>
                        
                            <input type="number" name="quantity" placeholder={data[0].cost} value={data[0].cost} readOnly/>
                            </div>
                        </div>
                         <br /><br />
                         <div id="sizes">
                            <label>Uniform Size:</label><br />
                            <input type="radio" id="small" name="size" value="small" required title="Please enter the required information"onChange={e => handleChange(e)}/>
                            <label htmlFor="small" id="uniformSize">Small</label>
                            <input type="radio" id="medium" name="size" value="medium" required title="Please enter the required information"onChange={e => handleChange(e)}/>
                            <label htmlFor="medium" >Medium</label>
                            <input type="radio" id="large" name="size"  value="large" required title="Please enter the required information"onChange={e => handleChange(e)}/>
                            <label htmlFor="large" id="uniformSize">Large</label>
                            <input type="radio" id="x-large" name="size" value="x-large" required title="Please enter the required information"onChange={e => handleChange(e)}/>
                            <label htmlFor="x-large" id="uniformSize">X-Large</label><br />
                         </div>
                         <br />
                        <div className="wrapper1">
                            <div id="uniformSig">
                                <label >Signature:</label><br />
                                <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(255, 255, 255, 1)', height: 100, className: 'sigPad'}} ref = {employeePad } />
                                <button id="sigClear" onClick={e => clearPad(e)} type="button ">Clear</button>
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

export default Uniform
