import {
    USER_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    VERIFICATION_FAILED,
    VERIFICATION_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    username: '',
    email: '',
    token: '',
    status: '',
    loading: false,
    error: '',
    statusVerification: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {...INITIAL_STATE, ...action.payload}
        case AUTH_LOGIN_LOADING:
            return {...state, loading: true, error: ''}
        case AUTH_LOGIN_ERROR:
            return { ...INITIAL_STATE, error: action.payload.error }
        case VERIFICATION_SUCCESS: 
            return {...state, statusVerification:'Success', loading: false}
        case VERIFICATION_FAILED: 
            return { ...state, statusVerification:'Failed', loading: false}
        default:
            return INITIAL_STATE
    }
}