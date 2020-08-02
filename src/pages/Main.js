import React, { Component } from 'react'
import '../css/main.css';
export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    /*static getDerivedStateFromProps(props, state) {
        if (props.isLogged !== state.loggedIn) {
            return { loggedIn: props.isLogged }
        }
    }*/

    logInCheck = () => {
        console.log(this.props.isLogged)
        if (this.props.isLogged === true) {

            return (
                <div>
                    <h1> HI Welcome</h1>
                </div>
                )
        }   else {
                this.props.history.push('login');
            }
    }
        
    render() {
        return (
            <div className="container" id="container">
                {this.logInCheck()}
            </div>
        )
    }
}

export default Main
