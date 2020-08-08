import React, {useContext, useEffect, Fragment } from 'react'
import '../css/main.css';
import CbmContext from '../context/cbm/cbmContext';

const Main = (props) => {
    const cbmContext = useContext(CbmContext);
    const { loginStatus, loading, isAuthenticated, getStores, getStates } = cbmContext;
    const { userFirst, userLast, district } = cbmContext.user;
    
    useEffect(() =>{
        if (!isAuthenticated && !loading) {
            loginStatus();
        }   
        if (!loading) {
        getStores(district);
        getStates();
        }

            

        
        // eslint-disable-next-line
    }, [])

        return (
            <Fragment>
                <div style={{width: '200px', margin: '0 auto'}}>
                {`Welcome, ${userFirst} ${userLast}`}
                </div>
            </Fragment>
        )
}

export default Main
