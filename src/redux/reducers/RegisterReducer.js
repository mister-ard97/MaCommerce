import {
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_LOADING, 
    USER_LOGIN_ERROR
} from '../actions/types'

const INITIAL_STATE = {
    FirstName: '',
    LastName: '',
    username: '',
    email: '',
    loading: false,
    error: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return {...INITIAL_STATE, ...action.payload}
        case USER_LOGIN_LOADING:
            return {...state, loading: true, error: ''}
        case USER_LOGIN_ERROR:
            return { ...INITIAL_STATE, error: action.payload.error }
        default:
            return INITIAL_STATE
    }
}