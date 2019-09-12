import {
    SEND_TO_TRANSACTION
} from '../actions/types'

const INITIAL_STATE = {
    transaction: null,
    transactionSelected: []
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_TO_TRANSACTION:
            return {...INITIAL_STATE, ...action.payload}
        default:
            return state
    }
}