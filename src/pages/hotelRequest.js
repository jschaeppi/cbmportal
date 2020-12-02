import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import NewPS from '../Components/newPS';
import PSList from '../Components/PSList';
import '../css/hotelRequest.css';
import CbmContext from '../context/cbm/cbmContext';

function HotelRequest() {
    const cbmContext = useContext(CbmContext);
    const { loginStatus, isAuthenticated,loading, getStores, stores, user, formSubmit, success } = cbmContext;
    const { district } = cbmContext.user;
    let body = '';
    const history = useHistory();
    const [psList, setPsList] = useState([]);
    let   [psToggle, setToggle] = useState(false);
    const [formData, setFormData] = useState([
        {
            peopleNum: '1',
            roomNum: '1',
            store: '',
            listPs1: '',
            listPs2: '',
            checkIn: '',
            checkOut: '',
            notes: '',
            hotelReason: '',
            beds: '',
            WT: '',
            newPS: ''

        }
    ])  

    //Fetch stores and PS'

    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        console.log(district);
            getStores(district);
            fetch(`https://portal.cbmportal.com:5000/api/hotel/ps/${district}`)
            .then(res => res.json())
            .then(data => setPsList(data) )
            // eslint-disable-next-line
    }, [district])

        //Handle the interactivity Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        let list = [...formData];
        list[0][name] = value
        setFormData(list); 
    }

    const toggleChange = () => {
        setToggle(!psToggle);
        }

    //Show the new PS text field
    const addNewPS = (e) => {
        if (psToggle === true) {
            return <NewPS handleChange={handleChange} />
        } 
        const ps = [...psList];
            return (
                    <PSList ps={ps} handleChange={handleChange} />
            );
        }

    const numBeds = () => {
            if (formData[0].peopleNum === "2" && formData[0].roomNum === "1" ) {
                if (formData[0].beds !== "2") {
                    let list = [...formData];
                    list[0].beds = "2" 
                    console.log(list[0].beds)
                    setFormData(list);
                }
            } else if (formData[0].peopleNum !== "2" || formData[0].roomNum !== "1" ) {
                if (formData[0].beds === "2" || formData[0].beds === "") {
                    let list = [...formData];
                    list[0].beds = "1" 
                    setFormData(list);
                }
            }
}

    const onSubmit = (e) => {
        e.preventDefault();
            body = JSON.stringify({
                peopleNum: formData[0].peopleNum,
                roomNum: formData[0].roomNum,
                store: formData[0].store,
                listPs1: formData[0].listPs1,
                listPs2: formData[0].listPs2,
                checkIn: formData[0].checkIn,
                checkOut: formData[0].checkOut,
                notes: formData[0].notes,
                hotelReason: formData[0].hotelReason,
                beds: formData[0].beds,
                dm: user,
                WT: formData[0].WT,
                newPS: formData[0].newPS
    })
    formSubmit(body, 'hotel');
    if (success && !loading) {
        console.log('I\'m redirecting');
        console.log(success);
        history.push('/success');
    } else {
        history.push('/')
    }
}
        return (
            <div className="container">
                <h1 className="mainHeading"><span>Hotel Request</span></h1><br />
                    <form onSubmit={e => onSubmit(e)} className="mainForm">
                        <div className="wrapper1">
                            <div id="hotelStores">
                                <label>Store:</label><br />
                                <select name="store" required title="Please select an option" onChange={e => handleChange(e)}>
                                    <option name="storeSelect">Select a location</option>
                                    {stores.map((store, i) => {
                                        return <option key={i} name="store" id="store">{store.store}</option>
                                    })}
                                </select>
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="wrapper1">
                            <div id="hotelCheckIn">
                                <label forhtml="checkIn">Check In Date:</label>
                                <input type="date" id="checkIn" name="checkIn" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                    
                            </div>
                            <div id="hotelCheckIn">
                                <label forhtml="checkOut">Check Out Date:</label>
                                <input type="date" id="checkOut" name="checkOut" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1" id="rooms">
                            <div>
                                <label forhtml="roomNum">How many rooms:</label>
                                <select id="roomNum" name="roomNum" required title="Please select an option" onChange={e => handleChange(e)}>
                                    <option value="">Number of Rooms:</option>
                                    <option value="1">1 room</option>
                                    <option value="2">2 rooms</option>
                                </select>
                            </div>
                            <div>
                                <label forhtml="peopleNum" >How many people in room:</label><br />
                                <select id="peopleNum" name="peopleNum" required title="Please select an option" onChange={e => handleChange(e)}>
                                    <option value="">Number of People:</option>
                                    <option value="1">One Person</option>
                                    <option value="2">Two People</option>
                                </select>
                                {numBeds()}
                            </div>
                        </div>
                        <br />
                        <br />
                        <div className="wrapper1">
                            <div id="psToggleDiv">
                                <label forhtml="newPS">New PS:</label>
                                <input type="checkbox" name="psToggle" id="psToggle" onChange={e => toggleChange(e)}></input>
                            </div>
                                {addNewPS()}
                        </div>
                            <br />
                        <div className="wrapper1" id="hotelInfo">
                            <div id="hotelInfo">
                                <label forhtml="hotelReason">Reason for Hotel:</label>
                                <select name="hotelReason" required title="Please select an option" onChange={e => handleChange(e)}>
                                    <option value="">Select an option</option>
                                    <option value="VATs">VATs</option>
                                    <option value="Full SR">Full SR</option>
                                    <option value="Partial SR">Partial SR</option>
                                    <option value="Full DSR">Full DSR</option>
                                    <option value="Partial DSR">Partial DSR</option>
                                    <option value="Full Carpet Extraction">Full Carpet Extraction</option>
                                    <option value="Covering Location">Covering Location</option>
                                    <option value="Closing WOs">Closing WOs</option>
                                    <option value="Store Remodel">Store Remodel</option>
                                </select>
                            </div>
                            <div id="hotelInfo">
                                <label forhtml="workTicket">Enter Work Ticket:</label>
                                <input type="number" name="WT" id="workTicket" required title="Please enter the required information" onChange={e => handleChange(e)} />
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                                <label forhtml="notes" >Notes:</label><br />
                                <textarea name="notes" id="hotelNotes" onChange={e => handleChange(e)}></textarea>
                        </div>
                        <br /><br />
                        <input type="submit" className="btn" />
                    </form>
            </div>
        )
    }

export default HotelRequest
