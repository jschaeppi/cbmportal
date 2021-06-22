import React from 'react'
import {Grid, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme => ({
    gridItem: {
    paddingBottom: '24px',
    justifyContent: 'center'
},
})))
function MainHeading({heading}) {

    const classes = useStyles();
    return (
        <div>
            <Grid item className={classes.gridItem}>
                <Typography variant="h3">{heading}</Typography>
            </Grid>
        </div>
    )
}

export default MainHeading
