import React, { useState, useEffect, useContext, useRef} from 'react'
import {useHistory} from 'react-router-dom';
// import '../css/PTO.css';
import SignatureCanvas from 'react-signature-canvas'
import CbmContext from '../context/cbm/cbmContext';

const PTO = () => {
    
    const cbmContext = useContext(CbmContext);
    const { loginStatus, isAuthenticated, loading, user, formSubmit, success } = cbmContext;
    let body = '';
    const history = useHistory();
    const managerPad = useRef({});
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        // eslint-disable-next-line
    }, [])
    const [data, setData] = useState([{
        employeeNum: '',
        employeeName: '',
        dm: '',
        departments: '',
        absencefrom: '',
        absenceto: '',
        hours: '',
        approval: 'Approved',
        comments: '',
    }])
    const handleChange = (e) => {
        const { name, value } = e.target;
        const list = [...data];
           list[0][name] = value;
           setData(list);
    }

    const clearPad = (e) => {
        e.preventDefault();
        managerPad.current.clear();
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (managerPad.current.isEmpty()) {
            alert('Please provide a signature');
        } else {
            body = JSON.stringify({
                employeeNum: data[0].employeeNum,
                employeeName: data[0].employeeName,
                dm: user,
                departments: data[0].departments,
                absencefrom: data[0].absencefrom,
                absenceto: data[0].absenceto,
                hours: data[0].hours,
                approval: data[0].approval,
                comments: data[0].comments,
                sig: managerPad.current.getTrimmedCanvas().toDataURL('image/png'),
                })
                
                formSubmit(body, 'pto');
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
                <h1 className="mainHeading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>PTO</span></h1><br />
                <form onSubmit={e => onSubmit(e)} className="mainForm">
                    <div className="wrapper1">
                        <div>
                            <label forhtml="employeeNum">Employee #:</label>
                            <input type="number" id="ptoemployeeNum" name="employeeNum" maxLength="6" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                        </div>
                        <div>
                            <label forhtml="employeeName">Employee Name</label>
                            <input type="text" id="employeeName" name="employeeName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div>
                            <label forhtml="departments">Departments:</label>
                            <select id="departments" name="departments" required title="Please select an option" onChange={e => handleChange(e)}>
                                <option value="Service">Service</option>
                                <option value="Operations">Operations</option>
                                <option value="HR">HR</option>
                                <option value="Maintenance">Maintenance</option>
                            </select>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div>
                            <label forhtml="absencefrom">Absence From:</label><br />
                            <input type="date" id="absencefrom" name="absencefrom" maxLength="8" pattern="(?:(?:0[1-9]|1[0-2])[\/\\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[\/\\-. ]?30)|(?:(?:0[13578]|1[02])[\/\\-. ]?31))[\/\\-. ]?(?:19|20)[0-9]{2}
" required title="Please enter the required information" onChange={e => handleChange(e)} />
                        </div>
                        <div>
                            <label forhtml="absenceto">Absence To:</label><br />
                            <input type="date" id="absenceto" name="absenceto" maxLength="8" pattern="(?:(?:0[1-9]|1[0-2])[\/\\-. ]?(?:0[1-9]|[12][0-9])|(?:(?:0[13-9]|1[0-2])[\/\\-. ]?30)|(?:(?:0[13578]|1[02])[\/\\-. ]?31))[\/\\-. ]?(?:19|20)[0-9]{2}
" required title="Please enter the required information" onChange={e => handleChange(e)} />
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1" id="approval">
                        <div>
                            <label forhtml="hours">Enter hours:</label>
                            <input type="number" step="any" id="hours" name="hours" required title="Please enter the required information" onChange={e => handleChange(e)}></input>
                        </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                        <div id="sig">
                            <label >Manager Signature:</label><br />
                            <SignatureCanvas clearButton="true" penColor='black' canvasProps={{backgroundcolor: 'rgba(201, 200, 197, 1)', width: 400, height: 100, className: 'sigPad'}} ref={managerPad} />
                            <button id="sigClear" onClick={e => clearPad(e)} type="button ">Clear</button>
                        </div>
                    </div>
                    <br />
                    <br />
                    <br />
                    <div className="wrapper1">
                        <div id="ptoCommentsDiv">
                            <label forhtml="comments">Comments:</label><br />
                            <textarea id="ptocomments" name="comments" onChange={e => handleChange(e)}></textarea>
                        </div>
                    </div>
                    <br />
                    <input type="submit" className="btn" />
                    
                </form>
            </div>
        )
}

export default PTO
