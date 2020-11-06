import React, { useState, useRef, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
//import SignatureCanvas from 'react-signature-canvas'
import SigPad from '../Components/sigPad';
import '../css/backPay.css';
import CbmContext from '../context/cbm/cbmContext';
function BackPay() {
    const cbmContext = useContext(CbmContext);
        const { loginStatus, isAuthenticated, loading, user, formSubmit, success } = cbmContext;
        let body = '';
        useEffect(() => {
            if (!isAuthenticated && !loading) {
            loginStatus();
            }
            // eslint-disable-next-line
        }, [])
    const history = useHistory();

    const managerPad = useRef({});
    const [backPays, addBackPay] = useState([
        {
            in: '',
            left_lunch: '',
            return_lunch: '',
            out: '',
            dm: '',
            payMissed: '',
            employeeName: '', 
            employeeNum: '',
        }
    ]);

    const handleInputChange = (e, index) => {
        const id = e.target.id;
        const list = [...backPays];
        const incIndex = index + 1;
        if (e.target.id === `In ${incIndex}`) {
            list[index].in = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === `Left for lunch ${incIndex}`) {
            list[index].left_lunch = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === `Return From Lunch ${incIndex}`) {
            list[index].return_lunch = e.target.value;
            addBackPay(list); 
        } else if (e.target.id === `Out ${incIndex}`) {
            list[index].out = e.target.value;
            addBackPay(list); 
          
        } else {
            list[0][id] = e.target.value;
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
        document.getElementById('heading').innerHTML = '<br /> <p>Your submission is processing';
        let rows = [];
        if (managerPad.current.isEmpty()) {
            alert('Please provide a signature');
        } else {
        if (backPays.length === 1) {
            rows.push({
                in: backPays[0].in,
                left_lunch: backPays[0].left_lunch,
                return_lunch: backPays[0].return_lunch,
                out: backPays[0].out,
                dm: user, 
                employeeName: backPays[0].employeeName, 
                employeeNum: backPays[0].employeeNum,
                comments: backPays[0].payMissed,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
            })
        } else {
            backPays.map((item, i) => {
                return rows.push({
                in: item.in,
                left_lunch: item.left_lunch,
                return_lunch: item.return_lunch,
                out: item.out,
                dm: user, 
                employeeName: backPays[0].employeeName, 
                employeeNum: backPays[0].employeeNum,
                comments: backPays[0].payMissed,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
                });
            })
        }
    // On submit of the form, send a POST request with the data to the server.

        body = JSON.stringify(rows)
        formSubmit(body, 'backpay');
        if (success && !loading) {
            console.log('I\'m redirecting');
            console.log(success);
            history.push('/success');
        } else {
            history.push('/')
        }
    }
    }
        return (
            <div className="container">
                <h1 className="mainHeading" id="heading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Back Pay</span></h1><br />
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
                        { backPays.map((row, index) => { 
                            const incIndex = index + 1;
                            const inName =`In ${incIndex}`;
                            const left_lunchName = `Left for lunch ${incIndex}`;
                            const return_lunchName = `Return From Lunch ${incIndex}`;
                            const outName = `Out ${incIndex}`;
                            return (
                                <div key={index} id="backPays">
                                    <label htmlFor={inName}>{inName}</label><br />
                                    <input key={inName} type="datetime-local" id={inName} name={inName} title="Please enter required information" onChange={e => handleInputChange(e, index)} ></input><br />
                                    <label htmlFor={left_lunchName}>{left_lunchName}</label><br />
                                    <input key={left_lunchName} type="datetime-local" id={left_lunchName} name={left_lunchName} onChange={e =>handleInputChange(e, index)}></input><br />
                                    <label htmlFor={return_lunchName}>{return_lunchName}</label><br />
                                    <input key={return_lunchName} type="datetime-local" id={return_lunchName} name={return_lunchName} onChange={e => handleInputChange(e, index)}></input><br />
                                    <label htmlFor={outName}>{outName}</label><br />
                                    <input key={outName} type="datetime-local" id={outName} name={outName}  title="Please enter required information" onChange={e => handleInputChange(e, index)}></input><br />
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
                                <SigPad sigPad={managerPad} clearPad={e => clearPad(e)} />
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