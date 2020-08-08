import React, { Fragment, useContext, useState } from 'react';
import '../css/NavBar.css';
import { Link } from 'react-router-dom';
import Logo from '../images/CBM_Logo.png';
import CbmContext from '../context/cbm/cbmContext';

const NavBar = () => {
    const cbmContext = useContext(CbmContext);
    const { isAuthenticated } = cbmContext;
    const [visible, setVisible] = useState(false);

    const toggleMenu = (e) => {
        setVisible(!visible);
    }
        const authLinks = (
                <Fragment>
                    <li>
                        <Link to="/repair">Repair Request</Link>
                    </li>
                    <li>
                        <Link to="/propane">Propane Request</Link>
                    </li>
                    <li>
                        <Link to="/dustmop">Dust Mop Request </Link>
                    </li>
                    <li>
                        <Link to="/uniform">Uniform Order Form </Link>
                    </li>
                    <li>
                        <Link to="/backpay">BackPay </Link>
                    </li>
                    <li>
                        <Link to="/newhire">New Hire </Link>
                    </li>
                    <li>
                        <Link to="/bonus">Bonus </Link>
                    </li>
                    <li>
                        <Link to="/hotelrequest">Hotel Request </Link>
                    </li>
                    <li>
                        <Link to="/mileage">Mileage </Link>
                    </li>
                    <li>
                        <Link to="/perdiem">Per Diem </Link>
                    </li>
                    <li>
                        <Link to="/pto">PTO </Link>
                    </li>
                    <li>
                        <Link to="/term">Termination </Link>
                    </li>
                    <li>
                        <Link to="/timeadjustment">Time Adjustment </Link>
                    </li>
                    <li>
                        <Link to="/workticket">Work Ticket </Link>
                    </li>
                </Fragment>
             );

        const guestLinks = (
                <Fragment>
                    <li>
                    <Link to="/repair">Repair Request</Link>
                    </li>
                    <li>
                        <Link to="/propane">Propane Request</Link>
                    </li>
                    <li>
                        <Link to="/dustmop">Dust Mop Request </Link>
                    </li>
                    <li>
                        <Link to="/uniform">Uniform Order Form </Link>
                    </li>
                </Fragment>
            );

        return (
            <nav>
                <div id="mobileMenu">
                    <button onClick={e => toggleMenu(e)}><i className="fas fa-bars"></i></button>
                        <div id="mobileLinks" onMouseLeave={e => toggleMenu(e)}>
                            <ul className="linkGrid" style={{display: visible ? 'block' : 'none' }}>
                                <div id="mobileLogin" >
                                {isAuthenticated ? <Link to="/logout">  <i className="fas fa-sign-out-alt">Logout</i></Link>: <Link to="/login"><i className="fas fa-sign-in-alt">Login</i></Link>}
                                </div>
                                {isAuthenticated ? authLinks : guestLinks}
                            </ul>
                        </div>
                </div>
                <div className="logo_con">
                    <Link to="/">
                        <img src={Logo} alt="CBM Logo" />
                    </Link>
                </div>
                <div className="navbar" id="fullMenu">
                    <ul className="linkGrid">
                        {isAuthenticated ? authLinks : guestLinks}      
                    </ul>
                </div>
                    
                <div id="login">
                        {isAuthenticated ? <Link to="/logout">  <i className="fas fa-sign-out-alt">Logout</i></Link>: <Link to="/login"><i className="fas fa-sign-in-alt">Login</i></Link>}
                </div>
            </nav>
        );
}

export default NavBar;