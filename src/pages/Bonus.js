import React, { useState } from 'react';
import '../css/bonus.css';
import SigPad from '../Components/sigPad';

function Bonus() {
    const [rows, addBonusRow] = useState([
        {
            bonus: '',
            date: '',
            location: ''
        }
    ]);
    
    const handleBonusChange = (e, index) => {
        const list = [...rows];
        list[index].bonus = e.target.value;
        addBonusRow(list); 
    }
    const handleDateChange = (e, index) => {
        const list = [...rows];
        list[index].date = e.target.value;
        addBonusRow(list);
    }
    const handleLocationChange = (e, index) => {
        const list = [...rows];
        list[index].location = e.target.value;
        addBonusRow(list);
    }
    const handleAddRow = (e) => {
        e.preventDefault();
        const list = [...rows];
        list.push({
            bonus: '',
            date: '',
            location: ''
        })
        addBonusRow(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...rows];
        list.splice(index,1)
        addBonusRow(list);
    }

        return (
            <div className="container">
                <h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Bonus</span></h1><br />
                <form>
                    <label for="employeenum">Employee #:</label><br />
                    <input type="text" id="employeenum" name="employeenum"/><br /><br />
                    <label for="employeename"> Employee Name:</label><br />
                    <input type="text" id="employeename" name="employeename"/>
                    <br /><br />
                    <label for="dm">DM:</label><br />
                    <select id="dm" name="dm">
                    <option value="Ausencio Cruz">Ausencio Cruz</option>
                    <option value="Cruz Hernandez">Cruz Hernandez</option>
                    <option value="Daniel De la Paz">Daniel De la Paz</option>
                    <option value="Lino Huerta">Lino Huerta</option>
                    <option value="Jose Lopez">Jose Lopez</option>
                    <option value="Zach Harlow">Zach Harlow"</option>
                    </select><br /><br />
                        
                    { rows.map((row, index) => { 
                        const incIndex = index + 1;
                        const bonusName =`Bonus ${incIndex}`
                        const locationName = `Location ${incIndex}`
                        const dateName = `Date ${incIndex}` 
                        return (
                            <div key={index}>
                                <label for={dateName}>{dateName}</label><br />
                                <input key={dateName} required pattern="\d{2}-\d{2}-\d{4}}" type="date" name={dateName} onChange={e => handleDateChange(e, index)} ></input><br />
                                <label for={locationName}>{locationName}</label><br />
                                <input key={locationName} type="text" name={locationName} onChange={e => handleLocationChange(e, index)}></input><br />
                                <label for={bonusName}>{bonusName}</label><br />
                                <input key={bonusName} type="text" name={bonusName} onChange={e => handleBonusChange(e, index)}></input><br />
                                {rows.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="bonusRemoveButton">Remove</button>}
                                {rows.length - 1 === index && <button onClick={handleAddRow} id="bonusAddButton">Add Bonus</button>}
                            </div>
                        );
                    })}
                    <SigPad />
                    <br />
                    <br />
                    <br />
                    <textarea ></textarea><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
}

export default Bonus
