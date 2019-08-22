import Axios from 'axios';
import {
   AUTH_LOGIN_ERROR,
   AUTH_LOGIN_LOADING,
   USER_LOGIN_SUCCESS,
   VERIFICATION_SUCCESS,
   VERIFICATION_FAILED
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
                        localStorage.setItem('token', res.data.token);
                        dispatch({ type: USER_LOGIN_SUCCESS, payload: res.data })
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
        console.log(token)
        const headers = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }
        Axios.put(URL_API + '/user/userEmailVerification', {}, headers)
            .then((res) => {
                console.log('berhasil')
                dispatch({ type: VERIFICATION_SUCCESS });
            })
            .catch((err) => {
                console.log('Gagal');
                dispatch({ type: VERIFICATION_FAILED });
            })
    }
}

export const resendEmailVerification = (username, email) => {
    return (dispatch) => {
        dispatch({ type: AUTH_LOGIN_LOADING });
        
        Axios.post(URL_API + '/user/resendEmailVer', {
            username,
            email
        })
        .then((res) => {

        })
        .catch((err) => {

        })
    }
}