import React, { useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import axios from 'axios';
import '../css/propane.css';
const Propane = () => {
    
    const cbmContext = useContext(CbmContext);
    const { loginStatus, getStores, stores, isAuthenticated, loading, user } = cbmContext;
    const { district} = cbmContext.user;
    const history = useHistory();
    const [data, setData] = useState([{
            notes: '',
            employeeName: '',
            tanksLeft: '',
            location: '',
            picture: null,
        }]);


    const handleChange = (e) => {
    
        const {name, value } = e.target;
        const list = [...data];
          list[0][name] = value;
          setData(list);
    }

    const onSubmit = (e) => {
        e.preventDefault();
            const upload_file = document.getElementById('uploadPicture').files[0];
            const formData = new FormData();
            formData.append('file', upload_file);
            formData.append('location', data[0].location);
            formData.append('employeeName', data[0].employeeName);
            formData.append('notes', data[0].notes);
            formData.append('tanksLeft', data[0].tanksLeft);
            formData.append('dm', user);
            axios.post('https://portal.cbmportal.com:5000/api/propane/', formData)
            .then( res => {
                if (res.data.message) history.push('/success');
            })
            .catch(err => console.log(err))
}

        useEffect(() => {
            if (!isAuthenticated && !loading) {
            loginStatus();
            }
            getStores(district);
            // eslint-disable-next-line
        }, [district])

        return (
            <div className="container">
                <h1><span>Propane Request</span></h1><br />
                    <form onSubmit={e => onSubmit(e)} >
                        <div className="wrapper1">
                            <label>Store Number:</label>
                            <br />
                            <select name="location" id="storeList" required title="Please select an option" onChange={e => handleChange(e)}>
                            {stores.map((store, i) => {
                                return <option key={i}>{store.store}</option>
                            })}
                            </select>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label forhtml="employeename">Employee Name</label><br />
                            <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label forhtml="tanksLeft">How many tanks are left in the cage:</label><br />
                            <input type="number" id="tanksLeft" name="tanksLeft" maxLength="3" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label forhtml="picture">Take Picture:</label><br />
                            <input type="file" name="picture" id="uploadPicture" accept="image/x-png, image/jpeg" required title="Please select a file" onChange={e => handleChange(e)}></input>
                        </div>
                    <br /><br />
                        <div className="wrapper1">
                            <label >Notes:</label> <br />
                            <textarea id="propaneNotes" name="notes" onChange={e => handleChange(e)}></textarea>
                        </div>
                    <br /><br />
                    <input type="submit" className="btn" />
                </form>
            </div>
        )
}

export default Propane
