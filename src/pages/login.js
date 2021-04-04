import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import Spinner from '../Components/SpinnerImage';
import '../css/login.css';
const Login = (props) => {
    const cbmContext = useContext(CbmContext);
    let history = useHistory();
    const { loginUser, isAuthenticated, loginStatus, clearErrors, user} = cbmContext;
    let { errorMessage, loading } = cbmContext;
    
    
    const onSubmit = (e) => {
        e.preventDefault();
        const user = document.getElementById('user').value.toLowerCase();
        const pass = document.getElementById('pass').value;
        if (loginUser(user, pass)) {
            history.push('/');
        }
}

        useEffect(() => {
                if (!isAuthenticated && user && !loading) {
                    if (loginStatus()) {
                        if (history.location.state) {
                        history.push(history.location.state.prevLocation);
                        } else {
                            history.push('/');
                        }
                    } else {
                        history.push('/login')
                    }
                }
            // eslint-disable-next-line
            }, [isAuthenticated]);
            if (loading) {
                return <Spinner />
            } else {

        return (
            
            <div className="container">
                <div id="loginError">
                    {errorMessage ? clearErrors() : errorMessage=''}<p>{errorMessage}</p>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="wrapper1" id="loginForm">
                        <label>Enter Username:</label>
                        <input type="text" name="userName" id="user"></input>
                    </div>
                     <div className="wrapper1" id="loginForm">
                        <label>Enter Password: </label>
                        <input type="password" name="password" id="pass" />
                    </div>
                    <div id="loginFormBtn">
                        <input type="submit" />
                        
                    </div>
                    
                </form>
            </div>
        )
    }
}
export default Login