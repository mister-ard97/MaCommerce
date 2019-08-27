import {
    ALL_CATEGORY
} from '../actions/types'

const INITIAL_STATE = {
    categoryProduct: [],
    subCategoryProduct: [],
    productList: []
}

export default (state = INITIAL_STATE, actions) => {
    switch (actions.type) {
        case ALL_CATEGORY:
            return {...INITIAL_STATE, ...actions.payload}
        default:
           return state
    }
}