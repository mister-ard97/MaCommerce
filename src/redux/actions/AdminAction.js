import Axios from 'axios';
import {
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT,
    VERIFICATION_SUCCESS,
    VERIFICATION_FAILED, 
    CLEAN_ERROR
} from './types';
import { URL_API } from '../../helpers/Url_API';

export const adminRegister = (data) => {
    let {
        username,
        password,
        confPassword,
        FirstName,
        LastName,
        email,
        address
    } = data

    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        if (!(password === confPassword)) {
            dispatch({
                type: AUTH_LOGIN_ERROR, payload: {
                    error: 'Password dan Confirmation Password Harus Sama',
                }
            })
        }

        if (username === '' ||
            password === '' ||
            confPassword === '' ||
            FirstName === '' ||
            LastName === '' ||
            email === '' ||
            address === '') {

            dispatch({
                type: AUTH_LOGIN_ERROR, payload: {
                    error: 'Semua Form Input Harus Diisi',
                }
            })

        } else {

            delete data.confPassword;

            Axios.post(URL_API + '/admin/adminRegister', data)
                .then((res) => {
                    let { FirstName, LastName, username, email, token, status, role } = res.data
                    localStorage.setItem('token', token);
                    dispatch({
                        type: USER_LOGIN_SUCCESS, payload: {
                            FirstName,
                            LastName,
                            username,
                            email,
                            token,
                            status,
                            role,
                            justRegister: true,
                            loginChecked: true,
                            NextPage: true
                        }
                    })
                })
                .catch((err) => {
                    dispatch({
                        type: AUTH_LOGIN_ERROR, payload: {
                            error: err.response.data.message,
                        }
                    })
                })
        }
    }      
}

export const adminLogin = (username, password) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });

        Axios.post(URL_API + '/admin/adminLogin', {
            username, password
        })
            .then((res) => {
                let { FirstName, LastName, username, email, token, status, role } = res.data
                localStorage.setItem('token', token);
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: {
                        FirstName,
                        LastName,
                        username,
                        email,
                        token,
                        status,
                        role,
                        loginChecked: true
                    }
                })
            })
            .catch((err) => {
                dispatch({
                    type: AUTH_LOGIN_ERROR, payload: {
                        error: err.response.data.message,
                    }
                })
            })
    }
}


export const resendAdminEmailVerification = (username, email) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        const token = localStorage.getItem('token');
        Axios.post(URL_API + '/admin/adminResendEmailVerification', {
            username,
            email,
            token
        })
            .then((res) => {
                let { FirstName, LastName, username, email, token, status, role } = res.data
                localStorage.setItem('token', token);
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: {
                        FirstName,
                        LastName,
                        username,
                        email,
                        token,
                        status,
                        role,
                        justRegister: true,
                        loginChecked: true
                    }
                })
                dispatch({ type: VERIFICATION_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: VERIFICATION_FAILED });
            })
    }
}

export const adminEmailVerification = (req, res) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        Axios.put(URL_API + '/admin/adminEmailVerification', { token }, options)
            .then((res) => {
                let { FirstName, LastName, username, email, token, status, role } = res.data
                localStorage.setItem('token', token);
                dispatch({
                    type: USER_LOGIN_SUCCESS, payload: {
                        FirstName,
                        LastName,
                        username,
                        email,
                        token,
                        status,
                        role,
                        justRegister: true,
                        loginChecked: true
                    }
                })
                dispatch({ type: VERIFICATION_SUCCESS });
            })
            .catch((err) => {
                dispatch({ type: VERIFICATION_FAILED });
            })
    }
}

export const adminGetCategoryProduct = () => {

}

export const adminAddCategoryProduct = () => {

}

export const adminEditCategoryProduct = () => {

}

export const adminDeleteCategoryProduct = () => {

}