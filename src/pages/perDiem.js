import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/perDiem.css';

function PerDiem() {

    const history = useHistory();

    const [storeList, setStoreList] = useState([])
    const [perDiem, addPerDiem] = useState([
        {
            mileageDate: '',
            arrivalStore: '',
            destinationStore: '',
            rtow: '',
            employeeNum: '',
            employeeName: '',
            city: '', 
            state: '', 
            location: '', 
            firstNight: '', 
            lastNight: '',
            arrivalDate: '', 
            departureDate:'',
            comments: '',

        }
    ]);

    useEffect(() => {
        fetch(`http://portal.cbmportal.com:5000/api/perDiem/stores`)
        .then(res => res.json())
        .then(data => setStoreList(data) ) 
    }, [])

    const handleInputChange = (e, index) => {
        const incIndex = index + 1;
        if (e.target.id === `Mileage Date ${incIndex}`) {
        const list = [...perDiem];
        list[index].mileageDate = e.target.value;
        addPerDiem(list); 
        } else if (e.target.id === 'Starting Point') {
            const list = [...perDiem];
            list[index].arrivalStore = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'Destination Point') {
            const list = [...perDiem];
            list[index].destinationStore = e.target.value;
            addPerDiem(list); 
        }else if (e.target.id === `rt${index+1}`) {
            const list = [...perDiem];
            list[index].rtow = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === `ow${index+1}`) {
            const list = [...perDiem];
            list[index].rtow = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'employeeName') {
            const list = [...perDiem];
            list[0].employeeName = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'employeeNum') {
            const list = [...perDiem];
            list[0].employeeNum = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'city') {
            const list = [...perDiem];
            list[0].city = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'state') {
            const list = [...perDiem];
            list[0].state = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'firstNight') {
            const list = [...perDiem];
            list[0].firstNight = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'lastNight') {
            const list = [...perDiem];
            list[0].lastNight = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'arrivalDate') {
            const list = [...perDiem];
            list[0].arrivalDate = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'departureDate') {
            const list = [...perDiem];
            list[0].departureDate = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'location') {
            const list = [...perDiem];
            list[0].location = e.target.value;
            addPerDiem(list); 
        } else if (e.target.id === 'comments') {
            const list = [...perDiem];
            list[0].comments = e.target.value;
            addPerDiem(list); 
        }
    }

    const handleAddPerDiem = (e) => {
        e.preventDefault();
        const list = [...perDiem];
        list.push({
            mileageDate: '',
            arrivalStore: '',
            destinationStore: '',
            rtow: ''
        })
        addPerDiem(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...perDiem];
        list.splice(index,1)
        addPerDiem(list)
    }

    const onSubmit = e => {
        e.preventDefault();
        let rows = [];
        if (perDiem.length === 1) {
            rows.push({
                mileageDate: perDiem[0].mileageDate,
                arrivalStore: perDiem[0].arrivalStore,
                destinationStore: perDiem[0].destinationStore,
                rtow: perDiem[0].rtow,
                employeeNum: perDiem[0].employeeNum,
                employeeName: perDiem[0].employeeName,
                city: perDiem[0].city, 
                state: perDiem[0].state, 
                location: perDiem[0].location, 
                firstNight: perDiem[0].firstNight, 
                lastNight: perDiem[0].lastNight,
                arrivalDate: perDiem[0].arrivalDate, 
                departureDate:perDiem[0].departureDate,
                comments:perDiem[0].comments,
            })
        } else {
            perDiem.map((item, i) => {
                return rows.push({
                    mileageDate: item.mileageDate,
                    arrivalStore: item.arrivalStore,
                    destinationStore: item.destinationStore,
                    rtow: item.rtow,
                    employeeNum: perDiem[0].employeeNum,
                    employeeName: perDiem[0].employeeName,
                    city: perDiem[0].city, 
                    state: perDiem[0].state, 
                    location: perDiem[0].location, 
                    firstNight: perDiem[0].firstNight, 
                    lastNight: perDiem[0].lastNight,
                    arrivalDate: perDiem[0].arrivalDate, 
                    departureDate:perDiem[0].departureDate,
                    comments:perDiem[0].comments,
                });
            })
        }
        console.log(rows);  
    // On submit of the form, send a POST request with the data to the server.
        fetch('http://portal.cbmportal.com:5000/api/perdiem', { 
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
                <h1 className="mainHeading">&nbsp;&nbsp;<span>Per Diem</span></h1><br />
                    <form onSubmit={e => onSubmit(e)} className="mainForm">
                        <div className="wrapper1">
                            <div id="perdiemEmployeeNum">
                                <label htmlFor="employeenum">Employee #:</label><br />
                                <input type="number" id="employeeNum" name="employeeNum" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                            </div>
                            <div>
                                <label htmlFor="employeename"> Employee Name:</label><br />
                                <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <label htmlFor="store">Store:</label><br />
                            <select name="stores" id="location" required title="Please enter the required information" onChange={e => handleInputChange(e)}>
                                <option>Home</option>
                                {storeList.map((store, i)=> {
                                    return (
                                        <option key={i}>{store.store}</option>
                                     )
                                })}
                            </select>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="city">City:</label><br />
                                <input type="text" id="city" name="city" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                            </div>
                            <div>
                                <label htmlFor="state"> State:</label><br />
                                <input type="text" id="state" name="state" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="first_hotel">First hotel night needed:</label>
                                <input type="date" name="first_hotel" id="firstNight" required title="Please enter the required information" onChange={e => handleInputChange(e)}></input>
                            </div>
                            <div>
                                <label htmlFor="last_hotel">Last hotel night needed:</label>
                                <input type="date" name="last_hotel" id="lastNight" required title="Please enter the required information" onChange={e => handleInputChange(e)}></input>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="arrival">Arrival Date:</label>
                                <input type="date" name="arrival" id="arrivalDate" required title="Please enter the required information" onChange={e => handleInputChange(e)}></input>
                            </div>
                            <div>
                                <label htmlFor="departure">Departure Date:</label>
                                <input type="date" name="departure" id="departureDate" required title="Please enter the required information" onChange={e => handleInputChange(e)}></input>
                            </div>
                        </div>
                        <br /><br />
                        <div id="addPer">
                            { perDiem.map((row, index) => { 
                                const incIndex = index + 1;
                                const mileageName =`Mileage Date ${incIndex}`;
                                const startName = `Starting Point ${incIndex}`;
                                const destinationName = `Destination Point ${incIndex}`;
                                const rtowName = `Select RT/OW ${incIndex}`;
                                const destinationID = 'Destination Point';
                                const arrivalID = 'Starting Point';
                                return (
                                    <div key={index} id="mileageEntries">
                                        <div className="wrapper1" id="mileage">
                                            <label htmlFor={mileageName}>{mileageName}</label>
                                            <label htmlFor={startName}>{startName}</label>
                                            <label htmlFor={destinationName}>{destinationName}</label>
                                            <input key={mileageName} type="date" id={mileageName} name={mileageName} required title="Please enter the required information" onChange={e => handleInputChange(e, index)} ></input>
                                            <select required title="Please enter the required information" onChange={e => handleInputChange(e, index)} name="arrivalStore" id={arrivalID}>
                                                <option>Home</option>
                                                {storeList.map((store, i)=> {
                                                    return (
                                                        <option key={i}>{store.store}</option>
                                                        )
                                                    })}
                                            </select>
                                            <select required title="Please enter the required information" onChange={e => handleInputChange(e, index)} name="destinationStore" id={destinationID}>
                                                <option>Home</option>
                                                {storeList.map((store, i)=> {
                                                    return (
                                                        <option key={i}>{store.store}</option>
                                                        )
                                                    })}
                                            </select>
                                        </div>
                                     <br /><br />
                                        <div id="rtowControl">
                                            <label >{`${rtowName}:`}</label>&nbsp;&nbsp;
                                            <label htmlFor={`rt${index+1}`}>Round Trip:</label>&nbsp;
                                            <input key={`RT ${index}`} type="radio" id={`rt${index+1}`} name={rtowName} value="Round Trip" required title="Please enter the required information" onChange={e => handleInputChange(e, index)}></input>&nbsp;
                                            <label htmlFor={`ow${index+1}`}>One Way:</label>&nbsp;
                                            <input key={`OT ${index}`} type="radio" id={`ow${index+1}`} name={rtowName} value="One Way" required title="Please enter the required information" onChange={e => handleInputChange(e, index)}></input><br />
                                        </div>
                                        {perDiem.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="perdiemButton">Remove</button>}
                                        {perDiem.length - 1 === index && <button onClick={handleAddPerDiem} id="perdiemAddButton">Add Per Diem</button>}
                                    </div>
                                );
                            })}
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div id="commentsDiv">
                                <label htmlFor="comments" id="commentLabel">Reason why this pay was missed:</label>
                                <textarea name="comments" id="comments" onChange={e => handleInputChange(e)}></textarea>
                            </div>
                        </div>
                        <br />
                        <input type="submit" className="btn" />
                    </form>
                </div>
        )
}

export default PerDiem;