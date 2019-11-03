import {createAction} from 'redux-starter-kit'
import axios from 'axios'
// const searchSwap = createAction('SearchSwap');
const searchSwapList = createAction('SearchSwapList');

const Api_URL = process.env.REACT_APP_API_URL;



export const FetchSwapData = (data) => dispatch => {

    axios.post(Api_URL + "/searcheds/fetchSwapData",data)
        .then((res) => {
            if(res.status===200){
                // dispatch(searchSwap(res.data))
            }
            if(res.data.error){
                dispatch({
                    type:'notify',
                    payload:{
                        type:'error',
                        message:res.data.error
                    }
                });
            }
        })
        .catch((err) => {
            if(!err.response) return;
            let {error,message}=err.response.data.error
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:message?message:error
                }
            });
        });
};

export const SearchList = (filter) => dispatch => {
    axios.get(Api_URL + "/searcheds/getSearchList",{params:{filter}})
        .then((res) => {
            if(res.status===200){
                dispatch(searchSwapList(res.data))
            }

        })
        .catch((err) => {
            if(!err.response) return;
            let {error,message}=err.response.data.error
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:message?message:error
                }
            });
        });
};

