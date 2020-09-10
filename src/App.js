import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './pages/Navbar';
import NotFound from './pages/NotFound'
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
import Term from './pages/Term';
import timeAdjustment from './pages/timeAdjustment';
import TargetOrder from './pages/targetOrder';
import Uniform from './pages/Uniform';
import workTicket from './pages/workTicket';
import Success from './pages/success';
import Login from './pages/login';
import Logout from './pages/Logout';
import ProtectedRoute from './routing/ProtectedRoute';

import CbmState from './context/cbm/cbmState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App = () => {
      return (
        <CbmState >
          <Router>
            <div className="App">
              <NavBar />
                <Switch>
                    <ProtectedRoute exact path="/backPay" component={backPay} />
                    <ProtectedRoute exact path="/bonus"   component={Bonus} />
                    <ProtectedRoute exact path="/dustmop" component={dustMop} />
                    <ProtectedRoute exact path="/hotelrequest" component={hotelRequest} />
                    <ProtectedRoute exact path="/" component={Main} />
                    <ProtectedRoute exact path="/mileage" component={Mileage} />
                    <ProtectedRoute exact path="/newhire" component={NewHire} />
                    <ProtectedRoute exact path="/perdiem" component={perDiem} />
                    <ProtectedRoute exact path="/propane" component={Propane} />
                    <ProtectedRoute exact path="/pto"     component={PTO} />
                    <ProtectedRoute exact path="/repair"  component={Repair} />
                    <ProtectedRoute exact path="/term"    component={Term} />
                    <ProtectedRoute exact path="/timeadjustment" component={timeAdjustment} />
                    <ProtectedRoute exact path="/targetorder" component={TargetOrder} />
                    <ProtectedRoute exact path="/uniform" component={Uniform} />
                    <ProtectedRoute exact path="/workticket" component={workTicket} />
                    <ProtectedRoute exact path="/success" component={Success} />
                    <ProtectedRoute exact path="/logout" component={Logout} />
                    <Route exact path="/login"  component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </div>
          </Router>  
        </CbmState>
      );
}


export default App;