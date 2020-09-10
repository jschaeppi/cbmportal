import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import '../css/dustmop.css';
import axios from 'axios';
import CbmContext from '../context/cbm/cbmContext';
const DustMop = () => {

    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { loginStatus, getStores, stores, isAuthenticated, loading, user } = cbmContext;
    const { district } = cbmContext.user;

    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        getStores(district);
        // eslint-disable-next-line
    }, [district])
    
    const [data, setData] = useState([{
            employeeName: '', 
            mopsLeft: '',
            location: '',
        }])

    const handleChange = (e) => {
        const {name, value}= e.target;
        const list = [...data];
            list[0][name] = value;
            setData(list);
    }


    const onSubmit = (e) => {
        e.preventDefault();
        const upload_file = document.getElementById('picture').files[0];
        const formData = new FormData();
        formData.append('file', upload_file);
        formData.append('location', data[0].location);
        formData.append('employeeName', data[0].employeeName);
        formData.append('mopsLeft', data[0].mopsLeft);
        formData.append('dm', user)
        axios.post('http://portal.cbmportal.com:5000/api/dustmop/', formData)
        .then( res => {
            if (res.data.message) history.push('/success');
        })
        .catch(err => console.log(err))
    }

        return (
            <div className="container">
                <h1 id="dustmopHeading" className="mainHeading"><span>Dustmop Request</span></h1><br />
                    <form onSubmit={e => onSubmit(e)} id="dustmopForm" className="mainHeading">
                        <div className="wrapper1">
                            <div>
                                <label >Store Number:</label>
                                <select onChange={e => handleChange(e)} required name="location" id="storeList">
                                    {stores.map((store, i) => {
                                        return <option>{store.store}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="employeename">Employee Name</label><br />
                                <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br /> 
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="mopsLeft">Dust mops left:</label><br />
                                <input type="number" id="mopsLeft" name="mopsLeft" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <div>
                                <label htmlFor="picture">Take Picture:</label><br />
                                <input type="file" name="picture" id="picture" accept="image/x-png, image/jpeg" required title="Please select a file"></input>
                            </div>
                        </div>
                        <br /><br />
                        <input type="submit" className="btn" />
                    </form>
            </div>
        )
}

export default DustMop
