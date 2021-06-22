import React, { useState, useEffect, useContext } from 'react';
import {useHistory} from 'react-router-dom';
// import '../css/mileage.css';
import {makeStyles, Grid, TextField, ButtonGroup, FormControl, InputLabel, Select, Button } from '@material-ui/core';
import CbmContext from '../context/cbm/cbmContext';
import MainHeading from '../Components/MainHeading';
import Notes from '../Components/Notes';
import SubBtn from '../Components/SubBtn';
import { Fragment } from 'react';

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
    dateTime: {
        width: '100%',
        paddingTop: '24px',
        alignItems: 'flex-start'
    },
    form: {
      width: '100%',
      padding: '0 2rem'
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

function Mileage() {
    const classes = useStyles();
    const cbmContext = useContext(CbmContext);
    const { loginStatus, loading, isAuthenticated, getStores, stores, user, formSubmit, success } = cbmContext;
    const { district } = cbmContext.user;
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
                dm: user, 
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
                    dm: user, 
                    employeeName: mileage[0].employeeName, 
                    employeeNum: mileage[0].employeeNum,
                    comments: mileage[0].comments
                });
            })
        }
    // On submit of the form, send a POST request with the data to the server.
        formSubmit(JSON.stringify(rows), 'mileage');
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
                <MainHeading heading="Mileage" />
                    <form onSubmit={e => onSubmit(e)} className={classes.form}>
                        <Grid container>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <TextField type="text" variant="standard" id="employeeName" name="employeeName" label="Employee Name" required onChange={e => handleInputChange(e)} />
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <TextField type="text" variant="standard" id="employeeNum" name="employeeNum" label="Employee #" required onChange={e => handleInputChange(e)} />
                            </Grid>
                        </Grid>
                        <Grid container direction="column">
                            <Notes id="comments" notesData={handleInputChange} label="Comments" />
                        </Grid>
                            { mileage.map((row, index) => { 
                                    const incIndex = index + 1;
                                    const mileageDate =`Mileage Date ${incIndex}`;
                                    const startingPoint = `Starting Point ${incIndex}`;
                                    const destinationPoint = `Destination Point ${incIndex}`;
                                    return (
                                            <Fragment>
                                                <Grid container key="mileage" className={classes.gridItem} spacing={2}>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <TextField 
                                                        label={mileageDate} 
                                                        variant="standard" 
                                                        id={mileageDate} 
                                                        InputLabelProps={{shrink: true}} 
                                                        type="date" 
                                                        onChange={e => handleInputChange(e, index)} 
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                                                        <FormControl>
                                                            <InputLabel shrink htmlFor={startingPoint}>{startingPoint}</InputLabel>
                                                            <Select native id={startingPoint} required onChange={e => handleInputChange(e, index)}>
                                                                <option value="">Select Starting Point</option>
                                                                {stores.map((store, i) => {
                                                                    return (
                                                                        <option key={i}>{store.store}</option>
                                                                    )}
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
                                                    <FormControl>
                                                            <InputLabel shrink htmlFor={destinationPoint}>{destinationPoint}</InputLabel>
                                                            <Select native id={destinationPoint} required onChange={e => handleInputChange(e, index)}>
                                                                <option value="">Select Destination Point</option>
                                                                {stores.map((store, i) => {
                                                                    return (
                                                                        <option key={i}>{store.store}</option>
                                                                    )}
                                                                )}
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>   
                                                <Grid container>
                                                    <Grid item className={classes.gridItem}>
                                                        <ButtonGroup>
                                                            {mileage.length !== 1 && <Button variant="contained" onClick={e => handleRemoveRow(e,index)} id="mileageRemoveButton">Remove</Button>}
                                                            {mileage.length - 1 === index && <Button variant="contained" onClick={handleMileage} id="mileageAddButton">Add Mileage</Button>}
                                                        </ButtonGroup>
                                                    </Grid>
                                                </Grid>  
                                            </Fragment>
                                    );
                                })}
                                <Grid container className={classes.subBut}>
                                    <SubBtn />
                                </Grid>
                    </form>
                </Grid>
        )
}

export default Mileage