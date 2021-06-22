import { TextField, Grid, makeStyles, ButtonGroup, Button } from '@material-ui/core';
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MainHeading from '../Components/MainHeading';
import Notes from '../Components/Notes';
import SigPad from '../Components/sigPad';
import Store from '../Components/Stores';
import CbmContext from '../context/cbm/cbmContext';

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
})))


function Bonus() {
    const classes = useStyles();
    const cbmContext = useContext(CbmContext);
    const { loginStatus, getStores, stores, isAuthenticated, loading, user, formSubmit, success } = cbmContext;
    const { district} = cbmContext.user;
    const history = useHistory();
    
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        getStores(district);
        // eslint-disable-next-line
    }, [district])
    const [formData, setFormData] = useState([
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
            console.log(name, value);
            list[index-1].bonus = e.target.value;
        } else if (e.target.name === `Location ${index}`) {
            console.log(name, value);
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
        formSubmit(JSON.stringify(rows), 'bonus');
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
                
            // <div className="container">
            <Grid container className={classes.container}>
                <div id="success"></div>
                    <Grid container className={classes.mainHeading}>
                        <MainHeading heading="Bonus" />
                    </Grid>
                    <form className={classes.form} onSubmit={e => onSubmit(e)}>
                        <Grid container>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <TextField type="text" label="Employee #" onChange={e => handleChange(e, 1)} id="employeeNum" name="employeeNum" required></TextField>
                            </Grid>
                            <Grid item xs={12} sm={6} className={classes.gridItem}>
                                <TextField type="text" label="Employee Name" onChange={e => handleChange(e, 1)} id="employeeName" name="employeeName" required></TextField>
                            </Grid>
                        </Grid>
                    
                        { formData.map((row, index) => { 
                            const incIndex = index + 1;
                            const bonusName =`Bonus ${incIndex}`
                            const locationName = `Location ${incIndex}`
                            const dateName = `Date ${incIndex}` 
                            return (
                                <Grid container key={index}>
                                    <Grid item className={classes.gridItem} xs={12} sm={6}>
                                        <TextField type="date" id="date" name={dateName} required onChange={e => handleChange(e, incIndex)}></TextField>
                                    </Grid>
                                        <Store storeData={handleChange} selectedStore={formData.location} name={locationName} index={incIndex} stores={stores} />
                                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                                        <TextField type="number" key={bonusName} step="any" id="bonusInput" name={bonusName} label={bonusName} required onChange={e => handleChange(e, incIndex)}></TextField>
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridItem}>
                                        <ButtonGroup color="primary" size="small" variant="contained">
                                            {formData.length !== 1 && <Button xs={12} sm={6} onClick={e => handleRemoveRow(e,index)} id="bonusRemoveButton">Remove</Button>}
                                            {formData.length - 1 === index && <Button xs={12} sm={6} onClick={handleAddRow} id="bonusAddButton">Add Bonus</Button>}
                                        </ButtonGroup>
                                    </Grid>
                                </Grid>
                            );
                        })}
                            <Grid container direction="column">
                                <Notes label="Comments" name="comments" notesData={handleChange} required />
                            </Grid>
                            <Grid container>
                                <SigPad sigPad={managerPad} clearPad={e => clearPad(e)} />
                            </Grid>
                            <Grid container className={classes.subBut}>
                                <Grid item >
                                    <Button component="button" variant="contained" size="small">
                                        Submit Form    
                                    </Button>
                                </Grid>
                            </Grid>
                    </form>
            </Grid>
        )
    }


export default Bonus
