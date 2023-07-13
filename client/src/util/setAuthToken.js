import axios from 'axios';

//set a default token to add to axios requests

const setAuthToken = (token) => {
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axios.defaults.headers.common['x-auth-token']
    }
};

export default setAuthToken;