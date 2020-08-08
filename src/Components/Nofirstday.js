import React, { useEffect, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';

const Nofirstday = () => {

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
        norehireReason: '',
        lastWorked: '',
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
                dm: data[0].dm,
                firstLast: data[0].firstLast,
                secondLast: data[0].secondLast,
                norehireReason: data[0].norehireReason,
                lastWorked: data[0].lastWorked,
            }),
            })
            .then(res => res.json())
            .then( data => {
                if (data.message) history.push('/success');
            })
            .catch(err => console.log(err))
}

        return (
            <div className="container">
                <h1 id="termHeading"><span>No Show/First Day</span></h1><br />
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
                    <div className="wrapper1" id="discipline">
                        <div>
                    <label >Eligible for rehire:</label><br /><br /><br />
                    <label htmlFor="yes_rehire" >Yes</label>&nbsp;
                    <input type="radio"  name="rehire" id="yes_rehire" value="yes" required title="Please enter the required information" onChange={e => noRehire(e)} />
                    &nbsp;|&nbsp;
                    <label htmlFor="no_rehire" >No</label>&nbsp;
                    <input type="radio"  name="rehire" id="no_rehire" value="no" required title="Please enter the required information" onChange={e => noRehire(e)} />
                    </div>
                    <div>
                    <label htmlFor="norehirereason" style={{visibility: toggleRehire ? "hidden":"visible"}}>Explain why to not rehire employee:</label>
                    <textarea name="norehireReason" id="norehireReason" style={{visibility: toggleRehire ? "hidden":"visible"}} onChange={e => handleChange(e)}></textarea>
                    </div>
                    </div>
                     <br /><br />
                    <input type="submit" className="btn" /> <input type="reset" className="btn" />
                </form>
            </div>
        );
}

export default Nofirstday
