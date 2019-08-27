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

export const onUserRegister = (data) => {
    let {
        username,
        password,
        confPassword,
        FirstName,
        LastName,
        email,
        address,
        UserImage
    } = data

    return (dispatch) => {
        dispatch({type: AUTH_LOGIN_LOADING});
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
            address === '' ||
            UserImage === '' ) {

                dispatch({type: AUTH_LOGIN_ERROR, payload: {
                    error: 'Semua Form Input Harus Diisi',
                }})
            
            } else {
                
                let formData = new FormData();
                var headers = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                delete data.confPassword;

                formData.append('imageUser', UserImage)

                delete data.UserImage;
                
                formData.append('data', JSON.stringify(data))

                Axios.post(URL_API + '/user/userRegister', formData, headers)
                    .then((res) => {
                        let {FirstName, LastName, username, email, token, status, role} = res.data
                        localStorage.setItem('token', token);
                        dispatch({ type: USER_LOGIN_SUCCESS, payload: {
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

export const EmailVerification = () => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        const token = localStorage.getItem('token');
        const options = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        Axios.put(URL_API + '/user/userEmailVerification', { token }, options)
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

export const resendEmailVerification = (username, email) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        const token = localStorage.getItem('token');
        Axios.post(URL_API + '/user/userResendEmailVerification', {
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

export const userLogin = (username, password) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });

        Axios.post(URL_API + '/user/userLogin', {
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

export const KeepLogin = (req, res) => {
   return (dispatch) => {
       dispatch({ type: AUTH_LOGIN_LOADING });
       const token = localStorage.getItem('token');
       const options = {
           headers: {
               'Authorization': `Bearer ${token}`,
           }
       }

       Axios.post(URL_API + '/user/userKeepLogin', {}, options)
           .then((res) => {
               let { FirstName, LastName, username, email, token, status, role} = res.data
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
                   } })
           })
           .catch((err) => {
               localStorage.removeItem('token');
               dispatch({ type: USER_LOGOUT });
           })
    }
}

export const userLogOut = () => {
        localStorage.removeItem('token');
        return { 
            type: USER_LOGOUT 
        };
}

export const cleanError = () => {
    return {
        type: CLEAN_ERROR
    };
}