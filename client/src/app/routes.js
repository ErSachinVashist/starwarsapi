import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import RequireAuth from "../helpers/requiresAuth";
import Search from './search'
import UsersList from './user/usersList'
import Login from './user/userLogin'
import Signup from './user/userSignup'

const routes=[
    <Route key='search' exact path='/dashboard' component={RequireAuth(Search)}/>,
    <Route key='login' path='/login' component={(props)=><Login {...props}/>}/>,
    <Route key='signup' path='/signup' component={(props)=><Signup {...props}/>}/>,
    <Route key='users' path='/users' component={RequireAuth(UsersList)}/>,
    <Redirect key='redirect' to="/dashboard"/>
]

export default routes
