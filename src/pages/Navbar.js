import React from 'react';
import '../css/NavBar.css';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
    <nav>
    <   div className="logo_con">
            <a href="/"><img src="./src/images/CBM-New-Logo.png" alt="CBM Logo"/></a>
            <a href="/" id="login">
                Login
            </a>
        </div>
        <div className="navbar">
            <ul >
                <li>
                    <Link to="/repair">Repair Request </Link> &nbsp; | &nbsp;
                </li>
                <li>
                <Link to="/propane">Propane Request</Link> &nbsp; | &nbsp;
                </li>
                <li>
                <Link to="/dustmop">Dust Mop Request </Link>&nbsp; | &nbsp;
                </li>
                <li>
                <Link to="/uniform">Uniform Order Form </Link>&nbsp; | &nbsp;
                </li>
                <li>
                <Link to="/targetorder">Target Supply Order </Link>&nbsp; | &nbsp;
                </li>
                <li>
                    Uniform Order Form &nbsp; | &nbsp;
                </li>
                <li>
                    Target Supply Order &nbsp; | &nbsp;
                </li>
                <li>
                    Propane Request &nbsp; | &nbsp;
                </li>
                <li>
                    Dust Mop Request &nbsp; | &nbsp;
                </li>
                <li>
                    Uniform Order Form &nbsp; | &nbsp;
                </li>
                <li>
                    Target Supply Order &nbsp; | &nbsp;
                </li>
                <li>
                    Nav5
                </li>
            </ul>
        </div>
    </nav>
        );
    }
}

export default NavBar;