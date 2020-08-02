import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './pages/Navbar';
import NewHire from './pages/New_Hire';
import Main from './pages/Main';
import backPay from './pages/backPay';
import Bonus from './pages/Bonus';
import dustMop from './pages/dustMop';
import hotelRequest from './pages/hotelRequest';
import Mileage from './pages/Mileage';
import perDiem from './pages/perDiem';
import Propane from './pages/Propane';
import PTO from './pages/PTO';
import Repair from './pages/Repair';
import targetOrder from './pages/targetOrder';
import Term from './pages/Term';
import threeMonth from './pages/threeMonth';
import timeAdjustment from './pages/timeAdjustment';
import Uniform from './pages/Uniform';
import workTicket from './pages/workTicket';
import Success from './pages/success';
import Login from './pages/login';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loggedIn: true
    }
  }
  
  componentDidMount() {
    this.checkLoginStatus();
  }

  checkLoginStatus = () => {
    axios.get('http://portal.cbmportal.com:5000/api/users/loginSub', {credentials: true})
    .then (res => {
      if (res.data.session && this.state.loggedIn === false) {
        
        this.setState({
          user: res.data.session,
          loggedIn: true
        });
      } else if(!res.data.session && this.state.loggedIn === true) {
          this.setState({
            user: {},
            loggedIn: false,
          });
      } else {

      }
    })
    .catch(err => {
      console.log(err);
    })
  }

    render() {
      return (
        <div className="App">
          <NavBar isLogged={this.state.loggedIn}/>
        <Router />
          <Route exact path="/backPay" component={backPay} />
          <Route exact path="/bonus"   component={Bonus} />
          <Route exact path="/dustmop" component={dustMop} />
          <Route exact path="/hotelrequest" component={hotelRequest} />
          <Route exact path="/" render={(props)=> (
            <Main {...props} isLogged={this.state.loggedIn} />
          )} />
          <Route exact path="/mileage" component={Mileage} />
          <Route exact path="/newhire" component={NewHire} />
          <Route exact path="/perdiem" component={perDiem} />
          <Route exact path="/propane" component={Propane} />
          <Route exact path="/pto"     component={PTO} />
          <Route exact path="/repair"  component={Repair} />
          <Route exact path="/targetorder" component={targetOrder} />
          <Route exact path="/term"    component={Term} />
          <Route exact path="/threemonth" component={threeMonth} />
          <Route exact path="/timeadjustment" component={timeAdjustment} />
          <Route exact path="/uniform" component={Uniform} />
          <Route exact path="/workticket" component={workTicket} />
          <Route exact path="/success" component={Success} />
          <Route exact path="/login"   component={Login} />
        <Router />      
        </div>
      );
    }
}


export default App;
