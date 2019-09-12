import Axios from 'axios';
import {
    ADD_TO_CART,
    SEND_TO_TRANSACTION,
    CLEAR_CART
} from './types';
import { URL_API } from '../../helpers/Url_API';


export const userAddProduct = (obj) => {
    return(dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.post(URL_API + '/cart/addedToCart', {data: obj}, options)
        .then((res) => {
            dispatch({
                type: ADD_TO_CART,
                payload: {
                    cart: res.data.dataCart,
                    cartCount: res.data.cartCount
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
}

export const showCart = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.get(URL_API + '/cart/showCart', options)
            .then((res) => {
                dispatch({
                    type: ADD_TO_CART,
                    payload: {
                        cart: res.data.dataCart,
                        cartCount: res.data.cartCount
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const deleteCartProduct = (productId) => {
    return (dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.post(URL_API + '/cart/deleteCart/' + productId, {}, options)
            .then((res) => {
                dispatch({
                    type: ADD_TO_CART,
                    payload: {
                        cart: res.data.dataCart,
                        cartCount: res.data.cartCount
                    }
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export const sendCartToTransaction = (objCart) => {
    return(dispatch) => {
        const token = localStorage.getItem('token');

        let options = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }

        Axios.post(URL_API + '/transaction/addTransaction', {data: objCart}, options)
            .then((res) => {
                dispatch({
                    type: SEND_TO_TRANSACTION,
                    payload: {
                        transaction: res.data.dataTransactionUI,
                        statusTransaction: 'Added_To_Transaction'
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