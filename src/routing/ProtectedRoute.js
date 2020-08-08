import React, { useContext } from 'react';
import {Route, Redirect } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import Spinner from '../Components/SpinnerImage'

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const cbmContext = useContext(CbmContext);
    const { isAuthenticated, loading } = cbmContext;
    
    if (loading) {
        return <Spinner />
    } else {

    return (
        
        <Route { ...rest } render={props => !isAuthenticated && !loading ? (
            <Redirect to='/login' />
        ) : (
            
            <Component {...props } />
        )}>
        </Route>
        )
    }
}

export default ProtectedRoute;
