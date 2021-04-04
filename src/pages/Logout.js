import React, { Fragment, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';

const Logout = () => {

    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { logout, loading, isAuthenticated } = cbmContext;
    useEffect(() => {
        logout();
    })
    if (!loading && !isAuthenticated) {
        history.push('/');
    }
    return (
        <Fragment>
            
        </Fragment>
    )
}

export default Logout;