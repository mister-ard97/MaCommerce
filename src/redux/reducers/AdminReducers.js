import {
    ALL_CATEGORY,
    ADMIN_LOADING, 
    ADMIN_LOADING_FINISHED,
    ADMIN_LOADING_ERROR,
    ADMIN_CLEAN
} from '../actions/types'

const INITIAL_STATE = {
    categoryProduct: [],
    subCategoryProduct: [],
    productList: [],
    loading: false,
    error: '',
    success: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALL_CATEGORY:
            return {...state, ...action.payload}
        case ADMIN_LOADING:
            return { ...state, loading: true, error: '' , success: ''}
        case ADMIN_LOADING_FINISHED: 
            return { ...state, loading: false}
        case ADMIN_LOADING_ERROR: 
            return { ...state, error: action.payload.error, loading: false }
        case ADMIN_CLEAN: 
            return { ...state, loading: false, error: '', success: '' }
        default:
           return state
    }
}