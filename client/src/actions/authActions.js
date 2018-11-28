import axios from 'axios';
import { GET_ERRORS } from './types';

// Register User (redux-thunk middleware is used)
export const registerUser =(userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('./login')) //console.log(res.data)
        .catch(err => 
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })      
        );
};
// Login - Get User Token
export const loginUser = userData => dispatch => {
    axios
        .post('./api/users/login', userData)
        .then(res => { 
            // Save to localStorage
            const { token } = res.data;
            // Sect token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};