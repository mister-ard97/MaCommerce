import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';
import AdminReducer from './AdminReducers';

export default combineReducers({
    register: RegisterReducer,
    admin: AdminReducer
})