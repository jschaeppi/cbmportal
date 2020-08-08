import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import Spinner from '../Components/SpinnerImage';
import '../css/login.css';
const Login = (props) => {
    const cbmContext = useContext(CbmContext);
    const history = useHistory();

    const { loginUser, isAuthenticated, loginStatus, clearErrors} = cbmContext;
    let { errorMessage, loading } = cbmContext;
    const onSubmit = (e) => {
        e.preventDefault();
        const user = document.getElementById('user').value.toLowerCase();
        const pass = document.getElementById('pass').value;
        loginUser(user, pass)
            console.log('I\'m Redirecting')
            if (!loading) {
            history.push('/')
            }
}

        useEffect(() => {
            
            if (isAuthenticated) {
                history.push('/');
            } else if (!isAuthenticated && localStorage.token && !loading) {
                    loginStatus();
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