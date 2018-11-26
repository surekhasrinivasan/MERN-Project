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