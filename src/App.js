import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
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

function App() {
  return (
      <div className="App">
          <NavBar />
      <Router />
          <Route exact path="/backPay" component={backPay} />
          <Route exact path="/bonus" component={Bonus} />
          <Route exact path="/dustmop" component={dustMop} />
          <Route exact path="/hotelrequest" component={hotelRequest} />
          <Route exact path="/" component={Main} />
          <Route exact path="/mileage" component={Mileage} />
          <Route exact path="/newhire" component={NewHire} />
          <Route exact path="/perdiem" component={perDiem} />
          <Route exact path="/propane" component={Propane} />
          <Route exact path="/pto" component={PTO} />
          <Route exact path="/repair" component={Repair} />
          <Route exact path="/targetorder" component={targetOrder} />
          <Route exact path="/term" component={Term} />
          <Route exact path="/threemonth" component={threeMonth} />
          <Route exact path="/timeadjustment" component={timeAdjustment} />
          <Route exact path="/uniform" component={Uniform} />
          <Route exact path="/workticket" component={workTicket} />
      <Router />      
    </div>
  );
}

export default App;
