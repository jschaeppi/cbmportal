import React from 'react';
import '../css/NavBar.css';
import { Link } from 'react-router-dom';
import Logo from '../images/CBM_Logo.png';

class NavBar extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            mobileLink: [<li><Link to="/repair" >Repair Request </Link></li>,<li><Link to="/propane">Propane Request</Link></li>,<li><Link to="/dustmop">Dust Mop Request </Link></li>,<li><Link to="/uniform">Uniform Order Form </Link></li>,<li><Link to="/backpay">BackPay </Link></li>,<li><Link to="/newhire">New Hire </Link></li>,<li><Link to="/bonus">Bonus </Link></li>,<li><Link to="/hotelrequest">Hotel Request </Link></li>,<li><Link to="/mileage">Mileage </Link></li>,<li><Link to="/perdiem">Per Diem </Link></li>,<li><Link to="/pto">PTO </Link></li>,<li><Link to="/term">Termination </Link></li>,<li><Link to="/timeadjustment">Time Adjustment </Link></li>,<li><Link to="/workticket">Work Ticket </Link></li>],
        }
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    toggleMenu = (e) => {
        e.preventDefault();
        this.setState({
            visible: !this.state.visible,
        });
    }
    
    render() {
        return (
            <nav>
                <div id="mobileMenu">
                    <button onClick={this.toggleMenu}><i className="fas fa-bars"></i></button>
                    <div id="mobileLinks" style={{display: this.state.visible ? 'block' : 'none' }}>
                        <ul className="linkGrid" onMouseLeave={this.toggleMenu}>
                            <div id="mobileLogin">
                                <Link to="/login">
                                    <i className="fas fa-user"></i>
                                </Link>
                            </div>
                        {this.state.mobileLink.map(link => {
                            return (
                                <div id="mobileNavLinks">       
                                    {link}
                                </div>
                            );
                        })}
                        </ul>
                    </div>
                </div>
                <div className="logo_con">
                    <a href="/" name="mainpage">
                        <img src={Logo} alt="CBM Logo" />
                    </a>
                </div>
                <div className="navbar" id="fullMenu">
                    <ul className="linkGrid">
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
                            <Link to="/backpay">BackPay </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/newhire">New Hire </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/bonus">Bonus </Link> &nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/hotelrequest">Hotel Request </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/mileage">Mileage </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/perdiem">Per Diem </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/pto">PTO </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/term">Termination </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/timeadjustment">Time Adjustment </Link>&nbsp; | &nbsp;
                        </li>
                        <li>
                            <Link to="/workticket">Work Ticket </Link>
                        </li>
                    </ul>
                </div>
                    
                <div id="login">
                    <Link to="/login">
                        <i className="fas fa-user"></i>
                    </Link>
                </div>
            </nav>
        );
    }
}

export default NavBar;