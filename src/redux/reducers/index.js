import { combineReducers } from 'redux';
import RegisterReducer from './RegisterReducer';

export default combineReducers({
    register: RegisterReducer
})