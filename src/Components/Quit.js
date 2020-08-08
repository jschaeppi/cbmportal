import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';

const Quit = () => {

    const history = useHistory();
    const cbmContext = useContext(CbmContext);
    const {loginStatus, isAuthenticated, loading} = cbmContext;
    const { userFirst, userLast } = cbmContext.user;
    const [toggleRehire, setToggleRehire] = useState(true);
    const [data, setData] = useState([{
        rehire: '',
        firstName: '',
        employeeNum: '',
        dm: `${userFirst} ${userLast}`,
        firstLast: '',
        secondLast: '',
        twoWeeks: '',
        norehireReason: '',
        lastWorked: '',
        quitReason: '',
    }]);
    useEffect(() => {
        if (!isAuthenticated && !loading) {
        loginStatus();
        }
        // eslint-disable-next-line
    }, [])
    const noRehire = (e) => {
        const { name, value } = e.target;
        const list = [...data];
            list[0][name] = value;
            setData(list);
            setToggleRehire((value === "yes") ? true:false);
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        const list = [...data];
        list[0][name] = value;
        setData(list);
    }

    const onSubmit = (e) => {
        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }
        e.preventDefault();
            
            fetch('http://portal.cbmportal.com:5000/api/quit/', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                rehire: data[0].rehire,
                firstName: data[0].firstName,
                employeeNum: data[0].employeeNum,
                dm: `${userFirst} ${userLast}`,
                firstLast: data[0].firstLast,
                secondLast: data[0].secondLast,
                twoWeeks: data[0].twoWeeks,
                norehireReason: data[0].norehireReason,
                lastWorked: data[0].lastWorked,
                quitReason: data[0].quitReason,
            })
            })
            .then(res => res.json())
            .then( data => {
                if (data.message) history.push('/success');
            })
            .catch(err => console.log(err))
}
        return (
            <div className="container">
                <h1 id="termHeading">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>Quit</span></h1><br />
                <form onSubmit={e => onSubmit(e)} id="termForm">
                <div className="wrapper1">
                <div>
                    <label forhtml="employeenum">Employee #:</label><br />
                    <input type="text" id="employeeNum" name="employeeNum" maxLength="6" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                    </div>
                    <div>
                    <label forhtml="firstLastName">EE Last Name</label>
                    <input type="text" id="firstLastName" name="firstLast" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                    </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">  
                    <div>
                    <label forhtml="secondLastName">EE Second Last Name:</label>
                    <input type="text" id="secondLastName" name="secondLast" onChange={e => handleChange(e)}/>
                    </div> 
                    <div>
                    <label forhtml="firstname">EE First Name:</label>
                    <input type="text" id="firstName" name="firstName" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                    </div>
                    </div><br /><br />
                    <div className="wrapper1">
                    <div>
                    <label forhtml="lastWorked">Last day worked:</label>
                    <input type="date" id="lastWorked" name="lastWorked" required title="Please enter the required information" onChange={e => handleChange(e)} />
                    
                    </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                    <div id="discipline">
                    <label >Was two week notice given:?</label><br /><br />
                    <label htmlFor="twoWeeks" >Yes</label>&nbsp;
                    <input type="radio" name="twoWeeks" id="yes_twoWeeks" value="yes" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                    &nbsp;|&nbsp;
                    <label htmlFor="twoWeeks" >No</label>&nbsp;
                    <input type="radio" name="twoWeeks" id="tno_twoWeeks" value="no" required title="Please enter the required information" onChange={e => handleChange(e)}/>
                    </div>
                    <div id="discipline">
                    <label >Eligible for rehire:</label><br /><br /><br />
                    <label htmlFor="yes_rehire" >Yes</label>
                    <input type="radio"  name="rehire" id="yes_rehire" value="yes" required title="Please enter the required information" onChange={e => noRehire(e)}/>
                    &nbsp;|&nbsp;
                    <label htmlFor="no_rehire" >No</label>&nbsp;
                    <input type="radio"  name="rehire" id="no_rehire" value="no" required title="Please enter the required information" onChange={e => noRehire(e)}/>
                    </div>
                    </div>
                    <br /><br />
                    <div className="wrapper1">
                    <div>
                    <label htmlFor="norehirereason" style={{visibility: toggleRehire ? "hidden":"visible"}}>Explain why not to re-hire this EE:</label>
                    <textarea name="norehireReason" id="norehireReason" style={{visibility: toggleRehire ? "hidden":"visible"}} onChange={e => handleChange(e)}></textarea>
                    </div>
                    <div>
                    <label htmlFor="quitReason">Employee reason for quitting:</label>
                    <textarea name="quitReason" id="quitReason" required title="Please enter the required information" onChange={e => handleChange(e)}></textarea>
                    </div>
                    </div>
                    <br /><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        )
}

export default Quit
