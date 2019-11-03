
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types'
import Snackbar from '@material-ui/core/Snackbar';

class NotificationBar extends Component{

    state={
        show:false,
        message:'Hello'
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.notification){
            this.setState({show:true,message:nextProps.notification.message})
        }
    }
    static contextTypes = {
        router: Proptypes.object
    };

    render() {
        return <Snackbar
            anchorOrigin={{ vertical:'bottom', horizontal:'left' }}
            open={this.state.show}
            onClose={()=>this.setState({show:false})}
            autoHideDuration={2000}
            ContentProps={{
                'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{this.state.message}</span>}
        />


    }
}

export default connect( store => {
    return {
        notification: store.NotifyReducer
    }})(NotificationBar);
