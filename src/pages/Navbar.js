import React, { Fragment, useContext, useState } from 'react';
import '../css/NavBar.css';
import { Link } from 'react-router-dom';
import Logo from '../images/CBM_Logo.png';
import CbmContext from '../context/cbm/cbmContext';

const NavBar = () => {
    const cbmContext = useContext(CbmContext);
    const { isAuthenticated, user, loading } = cbmContext;
    //const { district } = cbmContext.user;
    const [visible, setVisible] = useState(false);

    const toggleMenu = (e) => {
        setVisible(!visible);
    }
        const authLinks = (
                <Fragment>
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
                    {(user && !loading && isAuthenticated) ?
                    ((user.district.includes('MN Grocery-Retail')) || (user.district.includes('MN RETAIL DIST')) || (user.district.includes('MN Northern Dist'))) ?
                    <li>
                       <Link to="/mileage">Mileage </Link> 
                    </li>
                    : '':''}
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
                        <Link to="/targetOrder">Target Order </Link>
                    </li>
                    <li>
                        <Link to="/workticket">Work Ticket </Link>
                    </li>
                </Fragment>
             );

        const guestLinks = (
                <Fragment>
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
                                <br />
                                {(isAuthenticated && cbmContext.user.permission > 1) ? <a href="https://admin.cbmportal.com:5000/admin/dashboard">  <i className="fas fa-user-shield">Admin</i></a>: ""}
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
                        <br />
                        {(isAuthenticated && cbmContext.user.permission > 1) ? <a href="https://admin.cbmportal.com:5000/admin/dashboard">  <i className="fas fa-user-shield">Admin</i></a>: ""}
                </div>
            </nav>
        );
}

export default NavBar;