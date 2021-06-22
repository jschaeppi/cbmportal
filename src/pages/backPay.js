import { Button, Grid, makeStyles, TextField, ButtonGroup } from '@material-ui/core';
import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Notes from '../Components/Notes';
import Stores from '../Components/Stores';
import SigPad from '../Components/sigPad';
// import '../css/backPay.css';
import CbmContext from '../context/cbm/cbmContext';
import { Fragment } from 'react';
import MainHeading from '../Components/MainHeading';


const useStyles = makeStyles((theme) => ({
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
      width: '80%',
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
}))

function BackPay() {
    const classes = useStyles();
    const cbmContext = useContext(CbmContext);
    const { loginStatus, isAuthenticated, loading, user, formSubmit, success, stores } = cbmContext;
    let rows = [];
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        // eslint-disable-next-line
    }, [])
    const history = useHistory();

    const managerPad = useRef({});
    const [backPays, addBackPay] = useState([
        {
            date: '',
            in: '',
            left_lunch: '',
            return_lunch: '',
            out: '',
            dm: '',
            payMissed: '',
            employeeName: '', 
            employeeNum: '',
            stores: '',
        }
    ]);

    const handleInputChange = (e, index) => {
        const {value, id} = e.target;
        const list = [...backPays];
        const incIndex = index + 1;
        if (id === `Date ${incIndex}`) {
            list[index].date = value;
            addBackPay(list); 
        } 
        else if (id === `In ${incIndex}`) {
            list[index].in = value;
            addBackPay(list); 
        } else if (id === `Left for lunch ${incIndex}`) {
            list[index].left_lunch = value;
            addBackPay(list); 
        } else if (id === `Return From Lunch ${incIndex}`) {
            list[index].return_lunch = value;
            addBackPay(list); 
        } else if (id === `Out ${incIndex}`) {
            list[index].out = value;
            addBackPay(list); 
          
        } else {
            list[0][id] = value;
            addBackPay(list); 
        }
    }
    
    const handleAddBackPay = (e) => {
        e.preventDefault();
        const list = [...backPays];
        list.push({
            date: '',
            in: '',
            left_lunch: '',
            return_lunch: '',
            out: ''
        })
        addBackPay(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...backPays];
        list.splice(index,1)
        addBackPay(list)
    }

    const clearPad = (e) => {
        e.preventDefault();
        managerPad.current.clear();
    }
    const onSubmit = e => {
        e.preventDefault();
        document.getElementById('heading').innerHTML = '<br /> <p>Your submission is processing';
        if (managerPad.current.isEmpty()) {
            alert('Please provide a signature');
        } else {
        if (backPays.length === 1) {
            rows.push({
                date: backPays[0].date,
                in: backPays[0].in,
                left_lunch: backPays[0].left_lunch,
                return_lunch: backPays[0].return_lunch,
                out: backPays[0].out,
                store: backPays[0].stores,
                dm: user, 
                employeeName: backPays[0].employeeName, 
                employeeNum: backPays[0].employeeNum,
                comments: backPays[0].payMissed,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
            })
        } else {
            rows = backPays.map((item, i) => {
                return ({
                date: item.date,
                in: item.in,
                left_lunch: item.left_lunch,
                return_lunch: item.return_lunch,
                out: item.out,
                dm: user, 
                store: item.stores,
                employeeName: backPays[0].employeeName, 
                employeeNum: backPays[0].employeeNum,
                comments: backPays[0].payMissed,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
                });
            })
        }
    // On submit of the form, send a POST request with the data to the server.

        formSubmit(JSON.stringify(rows), 'backpay');
        if (success && !loading) {
            console.log('I\'m redirecting');
            console.log(success);
            history.push('/success');
        } else {
            history.push('/')
        }
    }
    }
        return (
            <Grid container className={classes.container}>
                <Grid container className={classes.mainHeading}>
                    <MainHeading heading="BackPay" />
                </Grid>
                <form onSubmit={e => onSubmit(e)} className={classes.form}>
                            <Grid container spacing={0} direction="row">
                                <Grid item xs={12} sm={6} className={classes.gridItem}>
                                    <TextField id="employeeNum" name="employeeNum" label="Employee Id" type="text" inputProps={{ height: '2rem'}} required onChange={e => handleInputChange(e)}/>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.gridItem}>
                                    <TextField id="employeeName" name="employeeName" label="Employee Name" type="text" required onChange={e => handleInputChange(e)}/>
                                </Grid>
                    {/*Generating dynamic date times*/}
                    { backPays.map((row, index) => { 
                        const incIndex = index + 1;
                        const date = `Date ${incIndex}`;
                        const inName =`In ${incIndex}`;
                        const left_lunchName = `Left for lunch ${incIndex}`;
                        const return_lunchName = `Return From Lunch ${incIndex}`;
                        const outName = `Out ${incIndex}`;
                        return (
                            <Fragment>
                                <Grid container wrap="nowrap" key={date} direction="row" spacing={1} className={classes.dateTime}>
                                    <Grid item xs={12} sm={6} >
                                        <TextField size="medium" label="Date" id={date} name={date} type="date" onChange={e => handleInputChange(e, index)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField label="In Time" id={inName} name={inName} type="time" onChange={e => handleInputChange(e, index)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField label="Lunch" id={left_lunchName} name={left_lunchName} type="time" onChange={e => handleInputChange(e, index)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <TextField label="Return" id={return_lunchName} name={return_lunchName} type="time" onChange={e => handleInputChange(e, index)} />
                                    </Grid>
                                    <Grid item xs={12} sm={6} className={classes.gridItem} >
                                        <TextField label="Out time" id={outName} name={outName} type="time" onChange={e => handleInputChange(e, index)} />
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                                        <ButtonGroup variant="contained" size="small">
                                            {backPays.length !== 1 && <Button xs={12} sm={6} onClick={e => handleRemoveRow(e,index)} id="backPayRemoveButton">Remove</Button>}
                                            {backPays.length - 1 === index && <Button xs={12} sm={6} onClick={handleAddBackPay} id="backPayAddButton">Add Back Pay</Button>}
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        );
                    })}

                    {/*Generating Store List*/}
                    <Grid container direction="column" spacing={0}>
                        <Stores stores={stores} storeData={handleInputChange} selectedStore={backPays.stores} />
                    </Grid>

                    <Grid container direction="column">
                        <Notes label="Reason pay was missed" id="payMissed" notesData={handleInputChange} />
                    </Grid>
                    <Grid container className={classes.sig}>
                        <SigPad sigPad={managerPad} clearPad={e => clearPad(e)} />
                    </Grid>
                    <Grid container className={classes.subBut}>
                        <Grid item >
                            <Button component="button" variant="contained" size="small">
                                Submit Form    
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Grid>
        )
}

export default BackPay;