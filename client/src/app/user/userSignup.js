import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {compose} from "recompose";
import {connect} from "react-redux";
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {loginCss} from '../../helpers/componentStyle';
import {Signup} from "../../actions/userAction";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";

const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: ''
}

class SignupComp extends React.Component {
    state = {user, formError: null, signingIn: false};

    handleSubmit = (e) => {
        e.preventDefault();
        const {user}=this.state
        if (user.password === user.cpassword) {
            this.setState({signingIn: true})
            this.props.Signup({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
            },this.props.history)
        } else {
            this.setState({formError: 'Password didnot match'})
        }
    };

    handleChange = (type) => (e) => {
        let user = Object.assign({}, this.state.user);
        user[type] = e.target.value
        this.setState({user: user, formError: null})
    };
    componentWillMount() {
        if(this.props.userData.isAuthenticated){
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps() {
        this.setState({signingIn:false})
    }

    render() {
        const { classes } = this.props;
        let {formError,signingIn,user}=this.state

        return (
            <Paper className={classes.paper}>
                {signingIn && <LinearProgress color='secondary'/>}
                <Avatar
                    className={classes.avatar}
                    src={require('../../assests/images/user.png')}
                />
                <form id='pass' className={classes.form} onSubmit={this.handleSubmit}>
                    <Typography variant='h5'>Add User</Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="First Name"
                                fullWidth
                                className={classes.textField}
                                value={user.firstName}
                                onChange={this.handleChange('firstName')}
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Last Name"
                                fullWidth
                                className={classes.textField}
                                value={user.lastName}
                                onChange={this.handleChange('lastName')}
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                        <Grid item xs={12} md={6}>
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
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                required
                                label="Confirm Password"
                                type="password"
                                fullWidth
                                className={classes.textField}
                                value={user.cpassword}
                                onChange={this.handleChange('cpassword')}
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>

                    </Grid>
                    {formError && <Typography variant='body1' style={{color: 'brown'}}>{formError}</Typography>}
                    <Button disabled={signingIn} size="medium" variant='contained' color='primary'
                            type='submit'
                            className={classes.subButton}>
                        {signingIn ? 'Please Wait ...' : 'Sign In'}
                    </Button>
                    <br/>
                    <br/>
                    <Typography align='center' variant='caption'> <Link to='/login'>Already have an account ?</Link></Typography>

                </form>

            </Paper>
        );
    }
}

Signup.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(loginCss),
    connect(store=>({
        userData:store.UserReducer
    }),{Signup})
)(SignupComp);

