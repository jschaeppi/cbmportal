import React, { useEffect, useContext, useState } from 'react'
import Nocall from '../Components/Nocall';
import Quit from '../Components/Quit';
import Nofirstday from '../Components/Nofirstday';
import Other from '../Components/Other';
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
// import '../css/term.css';

const Term = () => {
    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { loginStatus, isAuthenticated, loading, formSubmit, success, user} = cbmContext;
    let body = '';
    const [termtype, settermtype] = useState('');

    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        // eslint-disable-next-line
    }, [])

    let onSubmit = (e, data) => {
        e.preventDefault();
            body = JSON.stringify(data)
            formSubmit(body, 'term');
            if (success && !loading) {
                history.push('/success');
            } else {
                history.push('/')
            }
    }
    
        const component = termtype;
        if (!component) {
            return (
                <div id="selectTerm">
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={e => { settermtype(e.target.value) }}>
                        <option value=''>Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    <div id="noTermForm">
                        No Termination form was selected
                    </div>
                </div>
            )
        } else if (component === "quit" ) {
            return (
                <React.Fragment>
                <div id="selectTerm">
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={e => { settermtype(e.target.value) }}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                </div>
                
                    <div>
                    <Quit onSubmit={onSubmit} user={user} />
                    </div>
               </React.Fragment>
            )
        }   
        else if (component === "nocall" ) {
            return (
                <React.Fragment>
                <div id="selectTerm">
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={e => { settermtype(e.target.value) }}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                </div>
                <div>
                        <Nocall onSubmit={onSubmit} user={user} />
                    </div>
             </React.Fragment>
            )
        }   
        else if (component === "noFirstDay" ) {
            return (
                <React.Fragment>
                <div id="selectTerm">
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={e => { settermtype(e.target.value) }}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    
                </div>
                <div>
                <Nofirstday onSubmit={onSubmit} user={user} />
            </div>
            </React.Fragment>
            )
        }   
        else if (component === "other" ) {
            return (
                <React.Fragment>
                <div id="selectTerm">
                    <p>Select Termination Type:</p>
                    <select id="termtype" onChange={e => { settermtype(e.target.value) }}>
                        <option >Select Term Type</option>
                        <option value="quit">Quit</option>
                        <option value="nocall">No Call/No Show</option>
                        <option value="noFirstDay">No Show First Day</option>
                        <option value="other">Other Reason</option>
                    </select>
                    
                </div>
                <div>
                <Other onSubmit={onSubmit} user={user} />
            </div>
            </React.Fragment>
            )
        }   
    }

export default Term
