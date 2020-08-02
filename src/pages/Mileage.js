import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import '../css/mileage.css';
function Mileage() {


    const history = useHistory();
    const [storeList, setStoreList] = useState([]);
    const [mileage, addMileage] = useState([
        {
            mileageDate: '',
            starting: '',
            destination: '',
            employeeNum: '',
            employeeName: '',
            dm: '',
            notes: '',
        }
    ]);
    
    const dm = mileage[0].dm;
    useEffect(() => {
        if (dm === '') {
            fetch(`http://portal.cbmportal.com:5000/api/mileage/stores`)
            .then(res => res.json())
            .then(data => setStoreList(data) ) 
        } else {
        fetch(`http://portal.cbmportal.com:5000/api/mileage/stores/${dm}`)
        .then(res => res.json())
        .then(data => setStoreList(data) ) 
        }
    }, [dm])

    const handleInputChange = (e, index) => {
        const incIndex = index + 1;
        if (e.target.id === `Mileage Date ${incIndex}`) {
            const list = [...mileage];
            list[index].mileageDate = e.target.value;
            addMileage(list); 
        } else if (e.target.id === `Starting Point ${incIndex}`) {
            const list = [...mileage];
            list[index].starting = e.target.value;
            addMileage(list); 
        } else if (e.target.id === `Destination Point ${incIndex}`) {
            const list = [...mileage];
            list[index].destination = e.target.value;
            addMileage(list); 
        } else if (e.target.id === 'dm') {
            const list = [...mileage];
            list[0].dm = e.target.value;
            addMileage(list); 
        } else if (e.target.id === 'employeeNum') {
            const list = [...mileage];
            list[0].employeeNum = e.target.value;
            addMileage(list); 
        } else if (e.target.id === 'employeeName') {
            const list = [...mileage];
            list[0].employeeName = e.target.value;
            addMileage(list); 
        } else if (e.target.id === 'mileageNotes') {
            const list = [...mileage];
            list[0].notes = e.target.value;
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
                dm: mileage[0].dm, 
                mileageDate: mileage[0].mileageDate,
                starting: mileage[0].starting,
                destination: mileage[0].destination,
                employeeName: mileage[0].employeeName, 
                employeeNum: mileage[0].employeeNum,
                comments: mileage[0].notes
            })
        } else {
            mileage.map((item, i) => {
                return rows.push({
                    dm: mileage[0].dm, 
                    mileageDate: item.mileageDate,
                    starting: item.starting,
                    destination: item.destination, 
                    employeeName: mileage[0].employeeName, 
                    employeeNum: mileage[0].employeeNum,
                    comments: mileage[0].notes
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
                                <label htmlFor="dm">DM:</label><br />
                                <select id="dm" name="dm" required title="Please enter the required information" onChange={e => handleInputChange(e)}>
                                    <option value="">Select DM</option>
                                    <option value="Daniel De la Paz">Daniel De la Paz</option>
                                    <option value="Lino Huerta">Lino Huerta</option>
                                </select>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="mileageNotes">
                                <label>Comments:</label> <br />
                                <textarea required title="Please enter the required information" onChange={e => handleInputChange(e)}></textarea>
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
                                                <select key={startingPoint} id={startingPoint} required title="Please select an option" onChange={e => handleInputChange(e, index)}>{storeList.map((store, i) => {
                                                                                                                                                return (
                                                                                                                                                    <option key={i}>{store.store}</option>
                                                                                                                                                )}
                                                                                                                                                        )}</select>
                                                <select key={destinationPoint} id={destinationPoint} required title="Please select an option" onChange={e => handleInputChange(e, index)}>{storeList.map((store, i) => {
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