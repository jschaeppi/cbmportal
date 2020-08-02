import React from 'react'
import PropTypes from 'prop-types';

const PSList = ({ ps, handleChange }) => {
    return (
        <div id="psList">
        <br />
        <label forhtml="newPS">Employee 1</label><br />
        <select name="listPs1" id="PS" required title="Please select an option" onChange={e => handleChange(e)}>
            {ps.map((managers, i) => {
                return <option key={i} name="PS" id="listPS" value={managers.ps} onChange={e => handleChange(e)}>{managers.ps}</option>
            })}
        </select>
        <br />
        <label forhtml="newPS">Employee 2</label><br />
        <select name="listPs2" id="PS" required title="Please select an option" onChange={e => handleChange(e)}>
            {ps.map((managers, i) => {
                return <option key={i} name="PS" id="listPS" value={managers.ps} onChange={e => handleChange(e)}>{managers.ps}</option>
            })}
        </select>
    </div>
    )
}

PSList.propTypes = {
    ps: PropTypes.array.isRequired,
    handleChange: PropTypes.func.isRequired,
}
export default PSList;
