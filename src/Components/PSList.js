import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import {Grid, Select, makeStyles, FormControl, FormHelperText } from '@material-ui/core';

const useStyles = makeStyles((theme => ({
    gridItem: {
        paddingBottom: '24px',
        justifyContent: 'center'
    },
})))
const PSList = ({ ps, handleChange }) => {
    const classes = useStyles();
    return (
        <Fragment>
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <FormControl>
                {/* <InputLabel htmlFor="PS">Select PS</InputLabel> */}
                <Select native name="listPs1" id="PS" required onChange={e => handleChange(e)}>
                    <option value="">Select PS</option>
                    {ps.map((managers, i) => {
                        return <option key={i} name="PS" id="listPS" value={managers.ps} onChange={e => handleChange(e)}>{managers.ps}</option>
                    })}
                </Select>
                <FormHelperText>Choose PS</FormHelperText>
            </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.gridItem}>
            <FormControl>
                {/* <InputLabel htmlFor="PS">Select PS</InputLabel> */}
                <Select native name="listPs2" id="PS" required onChange={e => handleChange(e)}>
                    <option value="">Select PS</option>
                    {ps.map((managers, i) => {
                        return <option key={i} name="PS" id="listPS" value={managers.ps} onChange={e => handleChange(e)}>{managers.ps}</option>
                    })}
                </Select>
            </FormControl>
        </Grid>
        </Fragment>
    )
}

PSList.propTypes = {
    ps: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
}
export default PSList;
