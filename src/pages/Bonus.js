import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import '../css/bonus.css';
//import SignatureCanvas from 'react-signature-canvas'
import SigPad from '../Components/sigPad';
import CbmContext from '../context/cbm/cbmContext';

function Bonus() {
    const cbmContext = useContext(CbmContext);
    const { loginStatus, getStores, stores, isAuthenticated, loading, user } = cbmContext;
    const { district} = cbmContext.user;
    const history = useHistory();
    
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        getStores(district);
        // eslint-disable-next-line
    }, [district])
    let [formData, setFormData] = useState([
        {
            bonus: '',
            date: '',
            location: '', 
            employeeName: '', 
            employeeNum: '', 
            dm: '',
            comments: '',
            imageURL: '',
        }
    ])
    
    const managerPad = useRef({});

    const clearPad = (e) => {
        e.preventDefault();
        managerPad.current.clear();
    }
    
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...formData];
        if (e.target.name === `Bonus ${index}`) {
            list[index-1].bonus = e.target.value;
        } else if (e.target.name === `Location ${index}`) {
            list[index-1].location = e.target.value;
        } else if (e.target.name === `Date ${index}`) {
            list[index-1].date = e.target.value;
        } else {
            list[0][name] = value;
        }
        setFormData(list);
    }

    const handleAddRow = (e) => {
        e.preventDefault();
        const list = [...formData];
        list.push({
            bonus: '',
            date: '',
            location: ''
        })
        setFormData(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...formData];
        list.splice(index,1)
        setFormData(list);
    }

    const onSubmit = e => {
        e.preventDefault();
        let rows = [];
        if (managerPad.current.isEmpty()) {
            alert('Please provide a signature');
        } else {
        if (formData.length === 1) {
            rows.push({
                dm: user, 
                bonus: formData[0].bonus,
                date: formData[0].date,
                location: formData[0].location, 
                employeeName: formData[0].employeeName, 
                employeeNum: formData[0].employeeNum,
                comments: formData[0].comments,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png')
            })
        } else {
            formData.map((item, i) => {
                return rows.push({
                    dm: user, 
                    bonus: item.bonus,
                    date: item.date,
                    location: item.location, 
                    employeeName: formData[0].employeeName, 
                    employeeNum: formData[0].employeeNum,
                    comments: formData[0].comments,
                    sig: !managerPad.current.isEmpty() ? managerPad.current.getTrimmedCanvas().toDataURL('image/png') : alert('Please provide a signature')
                });
            })
        }
    // On submit of the form, send a POST request with the data to the server.
        fetch('http://portal.cbmportal.com:5000/api/bonus', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(rows),
            })
            .then(res => res.json())
            .then(data => {
                if(data.message) {
                history.push('/success');
                }
            })
            .catch((err) => {
            console.log(err);
        }) 
    }
}

        return (
                
            <div className="container">
                <div id="success"></div>
                    <h1 className="mainHeading"><span>Bonus</span></h1><br />
                        <form className="mainForm" onSubmit={e => onSubmit(e)}>
                            <div className="wrapper1">
                                <div>
                                    <label htmlFor="employeenum">Employee #:</label><br />
                                    <input type="text" id="employeenum" name="employeeNum" required title="Please enter the required information" onChange={e => handleChange(e, 1)}/>
                                </div>
                                <div>
                                    <label htmlFor="employeename"> Employee Name:</label>
                                    <input type="text" id="employeename" name="employeeName"required title="Please enter the required information"  onChange={e => handleChange(e, 1)}/>
                                </div>
                            </div>
                            <br /><br />
                        
                            { formData.map((row, index) => { 
                                const incIndex = index + 1;
                                const bonusName =`Bonus ${incIndex}`
                                const locationName = `Location ${incIndex}`
                                const dateName = `Date ${incIndex}` 
                                return (
                                    <div key={index}>
                                        <div id="addBP">
                                            <div className="wrapper1" id="BP">
                                                <div>
                                                    <label htmlFor={dateName}>{dateName}</label><br />
                                                    <input key={dateName} pattern="\d{2}-\d{2}-\d{4}}" type="date" name={dateName} required title="Please enter the required information" onChange={e => handleChange(e, incIndex)} ></input>
                                                </div>
                                                <div>
                                                    <label htmlFor={locationName}>{locationName}</label><br />
                                                    <select name={locationName} id="stores" required title="Please select an option" onChange={e => handleChange(e, incIndex)}>
                                                        {stores.map((store, i) => {
                                                        return <option key={i} name={locationName} id="store">{store.store}</option>
                                                        })}
                                                    </select>
                                                </div>
                                                 <div>
                                                    <label htmlFor={bonusName}>{bonusName}</label><br />
                                                    <input key={bonusName} type="number" step="any" name={bonusName} required title="Please enter the required information" onChange={e => handleChange(e, incIndex)}></input>
                                                </div>
                                            </div>
                                            {formData.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="bonusRemoveButton">Remove</button>}
                                            {formData.length - 1 === index && <button onClick={handleAddRow} id="bonusAddButton">Add Bonus</button>}
                                        </div>
                                    </div>
                                );
                            })}
                            <br />
                            <br />
                            <div className="wrapper1">
                                <div id="bonusSig">
                                    <SigPad sigPad={managerPad} clearPad={e => clearPad(e)} />
                                </div>
                            </div>
                            <div className="wrapper1">
                                <div id="bonusComments">
                                    <label>Comments:</label>
                                    <textarea required title="Please enter the required information" onChange={e => handleChange(e,1)} name="comments"></textarea>
                                </div>
                            </div>
                            <br />
                            <input type="submit" className="btn" />
                         </form>
            </div>
        )
    }


export default Bonus
