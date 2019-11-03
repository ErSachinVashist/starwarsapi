import {UserLogout} from './userAction'

export const ReceiveSocketAction = (data) => (dispatch, getState) => {
    if(data.makingAuthConnection && !data.userAuth){
        dispatch(UserLogout(true))
    }
    if (data.collectionName) {
        switch (data.collectionName) {
            case 'Searched':
                dispatch({
                    type:'SearchSwapListUpdate',
                    payload:{
                        method:data.method,
                        data:data.data
                    }
                });
                break;
            default :
                return null
        }
    }
};
