import React from 'react'
import PropTypes from 'prop-types';

const PSList = ({ ps, handleChange }) => {
    return (
        <div id="psList">
        <br />
        <div id="ps1">
        <label forhtml="newPS" id="psLabel">Employee 1</label>
        <label forhtml="newPS" id="psLabel">Employee 2</label>
        <br />
        <select name="listPs1" id="PS" required title="Please select an option" onChange={e => handleChange(e)}>
            {ps.map((managers, i) => {
                return <option key={i} name="PS" id="listPS" value={managers.ps} onChange={e => handleChange(e)}>{managers.ps}</option>
            })}
        </select>
        <select name="listPs2" id="PS" required title="Please select an option" onChange={e => handleChange(e)}>
            {ps.map((managers, i) => {
                return <option key={i} name="PS" id="listPS" value={managers.ps} onChange={e => handleChange(e)}>{managers.ps}</option>
            })}
        </select>
        </div>
    </div>
    )
}

PSList.propTypes = {
    ps: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
}
export default PSList;
