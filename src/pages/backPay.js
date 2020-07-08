import React, { useState } from 'react';
import SigPad from '../Components/sigPad';
import '../css/backPay.css';
function BackPay() {
    const [backPays, addBackPay] = useState([
        {
            in: '',
            left_lunch: '',
            return_lunch: '',
            out: ''
        }
    ]);
    
    const handleInputChange = (e, index) => {
        const incIndex = index + 1;
        if (e.target.id === `In ${incIndex}`) {
        const list = [...backPays];
        list[index].in = e.target.value;
        addBackPay(list); 
        } else if (e.target.id === `Left for lunch ${incIndex}`) {
            const list = [...backPays];
            list[index].left_lunch = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === `Return From Lunch ${incIndex}`) {
            const list = [...backPays];
            list[index].return_lunch = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === `Out ${incIndex}`) {
            const list = [...backPays];
            list[index].out = e.target.value;
            addBackPay(list); 
        }
    }
    const handleAddBackPay = (e) => {
        e.preventDefault();
        const list = [...backPays];
        list.push({
            in: '',
            left_lunch: '',
            return_lunch: '',
            out: ''
        })
        addBackPay(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...backPays];
        list.splice(index,1)
        addBackPay(list)
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
                        
                    { backPays.map((row, index) => { 
                        const incIndex = index + 1;
                        const inName =`In ${incIndex}`;
                        const left_lunchName = `Left for lunch ${incIndex}`;
                        const return_lunchName = `Return From Lunch ${incIndex}`;
                        const outName = `Out ${incIndex}`;
                        return (
                            <div key={index}>
                                <label for={inName}>{inName}</label><br />
                                <input key={inName} type="datetime-local" id={inName}  onChange={e => handleInputChange(e, index)} ></input><br />
                                <label for={left_lunchName}>{left_lunchName}</label><br />
                                <input key={left_lunchName} type="datetime-local" id={left_lunchName} name={left_lunchName} onChange={e =>handleInputChange(e, index)}></input><br />
                                <label for={return_lunchName}>{return_lunchName}</label><br />
                                <input key={return_lunchName} type="datetime-local" id={return_lunchName} name={return_lunchName} onChange={e => handleInputChange(e, index)}></input><br />
                                <label for={outName}>{outName}</label><br />
                                <input key={outName} type="datetime-local" id={outName} name={outName} onChange={e => handleInputChange(e, index)}></input><br />
                                {backPays.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="backPayRemoveButton">Remove</button>}
                                {backPays.length - 1 === index && <button onClick={handleAddBackPay} id="backPayAddButton">Add Back Pay</button>}
                            </div>
                        );
                    })}<br />
                    <label for="comments">REASON WHY THIS PAY WAS MISSED</label><br />
                    <textarea name="comments" id="comments"></textarea><br />
                    <SigPad />
                    <br />
                    <br />
                    <br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
}

export default BackPay;