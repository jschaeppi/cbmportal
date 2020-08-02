import React from 'react'

const DM = ( { handleChange }) => {
    return (
        <select id="dm" name="dm" required title="Please select an option" onChange={e => handleChange(e)}>
            <option value="">Select Manager</option>
            <option value="Ausencio Gil Cruz">Ausencio Cruz</option>
            <option value="Cruz Hernandez">Cruz Hernandez</option>
            <option value="Daniel De la Paz">Daniel De la Paz</option>
            <option value="Daniel De la Paz North">Daniel De la Paz North</option>
            <option value="Lino Huerta">Lino Huerta</option>
            <option value="Jose Lopez">Jose Lopez</option>
            <option value="Zach Harlow">Zach Harlow</option>
        </select>
    )
}

export default DM;
