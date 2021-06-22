import { makeStyles } from '@material-ui/core'
import { Grid, FormControl, TextField } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme => ({
    gridItem: {
        paddingBottom: '24px',
        justifyContent: 'center'
    },
    notes: { 
        width: '90%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem'
    },
})))
function Notes({label, notesData, id, name}) {

    const classes = useStyles();
    
    return (
        <div>
            <Grid item xs={12} className={`${classes.gridItem}`}>
                <FormControl className={classes.notes}>
                <TextField 
                multiline
                label={label}
                type="text"
                rows="3"
                onChange={e => notesData(e)}
                id={id}
                name={name}
                />
                </FormControl>
            </Grid>
        </div>
    )
}

export default Notes
