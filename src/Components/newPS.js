import React from 'react'
import PropTypes from 'prop-types';

const newPS = ({ handleChange }) => {

        return (
            <div>
                <label for="newPS">Enter New PS:</label><br />
                <input type="text" name="newPS" id="newPS" onChange={e => handleChange(e)}></input>
            </div>
        );
}


newPS.propTypes = {
    handleChange: PropTypes.func.isRequired,
}

export default newPS
