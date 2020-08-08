import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import '../css/mileage.css';
import CbmContext from '../context/cbm/cbmContext';

function Mileage() {

    const cbmContext = useContext(CbmContext);
    const { loginStatus, loading, isAuthenticated, getStores, stores } = cbmContext;
    const { district, userFirst, userLast } = cbmContext.user;
    const history = useHistory();
    const [mileage, addMileage] = useState([
        {
            mileageDate: '',
            starting: '',
            destination: '',
            employeeNum: '',
            employeeName: '',
            dm: '',
            comments: '',
        }
    ]);
    
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        getStores(district);
        // eslint-disable-next-line
    }, [district])

    const handleInputChange = (e, index) => {
        const {id, value} = e.target;
        const list = [...mileage];
        const incIndex = index + 1;
        if (id === `Mileage Date ${incIndex}`) {
            list[index].mileageDate = value;
            addMileage(list); 
        } else if (id === `Starting Point ${incIndex}`) {
            list[index].starting = value;
            addMileage(list); 
        } else if (id === `Destination Point ${incIndex}`) {
            list[index].destination = value;
            addMileage(list); 
        } else {
            list[0][id] = value
            addMileage(list);
        }
    }
    
    const handleMileage = (e) => {
        e.preventDefault();
        const list = [...mileage];
        list.push({
            mileageDate: '',
            starting: '',
            destination: '',
        })
        addMileage(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...mileage];
        list.splice(index,1)
        addMileage(list)
    }

    const onSubmit = e => {
        e.preventDefault();
        let rows = [];
        if (mileage.length === 1) {
            rows.push({
                dm: `${userFirst} ${userLast}`, 
                mileageDate: mileage[0].mileageDate,
                starting: mileage[0].starting,
                destination: mileage[0].destination,
                employeeName: mileage[0].employeeName, 
                employeeNum: mileage[0].employeeNum,
                comments: mileage[0].comments
            })
        } else {
            mileage.map((item, i) => {
                return rows.push({
                    mileageDate: item.mileageDate,
                    starting: item.starting,
                    destination: item.destination, 
                    dm: `${userFirst} ${userLast}`, 
                    employeeName: mileage[0].employeeName, 
                    employeeNum: mileage[0].employeeNum,
                    comments: mileage[0].comments
                });
            })
        }
    // On submit of the form, send a POST request with the data to the server.
        fetch('http://portal.cbmportal.com:5000/api/mileage', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(rows),
            })
            .then(res => res.json())
            .then(data => {
            if (data.message) history.push('/success');
            }).catch((err) => {
            console.log(err);
        }) 
        }
        
        return (
            <div className="container">
                <h1 className="mainHeading">&nbsp;&nbsp;<span>Mileage</span></h1><br />
                    <form onSubmit={e => onSubmit(e)} className="mainForm">
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="employeename"> Employee Name:</label>
                                <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                            </div>
                            <div id="mileageEmployeeNum">
                                <label htmlFor="employeenum">Employee #:</label>
                                <input type="number" id="employeeNum" name="employeNum" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="mileageNotes">
                                <label>Comments:</label> <br />
                                <textarea required title="Please enter the required information" id="comments" onChange={e => handleInputChange(e)}></textarea>
                            </div>
                        </div>
                        <br /><br />
                            { mileage.map((row, index) => { 
                                    const incIndex = index + 1;
                                    const mileageDate =`Mileage Date ${incIndex}`;
                                    const startingPoint = `Starting Point ${incIndex}`;
                                    const destinationPoint = `Destination Point ${incIndex}`;
                                    return (
                                        <div key={index} id="mileageEntries">
                                            <div className="wrapper1" id="entry">
                                                <label htmlFor={mileageDate}>{mileageDate}</label>
                                                <label htmlFor={startingPoint}>{startingPoint}</label>
                                                <label htmlFor={destinationPoint}>{destinationPoint}</label>
                                                <input key={mileageDate} type="date" id={mileageDate}  required title="Please enter the required information" onChange={e => handleInputChange(e, index)} ></input>
                                                <select key={startingPoint} id={startingPoint} required title="Please select an option" onChange={e => handleInputChange(e, index)}>{stores.map((store, i) => {
                                                                                                                                                return (
                                                                                                                                                    <option key={i}>{store.store}</option>
                                                                                                                                                )}
                                                                                                                                                        )}</select>
                                                <select key={destinationPoint} id={destinationPoint} required title="Please select an option" onChange={e => handleInputChange(e, index)}>{stores.map((store, i) => {
                                                                                                                                                return (
                                                                                                                                                    <option key={i}>{store.store}</option>
                                                                                                                                                )}
                                                                                                                                                        )}</select>
                                            </div>
                                            {mileage.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="mileageRemoveButton">Remove</button>}
                                            {mileage.length - 1 === index && <button onClick={handleMileage} id="mileageAddButton">Add Mileage</button>}
                                        </div>
                                    );
                                })}
                                <br /><br />
                                <input type="submit" className="btn" />
                    </form>
                </div>
        )
}

export default Mileage