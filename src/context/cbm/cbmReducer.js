import {
    GET_USER,
    GET_STORES,
    GET_AUTH,
    AUTH_ERROR,
    LOGIN_ERROR,
    GET_LOGOUT,
    ERROR_STORES,
    CLEAR_ERRORS,
    SET_LOADING,
    GET_STATES,
    GET_CITIES,
    ERROR_STATES,
} from '../types';

export default (state, action) => {
    switch(action.type) {

        case AUTH_ERROR:
        case LOGIN_ERROR:
        case GET_LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                errorMessage: action.payload,
                isAuthenticated: false,
                user: null,
                loading: false,
                token: null,
                stores: '',
                usstates: '',
            }
            case GET_AUTH:
                return {
                    ...state,
                    user: action.payload,
                    isAuthenticated: true,
                    loading: false,
                    token: localStorage.token,
                }
            case GET_USER:
                localStorage.setItem('token', action.payload);
                return {
                    ...state,
                    token: localStorage.token,
                    user: action.user,
                    isAuthenticated: true,
                    loading: false
                }
        case GET_STATES:
        
            return {
                ...state,
                usstates: action.payload,
                loading: false
            }

            case GET_CITIES:
                return {
                    ...state,
                    cities: action.payload,
                    loading: false
                }

        case GET_STORES:
            return {
                ...state,
                stores: action.payload,
                loading: false
            }
        case ERROR_STORES:
        case ERROR_STATES:
            return {
                ...state,
                errorMessage: action.payload,
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errorMessage: null,
            }
        case SET_LOADING:
        return {
                ...state,
                loading: true,
        }
        default: 
        return state;
    }
}