import React, { useState, useEffect, useContext } from 'react';
import { Grid, makeStyles, TextField, Select, FormControlLabel, FormControl, InputLabel } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import NewPS from '../Components/newPS';
import PSList from '../Components/PSList';
// import '../css/hotelRequest.css';
import CbmContext from '../context/cbm/cbmContext';
import Notes from '../Components/Notes';
import Store from '../Components/Stores';
import MainHeading from '../Components/MainHeading';
import { CheckBox } from '@material-ui/icons';
import SubBtn from '../Components/SubBtn';

const useStyles = makeStyles((theme => ({
    container: {
        justifyContent: 'center',
        width: '40vw !important',
        margin: '0 auto',
        marginTop: '10rem'
    },
    gridItem: {
        paddingBottom: '24px',
        justifyContent: 'center'
    },
    // dateTime: {
    //     width: '100%',
    //     paddingTop: '24px',
    //     alignItems: 'flex-start'
    // },
    form: {
      width: '100%',
      padding: '0 4rem'
    },
    mainHeading: {
        display: 'flex',
        justifyContent: 'center'
    },
    sig: {
      display: 'flex',
      justifyContent: 'center',
      width: '50%'
    },
    subBut: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem'
    }
})))

function HotelRequest() {
    const classes = useStyles();
    const cbmContext = useContext(CbmContext);
    const { loginStatus, isAuthenticated,loading, getStores, stores, user, formSubmit, success } = cbmContext;
    const { district } = cbmContext.user;
    let body = '';
    const history = useHistory();
    const [psList, setPsList] = useState([]);
    const   [psToggle, setToggle] = useState(false);
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
            <Grid container className={classes.container}>
                <MainHeading heading="Hotel Request" />
                    <form onSubmit={e => onSubmit(e)} className={classes.form}>
                        <Store  storeData={handleChange} selectedStore={formData.store} name="store" stores={stores} />
                        <Grid container>
                            <Grid item className={classes.gridItem} xs={12} sm={6}>
                                <TextField 
                                type="date" 
                                variant="standard" 
                                id="checkIn" 
                                label="Check In Date" 
                                name="checkIn" 
                                required 
                                InputLabelProps = {{shrink: true}}
                                onChange={e => handleChange(e)} 
                                />
                            </Grid>
                            <Grid item class={classes.gridItem} xs={12} sm={6}>
                                <TextField 
                                type="date" 
                                variant="standard" 
                                id="checkOut" 
                                label="Check Out Date" 
                                name="checkOut" 
                                required 
                                InputLabelProps = {{shrink: true}}
                                onChange={e => handleChange(e)} 
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <Select native id="roomNum" name="roomNum" required onChange={e => handleChange(e)}>
                                    <option value="">Number of rooms:</option>
                                    <option value="1">1 room </option>
                                    <option value="2">2 rooms</option>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridItem} >
                                <Select native id="peopleNum" name="peopleNum" required onChange={e => handleChange(e)}>
                                    <option value="">Number of people:</option>
                                    <option value="1">One Person</option>
                                    <option value="2">Two People</option>
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {numBeds()}
                            </Grid>
                        </Grid>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4} className={classes.gridItem} >
                                <FormControlLabel
                                control = {
                                <CheckBox checked={psToggle} label="New PS" type="checkbox" id="psToggle" name="psToggle" onChange={e => toggleChange(e)} />
                                }
                                label="New PS"
                                />
                                </Grid>
                            {addNewPS()}
                        </Grid>
                            <Grid container>
                                <Grid item xs={12} sm={6} className={classes.gridItem}>
                                    <FormControl>
                                        <InputLabel shrink htmlFor="hotelReason">Reason for hotel</InputLabel>
                                        <Select native name="hotelReason" required onChange={e => handleChange(e)}>
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
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.gridItem}>
                                        <TextField variant="standard" type="number" name="WT" id="workTicket" label="Enter Work Ticket" required onChange={e => handleChange(e)} />
                                </Grid>
                            </Grid>
                            <Grid container direction="column">
                                <Notes name="notes" label="Notes" notesData={handleChange} />
                            </Grid>
                            <Grid container className={classes.subBut}>
                                <SubBtn />
                            </Grid>
                    </form>
            </Grid>
        )
    }

export default HotelRequest
