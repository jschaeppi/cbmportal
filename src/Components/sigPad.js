import { makeStyles, Grid } from '@material-ui/core';
import React, { Fragment }from 'react';
import SignatureCanvas from 'react-signature-canvas';

const useStyles = makeStyles((theme) => ({
    sig: {
        border: '1px solid black',
        width: '35rem',
        backgroundColor: '#c9c8c5',
    },
    sigContainer: {
        display: 'flex',
        justifyContent: 'center'
    }

}))
const SigPad = ( { sigPad, clearPad }) => {

    const classes = useStyles();
        return (
            <Fragment>
                <Grid item xs={12} className={classes.sigContainer}>
                    <SignatureCanvas clearButton="true" penColor='black' canvasProps={{ className: `${classes.sig}`}} ref = {sigPad} />
                    <br />
                </Grid>
                <Grid item xs={12}>
                    <button id="sigButton" onClick={e => clearPad(e)} type="button ">Clear</button>
                </Grid>
            </Fragment>
        )
}

export default SigPad
