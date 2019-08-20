import Axios from 'axios';
import {
    USER_LOGIN_ERROR,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_LOADING
} from './types';
import { URL_API } from '../../helpers/Url_API';

export const onUserRegister = (objUserReg) => {
    var {
        username, 
        password, 
        confPassword, 
        FirstName, 
        LastName, 
        email, 
        address, 
        UserImage } = objUserReg;
    
    return (dispatch) => {
        dispatch({type: USER_LOGIN_LOADING});
        if (username === '' ||
            password === '' ||
            confPassword === '' ||
            FirstName === '' ||
            LastName === '' ||
            email === '' ||
            address === '' ||
            UserImage === '' ) {

                dispatch({type: USER_LOGIN_ERROR, payload: {
                    error: 'Semua Form Input Harus Diisi',
                }})
            }
        
            if(!(password === confPassword)) {
                dispatch({ type: USER_LOGIN_ERROR, payload: {
                    error: 'Password dan Confirmation Password Harus Sama',
                } })
            }
    }      
}