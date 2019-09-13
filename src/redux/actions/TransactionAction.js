import Axios from 'axios';
import {
    GET_ALL_TRANSACTION,
    SEND_TO_TRANSACTION, 
    CLEAR_CART,
    CLEAR_TRANSACTION
} from './types'
import { URL_API } from '../../helpers/Url_API';

export const sendCartToTransaction = (objCart) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.post(URL_API + '/transaction/addTransaction', { data: objCart }, options)
            .then((res) => {
                dispatch({
                    type: SEND_TO_TRANSACTION,
                    payload: {
                        transaction_selected: res.data.dataTransactionUI,
                        transaction_detail: res.data.dataTransactionDetailUI,
                    }
                })
                dispatch({
                    type: CLEAR_CART
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getUserTransaction = () => {
    return(dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.get(URL_API + '/transaction/getUserTransaction', options)
            .then((res) => {
                dispatch({
                    type: GET_ALL_TRANSACTION,
                    payload: {
                        transaction: res.data.dataTransactionUI,
                        transaction_detail: [],
                        transaction_selected: []
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const getTransactionDetail = (id) => {
    return(dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.get(URL_API + '/transaction/getTransactionDetail/' + id, options)
            .then((res) => {
                dispatch({
                    type: SEND_TO_TRANSACTION,
                    payload: {
                        transaction_selected: res.data.dataTransactionUI,
                        transaction_detail: res.data.dataTransactionDetailUI
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const cleanTransaction = () => {
    return {
        type: CLEAR_TRANSACTION
    }
}