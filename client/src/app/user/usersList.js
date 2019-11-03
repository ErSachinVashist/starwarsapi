import React from 'react';
import {compose} from "recompose";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {userCss} from "../../helpers/componentStyle";
import {UserList, Signup} from "../../actions/userAction";

function isAdmin(user) {
    return user.roles && user.roles.length > 0 && user.roles[0].name === 'admin'
}

const user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    cpassword: ''
}

function showUser(user, classes) {
    return <Card key={user.userId} className={classes.userCard}>
        <CardHeader
            avatar={
                <Avatar style={{width:60,height:60}} src='https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/10_avatar-512.png'/>
            }
            title={user.firstName + ' ' + user.lastName}
            subheader={user.email}
        />
    </Card>
}

class UsersList extends React.Component {
    state = {user, formError: null, addingUser: false};

    componentWillMount() {
        this.props.UserList({order: 'userId DESC'}, isAdmin(this.props.userData.user))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.user.password === this.state.user.cpassword) {
            this.setState({addingUser: true})
            this.props.Signup(this.state.user)
        } else {
            this.setState({formError: 'Password didnot match'})
        }
    };

    handleChange = (type) => (e) => {
        let user = Object.assign({}, this.state.user);
        user[type] = e.target.value
        this.setState({user: user, formError: null})
    }

    componentWillReceiveProps(nextProps) {
        this.setState({user, addingUser: false})
    }

    render() {
        const {classes, userList, userData} = this.props;
        let {user, formError, addingUser} = this.state
        return (
            <Grid container spacing={4} justify='center'>
                <Grid item xs={12} md={5}>
                    <Paper className={classes.mainPaper}>
                        {userList.loading ?
                            <img width='100%' src='https://miro.medium.com/max/1158/1*9EBHIOzhE1XfMYoKz1JcsQ.gif' alt='sachin'/> :
                            isAdmin(this.props.userData.user) ? userList.map((user,index)=>showUser(user,classes)): showUser(userList[0], classes)
                        }
                    </Paper>

                </Grid>
                {isAdmin(userData.user) && <Grid item xs={12} md={5}>
                    <Paper className={classes.paper}>
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
                            <Button disabled={addingUser} size="medium" variant='contained' color='primary'
                                    type='submit'
                                    className={classes.subButton}>
                                {addingUser ? 'Adding ...' : 'Add'}
                            </Button>
                            &nbsp;
                        </form>
                    </Paper>
                </Grid>}
            </Grid>
        );
    }
}

UsersList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(userCss),
    connect(store => ({
        userList: store.UserListReducer,
        userData: store.UserReducer,
    }), {UserList, Signup})
)(UsersList);
