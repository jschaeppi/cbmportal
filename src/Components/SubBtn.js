import React from 'react'
import { Fragment } from 'react'
import { makeStyles, Grid, Button } from '@material-ui/core';

const useStyles = makeStyles((theme => ({
    gridItem: {
        paddingBottom: '24px',
        justifyContent: 'center'
    },
    subBut: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem'
    }
})))
function SubBtn() {

    const classes = useStyles();
    return (
        <Fragment>
            <Grid item className={classes.gridItem}>
                <Button component="button" variant="contained" size="small" className={classes.subBut}>
                    Submit Form    
                </Button>
            </Grid>
        </Fragment>
    )
}

export default SubBtn
