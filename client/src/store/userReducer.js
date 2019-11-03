import {createReducer} from 'redux-starter-kit'
import { loadState } from '../helpers/localStorage';

export const UserReducer = createReducer(loadState(), {
    "UserLogin" : (state, action) => {
        return {
            'isAuthenticated' : !!action.payload.id,
            'user' : action.payload
        };
    }
})

export const UserListReducer = createReducer({loading:true}, {
    "UserList" : (state, action) => {
        return action.payload;
    },
    "Signup" : (state, action) => {
        return [ action.payload,...state]
    }
})


