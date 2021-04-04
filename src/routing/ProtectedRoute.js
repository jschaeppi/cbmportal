import React, { useContext } from 'react';
import {Route, Redirect } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import Spinner from '../Components/SpinnerImage'

const ProtectedRoute = ({ component: Component, path, ...rest }) => {

    const cbmContext = useContext(CbmContext);
    const { isAuthenticated, loading } = cbmContext;
    if (loading) {
        return <Spinner />
    } else {
    return (
        <Route path={path} { ...rest } render={ props => (isAuthenticated && !loading) ? (
            <Component {...props } />
        ) : (
            <Redirect to={{
                pathname: '/login', 
                state: {
                    prevLocation: path
                }
            }}/>

        )}>
        </Route>
        )
    }
}

export default ProtectedRoute;
