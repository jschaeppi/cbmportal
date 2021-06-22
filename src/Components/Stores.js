import React from 'react'
import {Grid, FormControl, InputLabel, makeStyles, Select } from '@material-ui/core';

const useStyles = makeStyles((theme => ({
        gridItem: {
        paddingBottom: '24px',
        justifyContent: 'center'
    },
    storeSelect: {
        width: '75%',
        display: 'flex',
        justifyContent: 'center',
        // marginTop: '2rem'
    },
})))

const Stores = ( { stores, storeData, selectedStore, name, index }) => {

    const classes = useStyles();
    return (
                <Grid item className={`${classes.gridItem}`}>
                    <FormControl className={classes.storeSelect}>
                    <InputLabel id="storeSelectLabel">Select a store</InputLabel>
                    <Select 
                    native
                    id={"stores"}
                    name={name}
                    labelId="storeSelectLabel"
                    onChange={e => storeData(e, index)}
                    value={selectedStore}
                    defaultValue=""
                    required
                    >
                        <option value="select">Please select</option>
                        {stores.map((store, i) => {
                            return <option value={store.store} key={i} name="stores" id="store">{store.store}</option>
                        })}
                    </Select>
                    </FormControl>
            </Grid>
    )
}

export default Stores