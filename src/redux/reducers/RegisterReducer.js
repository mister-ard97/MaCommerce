import {
    USER_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOGIN_LOADING,
    USER_LOGOUT,
    VERIFICATION_FAILED,
    VERIFICATION_SUCCESS,
    CLEAN_ERROR
} from '../actions/types'

const INITIAL_STATE = {
    FirstName: '',
    LastName: '',
    username: '',
    email: '',
    token: '',
    status: '',
    loading: false,
    error: '',
    role: '',
    statusVerification: '',
    justRegister: false,
    loginChecked: false
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
        case CLEAN_ERROR:
            return { ...state, error: '' }
        case USER_LOGOUT:
            return INITIAL_STATE
        default:
            return state
    }
}