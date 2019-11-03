import React, { Component } from 'react';
import {connect} from "react-redux";
import {BrowserRouter,Switch} from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from '../helpers/theme'
import NotificationBar from '../helpers/notificationBar'
import routes from './routes'
import Header from './header'
import NavHead from './navHead'
import './app.css'
import {InitSocket} from "../socket/PubSub";
import {ReceiveSocketAction} from "../actions/socketAction";
class App extends Component {

    render() {
        if(this.props.userData.isAuthenticated) InitSocket(this.props.userData.user,this.props.ReceiveSocketAction);
        return (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <MuiThemeProvider theme={theme}>
                    <Header/>
                    {this.props.userData.isAuthenticated && <NavHead/>}
                    <div className='main-wrapper'>
                        <Switch>
                            {routes}
                        </Switch>
                        <NotificationBar/>
                    </div>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
}

export default connect( store => {
    return {
        userData: store.UserReducer
    }},{ReceiveSocketAction})(App);

