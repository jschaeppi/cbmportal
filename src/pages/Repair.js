import React, { useState, useEffect, useContext} from 'react'
import {useHistory} from 'react-router-dom';
import '../css/repair.css';
import CbmContext from '../context/cbm/cbmContext';
import axios from 'axios';
const Repair = () => {

    const cbmContext = useContext(CbmContext);
    const { loginStatus, getStores, stores, isAuthenticated, loading } = cbmContext;
    const { district} = cbmContext.user;
    const [toggleNotListed, setNotListed] = useState(false);
    const history = useHistory();
    const [data, setData] = useState([{
        stores: [],
        location: '',
        machineType: '',
        brandName: '',
        problem: '',
        reported: '',
        machineTag: 0,
        picture: ''
    }]);
    const handleChange = (e) => {
        const { name, value, id } = e.target;
        const list = [...data]
        if (id === "Brand 11") {
            setNotListed(true)
        } else if (id !== "Brand 11"){
            setNotListed(false);
        }
            list[0][name] = value;
            setData(list);  
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const uploadFile = document.getElementById('uploadPicture').files[0];
        const formData = new FormData();
            formData.append('file', uploadFile);
            formData.append('location', data[0].location);
            formData.append('machineType', data[0].machineType);
            formData.append('brandName', data[0].brandName);
            formData.append('machineTag', data[0].machineTag);
            formData.append('problem', data[0].problem);
            formData.append('reported', data[0].reported);
        axios.post('http://portal.cbmportal.com:5000/api/repair', formData)
        .then( res => {
            console.log(res)
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

    const notListed = () => {
        if (toggleNotListed === true) {
            return (
                <div >
                    <label htmlFor="unlistedBrand">Enter your machines brand:</label>
                    <input style={{width: "75%"}} type="text" className="newBrand" name="brandName" id="newModel"></input>
                </div>
            );
        }
    }
                   

        return (
            <div className="container">
                <h1><span>Repair Request</span></h1><br />
                <form onSubmit={e => onSubmit(e)}>
                    <div className="wrapper1">
                        <div id="repairStores">
                            <label >Store Number:</label><br />
                        <select name="location" id="storeList" title="Please select an option" onChange={e => handleChange(e)} required>
                        <option value="">Select a store</option>
                        {stores.map((store, i) => {
                             return <option key={i} value={store.store}>{store.store}</option>
                            })}
                        </select>
                        </div>
                    </div>
            <br /><br />
                        <label>Please select a type of machine:</label>
            <br />
                    <div id="machineRow">
                        <div id="machines">
                            <input type="radio" name="machineType" value="Floor Scrubber" id="Machine Type0" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            <label htmlFor="Machine Type0"> Floor Scrubber</label>
                             <br />
                            <input type="radio" name="machineType" value="Floor Buffer" id="Machine Type1" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            <label htmlFor="Machine Type1"> Floor Buffer</label>
                        </div>
            
                        <div id="machines">
                            <input type="radio" name="machineType" value="Extractor" id="Machine Type3" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            <label htmlFor="Machine Type3"> Extractor</label>
                            <br />
                            <input type="radio" name="machineType" value="Electric Buffer" id="Machine Type4" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                             <label htmlFor="Machine Type4"> Electric Buffer</label>
                        </div>
                        <div id="machines">
                            <input type="radio" name="machineType" value="Wet Vac" id="Machine Type5" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            <label htmlFor="Machine Type5"> Wet Vac</label>
                            <br />
                            <input type="radio" name="machineType" value="Barracuda" id="Machine Type6" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            <label htmlFor="Machine Type6"> Barracuda</label>
                        </div>
                    </div>
                     <br />
                        <label>Machine Brand:</label><br />
                        <label>(If the machine you are reporting is not on the list please touch next)</label>
                    <div id="brands">
                        <div id="brand">
                            <input type="radio" name="brandName" value="Noble" id="Brand 0" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 0"> Noble</label>
                            <br />
                        <input type="radio" name="brandName" value="Tennant" id="Brand 1"required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 1"> Tennant</label>
                             <br />
                        <input type="radio" name="brandName" value="RST-34" id="Brand 2" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 2"> RST-34</label>
                            <br />
                            <input type="radio" name="brandName" value="Viper" id="Brand 3" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 3"> Viper</label>
                        </div>
            
                        <div id="brand">
                            <input type="radio" name="brandName" value="Advance Aqua Clean 18 FLX" id="Brand 4" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 4"> Advance Aqua Clean 18 FLX</label>
                            <br />
                            <input type="radio" name="brandName" value="Clarke" id="Brand 5" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 5"> Clarke</label>
                            <br />
                            <input type="radio" name="brandName" value="Clarke Focus I" id="Brand 6" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 6"> Clarke Focus I</label>
                            <br />
                            <input type="radio" name="brandName" value="Clarke Focus II" id="Brand 7" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 7"> Clarke Focus II</label>
                        </div>
                        <div id="brand">
                            <input type="radio" name="brandName" value="Eagle" id="Brand 8" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 8"> Eagle</label>
                            <br />
                            <input type="radio" name="brandName" value="Pioneer" id="Brand 9" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 9"> Pioneer</label>
                            <br />
                            <input type="radio" name="brandName" value="Taski" id="Brand 10" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 10"> Taski</label>
                            <br />
                            <input type="radio" name="brandName" value="Not Listed" id="Brand 11" required title="Please enter the required information" onClick={e => handleChange(e)}></input>
                            <label htmlFor="Brand 11"> Not Listed</label>
                            <br />
                            {notListed()}
                        </div>
                    </div>
                    <br /><br />
                    <div id="problem">
                        <div>
                            <label htmlFor="machineTag">Enter Tag #:</label><br />
                            <input style={{width: "75%"}} type="text" className="tagNum" name="machineTag" id="machineTag" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                            </div>
                            <br /><br />
                        <div>
                            <label htmlFor="problem">Problem description:</label><br />
                            <textarea type="text" name="problem" id="problemDescription" required title="Please enter the required information" onChange={e => handleChange(e)}></textarea>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <label htmlFor="picture">Take Picture:</label><br />
                        <input type="file" name="picture" id="uploadPicture" accept="image/x-png, image/jpeg" required title="Please select a file" onChange={e => handleChange(e)}></input>
                    </div>
                    <br /><br />
                    <div id="reportedDiv">
                        <label htmlFor="reported">Reported By:</label><br />
                        <input type="text" name="reported" id="reportedBy" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                    </div>
                    <br /><br />
                    <input type="submit" className="btn" /> 
                </form>
            </div>
        )
}

export default Repair
