import { createReducer} from 'redux-starter-kit'

export const SearchReducer = createReducer(null, {
    "SearchSwap" : (state, action) => {
        return action.payload;
    }
})

export const SearchListReducer = createReducer({loading:true}, {
    "SearchSwapList" : (state, action) => {
        return action.payload;
    },
    "SearchSwapListUpdate" : (state, action) => {
        state=JSON.parse(JSON.stringify(state))
        if(action.payload.method==='PUT'){
            return state.map((item)=>{
                return item.id===action.payload.data.id?action.payload.data:item
            });
        }
        else{
            if(state.length===5){
                state.pop();
            }
            return [ action.payload.data,...state]
        }
    }
});


