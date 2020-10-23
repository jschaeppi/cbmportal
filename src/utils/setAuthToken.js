import axios from 'axios';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
    //axios.defaults.headers.common['auth-token'] = token;
    //axios.defaults.withCredentials = true;
}

export default setAuthToken;