import React, { Fragment, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';

const Logout = () => {

    const cbmContext = useContext(CbmContext);
    const history = useHistory();
    const { logout, loading } = cbmContext;
    useEffect(() => {
        logout();
    })
    if (!loading) {
        history.push('/login');
    }
    return (
        <Fragment>
            
        </Fragment>
    )
}

export default Logout;