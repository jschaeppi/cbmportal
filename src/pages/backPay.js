import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import SignatureCanvas from 'react-signature-canvas'
import '../css/backPay.css';
function BackPay() {

    const history = useHistory();

    const managerPad = useRef({});
    const [backPays, addBackPay] = useState([
        {
            in: '',
            left_lunch: '',
            return_lunch: '',
            out: '',
            dm: '',
            totalHours: '',
            comments: '',
            employeeName: '', 
            employeeNum: '',
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
        } else if (e.target.id === 'dm') {
            const list = [...backPays];
            list[0].dm = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === 'employeeNum') {
            const list = [...backPays];
            list[0].employeeNum = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === 'employeeName') {
            const list = [...backPays];
            list[0].employeeName = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === 'payMissed') {
            const list = [...backPays];
            list[0].comments = e.target.value;
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

    const clearPad = (e) => {
        e.preventDefault();
        managerPad.current.clear();
    }
    const onSubmit = e => {
        e.preventDefault();
        let rows = [];
        if (backPays.length === 1) {
            rows.push({
                in: backPays[0].in,
                left_lunch: backPays[0].left_lunch,
                return_lunch: backPays[0].return_lunch,
                out: backPays[0].out,
                dm: backPays[0].dm, 
                employeeName: backPays[0].employeeName, 
                employeeNum: backPays[0].employeeNum,
                comments: backPays[0].comments,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
            })
        } else {
            backPays.map((item, i) => {
                return rows.push({
                in: item.in,
                left_lunch: item.left_lunch,
                return_lunch: item.return_lunch,
                out: item.out,
                dm: backPays[0].dm, 
                employeeName: backPays[0].employeeName, 
                employeeNum: backPays[0].employeeNum,
                comments: backPays[0].comments,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
                });
            })
        }
    // On submit of the form, send a POST request with the data to the server.
    fetch('http://portal.cbmportal.com:5000/api/backpay', { 
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(rows),
        })
        .then(res => res.json())
        .then(data => {
            if (data.message) history.push('/success');
        })
        .catch((err) => {
            console.log(err);
        }) 
    }
        return (
            <div className="container">
                <h1 className="mainHeading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Back Pay</span></h1><br />
                    <form onSubmit={e => onSubmit(e)} className="mainForm">
                        <div className="wrapper1">
                            <div id="employeeInfo">
                                <label htmlFor="employeenum">Employee #:</label><br />
                                <input type="text" id="employeeNum" name="employeeNum" minLength="1" maxLength="6" required title="Please enter required information" onChange={e => handleInputChange(e)}/>
                            </div>
                            <div id="employeeInfo">
                                <label htmlFor="employeename"> Employee Name:</label>
                                <input type="text" id="employeeName" name="employeeName"  required title="Please enter required information" onChange={e => handleInputChange(e)}/>
                            </div>
                        </div>
                        <br /><br />
                        <div className="wrapper1">
                            <label htmlFor="dm">DM:</label><br />
                            <select id="dm" name="dm"  required title="Please select an option" onChange={e => handleInputChange(e)}>
                            <option>Select a DM</option>
                            <option value="Ausencio Cruz">Ausencio Cruz</option>
                            <option value="Cruz Hernandez">Cruz Hernandez</option>
                            <option value="Daniel De la Paz">Daniel De la Paz</option>
                            <option value="Lino Huerta">Lino Huerta</option>
                            <option value="Jose Lopez">Jose Lopez</option>
                            <option value="Zach Harlow">Zach Harlow"</option>
                            </select>
                        </div>
                        <div className="wrapper1">
                        { backPays.map((row, index) => { 
                            const incIndex = index + 1;
                            const inName =`In ${incIndex}`;
                            const left_lunchName = `Left for lunch ${incIndex}`;
                            const return_lunchName = `Return From Lunch ${incIndex}`;
                            const outName = `Out ${incIndex}`;
                            return (
                                <div key={index} id="backPays">
                                    <label htmlFor={inName}>{inName}</label><br />
                                    <input key={inName} type="datetime-local" id={inName} name={inName}  required title="Please enter required information" onChange={e => handleInputChange(e, index)} ></input><br />
                                    <label htmlFor={left_lunchName}>{left_lunchName}</label><br />
                                    <input key={left_lunchName} type="datetime-local" id={left_lunchName} name={left_lunchName}  required title="Please enter required information" onChange={e =>handleInputChange(e, index)}></input><br />
                                    <label htmlFor={return_lunchName}>{return_lunchName}</label><br />
                                    <input key={return_lunchName} type="datetime-local" id={return_lunchName} name={return_lunchName}  required title="Please enter required information" onChange={e => handleInputChange(e, index)}></input><br />
                                    <label htmlFor={outName}>{outName}</label><br />
                                    <input key={outName} type="datetime-local" id={outName} name={outName}  required title="Please enter required information" onChange={e => handleInputChange(e, index)}></input><br />
                                    {backPays.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="backPayRemoveButton">Remove</button>}
                                    {backPays.length - 1 === index && <button onClick={handleAddBackPay} id="backPayAddButton">Add Back Pay</button>}
                                </div>
                            );
                        })}
                        </div>
                        <br />
                        <div className="wrapper1">
                            <div id="missedReasonBox">
                                <label htmlFor="comments">Reason why this pay was missed:</label><br />
                                <textarea name="comments" id="payMissed" required title="Please enter required information" onChange={e => handleInputChange(e)}></textarea>
                            </div>
                        </div>
                        <div className="wrapper1">
                            <div id="signature">
                                <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(255, 255, 255, 1)', width: 400, height: 100, className: 'sigPad', id: 'sigPad'}} ref={managerPad} />
                                <br />
                                <button id="sigClear" onClick={e => clearPad(e)} type="button ">Clear</button>
                            </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <input type="submit" className="btn" />
                    </form>
            </div>
        )
}

export default BackPay;