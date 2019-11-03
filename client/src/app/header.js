import React from 'react';
import {connect} from "react-redux";
import {compose} from "recompose";
import PropTypes from 'prop-types';
import RG from 'random-greetings';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withStyles} from '@material-ui/core/styles';
import {FaGithub, FaBars, FaLinkedin, FaFacebook, FaInstagram} from 'react-icons/fa'
import {headerCss} from '../helpers/componentStyle'

class Header extends React.Component {

    state = {
        mobileMoreAnchorEl: null,
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = event => {
        this.setState({mobileMoreAnchorEl: event.currentTarget});
    };

    handleMobileMenuClose = (url) => {
        if (url) {
            window.open(url, '_blank')
        }
        this.setState({mobileMoreAnchorEl: null});
    };

    render() {
        const {mobileMoreAnchorEl} = this.state;
        const {classes,user} = this.props;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const renderMobileMenu = (
            <Menu
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
                open={isMobileMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={e => this.handleMobileMenuClose('https://www.linkedin.com/in/sachin-vashist')}>
                    <IconButton color="inherit">
                        <FaLinkedin/>
                    </IconButton>
                    <p>Linkedin</p>
                </MenuItem>
                <MenuItem onClick={e => this.handleMobileMenuClose('https://www.facebook.com/vashist82')}>
                    <IconButton color="inherit">
                        <FaFacebook/>
                    </IconButton>
                    <p>Facebook</p>
                </MenuItem>
                <MenuItem onClick={e => this.handleMobileMenuClose('https://www.instagram.com/vashist797')}>
                    <IconButton color="inherit">
                        <FaInstagram/>
                    </IconButton>
                    <p>Instagram</p>
                </MenuItem>
                <MenuItem onClick={e => this.handleMobileMenuClose('https://github.com/ErSachinVashist/React-boiler')}>
                    <IconButton color="inherit">
                        <FaGithub/>
                    </IconButton>
                    <p>Git Repo</p>
                </MenuItem>
            </Menu>
        );

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Tooltip title={user.isAuthenticated ? RG.greet():''} placement="bottom">
                                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                                    {user.isAuthenticated ? (user.user.firstName + " " + user.user.lastName) : 'Login to continue'}
                                </Typography>
                        </Tooltip>
                        <div className={classes.grow}/>
                        <div className={classes.sectionDesktop}>
                                <div className={classes.grow}/>
                                <IconButton color="inherit"
                                            onClick={() => window.open('https://www.linkedin.com/in/sachin-vashist', '_blank')}
                                >
                                    <FaLinkedin/>
                                </IconButton>
                                <IconButton color="inherit"
                                            onClick={() => window.open('https://www.facebook.com/vashist82', '_blank')}
                                >
                                    <FaFacebook/>
                                </IconButton>
                                <IconButton color="inherit"
                                            onClick={() => window.open('https://www.instagram.com/vashist797', '_blank')}
                                >
                                    <FaInstagram/>
                                </IconButton>
                                <IconButton color="inherit"
                                        onClick={() => window.open('https://github.com/ErSachinVashist/React-boiler', '_blank')}
                            >
                                <FaGithub/>
                            </IconButton>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <FaBars/>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {renderMobileMenu}
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};


export default compose(
    withStyles(headerCss),
    connect(store=>({
        user: store.UserReducer
    }))
)(Header)
