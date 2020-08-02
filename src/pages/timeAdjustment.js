import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import '../css/timeAdjustment.css';
import { useHistory } from 'react-router-dom';
function TimeAdjustment() {

    const history = useHistory();
    const [adjustment, addTimeAdjustment] = useState([
        {
            in: '',
            out: '',
            break: '',
            date: '',
            employeeName: '',
            employeeNum: '',
            dm: '',
            noteAdjustment: '',
        }
    ]);
    
    const managerPad = useRef({});
    const employeePad = useRef({});
    const handleInputChange = (e, index) => {
        const incIndex = index + 1;
        if (e.target.id === `In ${incIndex}`) {
        const list = [...adjustment];
        list[index].in = e.target.value;
        addTimeAdjustment(list); 
        } else if (e.target.id === `Out ${incIndex}`) {
            const list = [...adjustment];
            list[index].out = e.target.value;
            addTimeAdjustment(list); 
        } else if (e.target.id === `Break ${incIndex}`) {
            const list = [...adjustment];
            list[index].break = e.target.value;
            addTimeAdjustment(list); 
        } else if (e.target.id === `Date ${incIndex}`) {
            const list = [...adjustment];
            list[index].date = e.target.value;
            addTimeAdjustment(list); 
        } else if (e.target.id === 'dm') {
            const list = [...adjustment];
            list[0].dm = e.target.value;
            addTimeAdjustment(list); 
        }else if (e.target.id === 'employeeName') {
            const list = [...adjustment];
            list[0].employeeName = e.target.value;
            addTimeAdjustment(list); 
        } else if (e.target.id === 'timeEmployeeNum') {
            const list = [...adjustment];
            list[0].employeeNum = e.target.value;
            addTimeAdjustment(list); 
        } else if (e.target.id === 'noteAdjustment') {
            const list = [...adjustment];
            list[0].noteAdjustment = e.target.value;
            addTimeAdjustment(list); 
        }
    }
    const handleTimeAdjustment = (e) => {
        e.preventDefault();
        const list = [...adjustment];
        list.push({
            in: '',
            out: '',
            break: '',
            date: '',
        })
        addTimeAdjustment(list);
    }
    const handleRemoveRow = (e, index) => {
        e.preventDefault();
        const list = [...adjustment];
        list.splice(index,1)
        addTimeAdjustment(list)
    }

    const clear = (e) => {
        managerPad.current.clear();
        employeePad.current.clear();
    }

    const onSubmit = e => {
        e.preventDefault();
        let rows = [];
        if (adjustment.length === 1) {
            rows.push({
                in: adjustment[0].in,
                break: adjustment[0].break,
                out: adjustment[0].out,
                dm: adjustment[0].dm, 
                employeeName: adjustment[0].employeeName, 
                employeeNum: adjustment[0].employeeNum,
                noteAdjustment: adjustment[0].noteAdjustment,
                managerSig: managerPad.current.getTrimmedCanvas().toDataURL("image/png"),
                employeesig: employeePad.current.getTrimmedCanvas().toDataURL("image/png")
            })
        } else {
            adjustment.map((item, i) => {
                return rows.push({
                in: item.in,
                break: item.break,
                out: item.out,
                dm: adjustment[0].dm, 
                employeeName: adjustment[0].employeeName, 
                employeeNum: adjustment[0].employeeNum,
                noteAdjustment: adjustment[0].noteAdjustment,
                managerSig: managerPad.current.getTrimmedCanvas().toDataURL("image/png"),
                employeesig: employeePad.current.getTrimmedCanvas().toDataURL("image/png")
                });
            })
        }
        console.log(rows);  
    // On submit of the form, send a POST request with the data to the server.
    fetch('http://portal.cbmportal.com:5000/api/timeAdjustment', { 
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(rows),
        })
        .then(res => res.json())
        .then(data => {
        console.log(data.message);
        
        history.push('/success');
            //showSuccess(data)
        }).catch((err) => {
        console.log(err);
    }) 
        }
        return (
            <div className="container">
                <h1 className="mainHeading"><span>Time Adjustment</span></h1><br />
                <form onSubmit={e => onSubmit(e)} className="mainForm">
                    <div className="wrapper1">
                        <div>
                        <label htmlFor="employeename"> Employee Name:</label>
                        <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                        </div>
                        <div>
                        <label htmlFor="employeenum">Employee #:</label>
                        <input type="number" id="timeEmployeeNum" name="employeeNum" maxLength="6"required title="Please enter the required information" onChange={e => handleInputChange(e)}/>
                        </div>
                    </div>
                <br /><br />
                <div className="wrapper1">
                    <label htmlFor="dm">DM:</label><br />
                    <select id="dm" name="dm" required title="Please select an option" onChange={e => handleInputChange(e)}>
                    <option>Select a DM</option>
                    <option value="Ausencio Cruz">Ausencio Cruz</option>
                    <option value="Cruz Hernandez">Cruz Hernandez</option>
                    <option value="Daniel De la Paz">Daniel De la Paz</option>
                    <option value="Lino Huerta">Lino Huerta</option>
                    <option value="Jose Lopez">Jose Lopez</option>
                    <option value="Zach Harlow">Zach Harlow"</option>
                    </select>
                </div><br /><br />
                <div className="wrapper1">
                { adjustment.map((row, index) => { 
                        const incIndex = index + 1;
                        const inName =`In ${incIndex}`;
                        const breakhName = `Break ${incIndex}`;
                        const dateName = `Date ${incIndex}`;
                        const outName = `Out ${incIndex}`;
                        return (
                            <div key={index} id="adjustments">
                                <label htmlFor={dateName}>{dateName}</label><br />
                                <input key={dateName} type="date" id={dateName} name={dateName} required title="Please enter the required information" onChange={e => handleInputChange(e, index)} ></input><br />
                                <label htmlFor={inName}>{inName}</label><br />
                                <input key={inName} type="datetime-local" id={inName} name={inName} required title="Please enter the required information" onChange={e => handleInputChange(e, index)} ></input><br />
                                <label htmlFor={outName}>{outName}</label><br />
                                <input key={outName} type="datetime-local" id={outName} name={outName} required title="Please enter the required information" onChange={e => handleInputChange(e, index)}></input><br />
                                <label htmlFor={breakhName}>{breakhName}</label><br />
                                <input key={breakhName} type="number" step="any" id={breakhName} name={breakhName} required title="Please enter the required information" onChange={e =>handleInputChange(e, index)}></input><br />
                                {adjustment.length !== 1 && <button onClick={e => handleRemoveRow(e,index)} id="timeadjustmentRemoveButton">Remove</button>}
                                {adjustment.length - 1 === index && <button onClick={handleTimeAdjustment} id="timeadjustmentAddButton">Add Time Adjustment</button>}
                            </div>
                        );
                    })}
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div id="reasonMissedDiv">
                <label id="reasonMissedLabel">Reason why this pay was missed:</label>
                <textarea id="noteAdjustment" required title="Please enter the required information" onChange={e => handleInputChange(e)}></textarea>
                </div>
                </div>
                <br /><br />
                <div className="wrapper1">
                    <div id="signPad">
                        <label >Employee Signature:</label><br />
                        <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(201, 200, 197, 1)', width: 400, height: 100, className: 'sigPad'}} ref={employeePad} />
                    <button id="sigClear" onClick={e => clear(e)} type="button ">Clear</button>
                    </div>
                    <div id="signPad">
                        <label >Manager Signature:</label><br />
                        <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(201, 200, 197, 1)', width: 400, height: 100, className: 'sigPad'}} ref={managerPad} />
                    <button id="sigClear" onClick={e => clear(e)} type="button ">Clear</button>
                    </div>
                </div>
                    <br /><br /><br />
                <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
}

export default TimeAdjustment;
