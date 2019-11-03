
import {createReducer} from 'redux-starter-kit'

export const NotifyReducer = createReducer({}, {
    "notify" : (state, action) => {
        return action.payload;
    }
})


