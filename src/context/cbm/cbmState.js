import React, { useReducer } from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import CbmContext from './cbmContext';
import cbmReducer from './cbmReducer';
import GeoApi from '../../config/geoLocations.json'
import setAuthToken from '../../utils/setAuthToken';
//import setAuthToken from '../../utils/setAuthToken';
import {
    GET_USER,
    GET_AUTH,
    AUTH_ERROR,
    LOGIN_ERROR,
    GET_LOGOUT,
    GET_STORES,
    ERROR_STORES,
    CLEAR_ERRORS,
    SET_LOADING,
    GET_STATES, 
    GET_CITIES,
    ERROR_STATES,
} from '../types';

const CbmState = props => {
    const history = useHistory();
    const initialState = {
        stores: [],
        user: {},
        isAuthenticated: false,
        errorMessage: '',
        loading: false,
        cities: '',
        state: '',
    }

const [state, dispatch] = useReducer(cbmReducer, initialState);


    const clearErrors = () => {
        setTimeout(() => dispatch({ type: CLEAR_ERRORS, errorMessage: null}), 3000);
    }

    const getStates = async () => {
        const { GeoAPI } = GeoApi;
        try {
        const resp = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
            headers: {
                'Accept': 'application/json',
                'api-token': GeoAPI,
                'user-email': 'joseph.schaeppi@carlsonbuilding.com'
            },
        })
        
        const res = await axios.get("https://www.universal-tutorial.com/api/states/United States", {
            headers: {
                'Authorization': `Bearer ${resp.data.auth_token}`,
                'Accept': 'application/json'
            },
        })
        const not_states = ['Minnesota', 'Iowa', 'Illinois', 'Wisconsin', 'Nebraska', 'North Dakota', 'South Dakota'];
        
        let filtered_states = res.data.filter(id=> {
                return not_states.includes(id.state_name);
         })
        
            dispatch({
                type: GET_STATES,
                payload: filtered_states,
        })
        } 
        catch(err) {
            dispatch({
                type: ERROR_STATES,
                payload: err.response,
            })
        }
    }

    const getCities = async (usstate) => {
        const { GeoAPI } = GeoApi;
        try {
            const resp = await axios.get("https://www.universal-tutorial.com/api/getaccesstoken", {
                headers: {
                    'Accept': 'application/json',
                    'api-token': GeoAPI,
                    'user-email': 'joseph.schaeppi@carlsonbuilding.com'
                },
            })
            const res = await axios.get(`https://www.universal-tutorial.com/api/cities/${usstate}`, {
                headers: {
                    'Authorization': `Bearer ${resp.data.auth_token}`,
                    'Accept': 'application/json'
                },
            })
            console.log(res);
            dispatch({
                type: GET_CITIES,
                payload: res.data
            })
            } catch(err) {
                console.log(err);
            }

    }
    const getStores = async (district) => {
        try {
        const res = await axios.get(`https://portal.cbmportal.com:5000/api/stores/${district}`)
        dispatch({
            type: GET_STORES,
            payload: res.data,
        })
    } catch(err) {
        dispatch({
            type: ERROR_STORES,
            payload: err.response.data.msg
        })
    }
    } 
    const logout = () => {
        dispatch({
            type: GET_LOGOUT,
        });
        if (!state.loading) {
        history.push('/login');
        }
    }
//Get User
    const loginStatus = async (props, token) => {
        setLoading();
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
    try {
        

        const res = await axios.get('https://portal.cbmportal.com:5000/api/users/loginSub');

    dispatch({
        type: GET_AUTH,
        payload: res.data.user,

    });
    } 
    catch (err) {
        //console.log(err)
        dispatch({
            type: AUTH_ERROR,
            payload: err.response.data.msg,
        }) 
    }
  }

//Login User
        const loginUser = async (user, pass) => {
            setLoading();
            try {
        const res = await axios.post('https://portal.cbmportal.com:5000/api/users/loginSub', { 
            data: {
                username: user,
                password: pass,
            },
           credentials: 'include',
            
    })
        dispatch({
            type: GET_USER,
            payload: res.data.token,
            user: res.data.user,
        })

    } 
        
    catch (err) {
        //console.log(err.response.data.msg)
        dispatch({
            type: LOGIN_ERROR,
            payload: err.response.data.msg,
        }) 
        }
    }

    const setLoading = () => {
        dispatch({ type: SET_LOADING})
    }


return <CbmContext.Provider
    value={{
        user: state.user,
        stores: state.stores,
        errorMessage: state.errorMessage,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        token: state.token,
        cities: state.cities,
        usstates:state.usstates,
        loginUser,
        loginStatus,
        logout,
        getStores,
        clearErrors,
        getStates,
        getCities,
        setAuthToken,
    }}>
        {props.children}
</CbmContext.Provider>
}
export default CbmState;