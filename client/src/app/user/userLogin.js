import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {compose} from "recompose";
import {connect} from "react-redux";
import {Link} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {loginCss} from '../../helpers/componentStyle';
import {UserLogin} from "../../actions/userAction";

class Login extends React.Component {
    state={
        user:{
            email:'',
            password:''
        },

        loggingIn:false
    };
    componentWillMount() {
        if(this.props.userData.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps() {
        this.setState({loggingIn:false})

    }

    handleSubmit=(e)=>{
        e.preventDefault()
        this.setState({loggingIn:true})
        this.props.UserLogin(this.state.user,this.props.history)

    }
    handleChange=(type)=>(e)=>{
        let user=Object.assign({}, this.state.user);
        user[type]=e.target.value
        this.setState({user:user})
    }
    render() {
        const { classes } = this.props;
        let {user,loggingIn}=this.state
        return (
            <Paper className={classes.paper}>
                {loggingIn && <LinearProgress color='secondary'/>}
                <Avatar
                    className={classes.avatar}
                    src={require('../../assests/images/user.png')}
                />
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <Typography  variant='h5'>Login</Typography>
                    <TextField
                        required
                        label="Email"
                        type="email"
                        fullWidth
                        className={classes.textField}
                        value={user.email}
                        onChange={this.handleChange('email')}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        required
                        label="Password"
                        type="password"
                        fullWidth
                        className={classes.textField}
                        value={user.password}
                        onChange={this.handleChange('password')}
                        margin="dense"
                        variant="outlined"
                    />
                    <Button disabled={loggingIn} size="medium" variant='contained' color='primary' type='submit' className={classes.subButton}>
                        Login
                    </Button>
                    <br/>
                    <br/>
                    <Typography align='center' variant='caption'> <Link to='/signup'>Don't have an account ?</Link></Typography>

                </form>
            </Paper>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(loginCss),
    connect(store=>({
        userData:store.UserReducer
    }),{UserLogin})
)(Login);

