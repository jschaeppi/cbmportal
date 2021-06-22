import React, {useContext, useEffect, Fragment } from 'react'
// import '../css/main.css';
import CbmContext from '../context/cbm/cbmContext';

const Main = (props) => {
    const cbmContext = useContext(CbmContext);
    const { loginStatus, loading, isAuthenticated, getStores, getStates, user, success, clearSuccess } = cbmContext;
    let { successMessage } = cbmContext;
    
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
                <div style={{width: '500px', textAlign: 'center', margin: '0 auto'}}>
                    {(success && !loading) ? (clearSuccess()):(' ')}<p>{successMessage}</p>
                    <h2>{`Welcome, ${user.userFirst} ${user.userLast}`}</h2>
                </div>) : ('')}
            </Fragment>
        )
}

export default Main