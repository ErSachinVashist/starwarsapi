import {UserReducer,UserListReducer} from './userReducer'
import {SearchReducer,SearchListReducer} from './searchReducer'
import {NotifyReducer} from './extraReducer'
import {combineReducers} from 'redux-starter-kit'

const rootReducer=combineReducers({
    UserReducer,
    UserListReducer,
    NotifyReducer,
    SearchReducer,
    SearchListReducer
})
const appReducer=(state,action)=>{
    return rootReducer(state,action)
}

export default appReducer
