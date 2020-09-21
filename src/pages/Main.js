import React, {useContext, useEffect, Fragment } from 'react'
import '../css/main.css';
import CbmContext from '../context/cbm/cbmContext';

const Main = (props) => {
    const cbmContext = useContext(CbmContext);
    const { loginStatus, loading, isAuthenticated, getStores, getStates, user } = cbmContext;
    useEffect(() =>{
        if (!isAuthenticated && user && !loading) {
            loginStatus();
        }   
        if (!loading && user) {
        getStores(user.district);
        getStates();
        }

            

        
        // eslint-disable-next-line
    }, [])

        return (
            <Fragment>
                {(isAuthenticated && user) ? (
                <div style={{width: '200px', margin: '0 auto'}}>
                {`Welcome, ${user.userFirst} ${user.userLast}`}
                </div>) : ('')}
            </Fragment>
        )
}

export default Main