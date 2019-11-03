import {createAction} from 'redux-starter-kit'
import { saveState } from '../helpers/localStorage';
import axios from 'axios'
const userLogin = createAction('UserLogin')
const userList = createAction('UserList')
const Api_URL = process.env.REACT_APP_API_URL;



export const UserLogin = (cred, router) => dispatch => {
    axios.post(Api_URL + "/users/userLogin", cred)
        .then((res) => {
            if (res.data.id) {
                dispatch({
                    type:'notify',
                    payload:{
                        type:'success',
                        message:'Successfully Logged In'
                    }
                });
                dispatch(userLogin(res.data));
                router.push('/dashboard');
            }
            else{
                dispatch(userLogin({}));
                dispatch({
                    type:'notify',
                    payload:{
                        type:'error',
                        message:"Uncaught error"
                    }
                });
            }
        })
        .catch((err) => {
            dispatch(userLogin({}));
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

export const UserLogout = (autoLogout) => dispatch => {
    if(autoLogout){
        saveState({})
        return window.location.reload();

    }
    axios.post(Api_URL + "/users/logout")
        .then((res) => {
            if(res.status===204){
                dispatch({
                    type:'notify',
                    payload:{
                        type:'error',
                        message:"You have been Logget Out"
                    }
                });
                saveState({})
                window.location.reload();
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

export const UserList = (filter,isAdmin) => (dispatch,getState) => {
    dispatch(userList({loading:true}));
    if(!isAdmin){
        return dispatch(userList([getState().UserReducer.user]));
    }
    axios.get(Api_URL + "/users",{params:{filter}})
        .then((res) => {
            if(res.status===200){
                dispatch(userList(res.data));
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

export const Signup = (data,router) => (dispatch,getState) => {
    axios.post(Api_URL + "/users",data)
        .then((res) => {
            if(res.status===200){
                router.push('/login')
                dispatch({
                    type:'notify',
                    payload:{
                        type:'success',
                        message:'User Added '+res.data.email
                    }
                });
            }
        })
        .catch((err) => {
            if(!err.response) return;
            let {error,message}=err.response.data.error
            dispatch(userLogin({error:message}));
            dispatch({
                type:'notify',
                payload:{
                    type:'error',
                    message:message?message:error
                }
            });
        });
};

export const UserTokenCheck = (user) => dispatch => {
    if(!user){
        dispatch(UserLogout(true))
    }
    axios.get(Api_URL + `/users/${user.userId}/verifyToken/${user.id}`)
        .then((res) => {
           if(!res.data || !res.data.valid){
               dispatch(UserLogout(true))
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
