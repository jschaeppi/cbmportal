import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './Components/Navbar';
import Main from './pages/Main';
import Success from './pages/success';
import Logout from './pages/Logout';
import NotFound from './pages/NotFound'
import Login from './pages/login';
import ProtectedRoute from './routing/ProtectedRoute';
import { routes } from './routing/routes';

import CbmState from './context/cbm/cbmState';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const routeComponents = routes.map(({path, component}, key) => <ProtectedRoute exact path={path} component={component} key={key}/>)
      return (
        <CbmState >
          <Router>
            <div className="App">
              <NavBar />
                <Switch>
                    {routeComponents}
                    <ProtectedRoute exact path="/" component={Main} />
                    <ProtectedRoute exact path="/logout" component={Logout} />
                    <ProtectedRoute exact path="/success" component={Success} />
                    <Route exact path="/login"  component={Login} />
                    <Route component={NotFound} />
                </Switch>
            </div>
          </Router>  
        </CbmState>
      );
}


export default App;