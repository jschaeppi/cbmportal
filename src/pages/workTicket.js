import React, { useState, useEffect, useContext } from 'react';
import '../css/workTicket.css';
import { useHistory } from 'react-router-dom';
import Stores from '../Components/Stores';
import CbmContext from '../context/cbm/cbmContext';
const WorkTicket = () => {

    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { loginStatus, isAuthenticated, loading, getStores, stores, getCities, cities, usstates } = cbmContext;
    const { userFirst, userLast, district } = cbmContext.user;

    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        getStores(district);
        // eslint-disable-next-line
    }, [district])

        const [data, setData] = useState([{
            employeeName: '',
            employeeNum: '',
            dm: `${userFirst} ${userLast}`,
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
        }])

        const cityList = (e) => {
            e.preventDefault();
            const { name, value } = e.target;
            getCities(value);
            const list = [...data];
            list[0][name] = value;
            setData(list);
        }

        const handleChange = (e) => {
            const { name, value } = e.target;
            const list = [...data];
            list[0][name] = value;
            setData(list);
        }

        const onSubmit = (e) => {
            e.preventDefault();
            
            fetch('http://portal.cbmportal.com:5000/api/WT',
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    employeeName: data[0].employeeName,
                    employeeNum: data[0].employeeNum,
                    dm: data[0].dm,
                    location: data[0].location,
                    city: data[0].city, 
                    state: data[0].state,
                    workType: data[0].workType, 
                    Billable: data[0].Billable,
                    notes: data[0].notes,
                    equipment: data[0].equipment,
                    currentLocation: data[0].currentLocation,
                    orderSubmitted: data[0].orderSubmitted,
                    orderDate: data[0].orderDate,
                    orderNumber: data[0].orderNumber,
                    startDate: data[0].startDate,
                    endDate: data[0].endDate,
                })
            })
            .then (res => res.json())
            .then( data => {
                if (data.message) history.push('/success');
            })
            .catch(err => console.log(err))
        }

            return (
                <div className="container">
                    <h1 className="mainHeading"><span>Work Ticket Request</span></h1><br />
                        <form onSubmit={e => onSubmit(e)} className="mainForm">
                            <div className="wrapper1">
                                <div>
                                    <label htmlFor="employeename"> Employee Name:</label>
                                    <input type="text" id="employeename" name="employeeName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                                </div>
                                <div>
                                    <label htmlFor="employeenum">Employee #:</label>
                                    <input type="text" id="employeenum" name="employeeNum" maxLength="6" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                                </div>
                            </div>
                        <br />
                            <div className="wrapper1">
                                <div>
                                    <label >Store Number:</label>
                                    <select name="location" id="storeList" required title="Please select an option" onChange={e => handleChange(e)}>
                                        <Stores stores={stores} />
                                    </select>
                                 </div>
                            </div>
                        <br /><br />
                            <div className="wrapper1">
                                 <div>
                                    <label htmlFor="city">City: <span style={{fontSize: '14px', fontWeight: 'normal'}}>(Please select state for list of cities)</span></label><br />
                                    <select id="city" name="city" onChange={e => handleChange(e)}>
                                    <option>Select City</option>
                                   {(cities !== '') ? (cities.map((city,i) => {
                                       return <option key={i}>{city.city_name}</option>
                                   })):<option>No cities Found</option>}
                                </select>
                                </div>
                                <div>
                                    <label htmlFor="state"> State:</label><br />
                                    <select id="state" name="state" onChange={e => cityList(e)}>
                                    <option>Select State</option>
                                    {usstates.map((state, i) => {
                                        return <option key={i}>{state.state_name}</option>
                                    })}
                                </select>
                                </div>
                            </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="workType">Type of Work:</label><br />
                                <select onChange={e => handleChange(e)} required title="Please select an option" id="workType" name="workType">
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
                                <select required title="Please select an option" onChange={e => handleChange(e)} id="workType" name="Billable">
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
                                <textarea id="notes" name="notes" onChange={e => handleChange(e)}></textarea>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="equipmentMoved">
                                <label htmlFor="equipment">What equipment needs to be moved:</label><br />
                                <textarea id="notes" name="equipment" required title="Please enter the required information" onChange={e => handleChange(e)}></textarea>
                            </div>
                        </div>
                        <br /><br />
                    
                        <div className="wrapper1">
                            <label htmlFor="currentLocation">Curent location:</label><br />
                            <select name="currentLocation" id="storeList" required title="Please select an option" onChange={e => handleChange(e)}>
                                <Stores stores={stores} />
                            </select>
                        </div>
                        <div className="wrapper1" id="orderSubmit">
                            <div id="supplyOrderSubmit">
                                <label >Supply Order Submitted:</label><br />
                                <label htmlFor="orderSubmitted">Yes</label>
                                <input type="radio" name="orderSubmitted" value="yes" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                                <label htmlFor="orderSubmitted">No</label>
                                <input type="radio" name="orderSubmitted" value="no" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            </div>
                         </div>
                         <br /><br />
                        <div className="wrapper1">
                            <div id="supplyOrder">
                                <label>Supply Order Date:</label><br />
                                <input type="date" id="orderDate" name="orderDate" required title="Please enter the required information" onChange={e => handleChange(e)}></input>  
                            </div>
                            <div id="supplyOrder">
                                <label htmlFor="orderNumber">Supply Order Number:</label><br />
                                <input type="text" id="orderNumber" name="orderNumber" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label>Project Start Date:</label>
                                <input type="date" id="startDate" name="startDate" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                             </div>
                            <div>
                                <label>Project End Date:</label>
                                <input type="date" id="endDate" name="endDate" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            </div>
                        </div>
                        <br />
                            <input type="submit" className="btn" />
                    </form>
                </div>
            )
    }
    
    export default WorkTicket
    