import React, { Component } from 'react'
//import axios from 'axios';
import '../css/login.css';
export class login extends Component {
    constructor() {
        super();
        this.state = {
            errorMessage: '',
        }
    }   
    
    onSubmit = (e) => {
        e.preventDefault();
        fetch('http://portal.cbmportal.com:5000/api/users/loginSub', { 
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({
                username: document.getElementById('user').value,
                password: document.getElementById('pass').value
            }),
           credentials: 'include',
            
    })
    .then(res => res.json())
    .then(msg => {
        console.log(msg)
        
        if (msg.user) {
            document.cookie = `session=${msg.session.passport}`;
            
        this.props.history.push('/');
        } else {
            this.setState({ errorMessage: 'Your username or password was invalid!'});
        }
    })
}


    render() {
        return (
            <div className="container">
                <div id="loginError">
                    <p>{this.state.errorMessage}</p>
                </div>
                <form onSubmit={this.onSubmit}>
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
export default login