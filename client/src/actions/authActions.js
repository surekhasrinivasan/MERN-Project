import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
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
            // Set token to localStorage
            localStorage.setItem('jwtToken', token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
        }));
};