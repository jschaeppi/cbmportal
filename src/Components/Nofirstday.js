import React, { useState } from 'react'

const Nofirstday = ({ onSubmit, user }) => {
    const [toggleRehire, setToggleRehire] = useState(true);

    const [data, setData] = useState([{
        rehire: '',
        firstName: '',
        employeeNum: '',
        dm: user,
        firstLast: '',
        secondLast: '',
        norehireReason: '',
        lastWorked: '',
    }]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(e, data);
}

        return (
            <div className="container">
                <h1 id="termHeading"><span>No Show/First Day</span></h1><br />
                <form onSubmit={e => handleSubmit(e)} id="termForm">
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
