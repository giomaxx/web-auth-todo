import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


const UseStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    }));


const navbar = ({ isAuthenticated, logout, user }) => {
    const classes = UseStyles();

    const exitLinks = (
        
        <Fragment>
            {user ? (
            <Box margin={2}>
                <Typography>
                    {user.username}
                </Typography>
            </Box>) : null}
            <Box>
                <Button
                    component={NavLink} 
                    color="inherit" 
                    size="small" 
                    variant="outlined"
                    to="/login"
                    onClick={logout}
                    >
                    Logout
                </Button>
            </Box>
        </Fragment>
    );
    
    const enterLinks = (
        <Fragment>
            <Box margin={1}>
                <Button
                    component={NavLink} 
                    color="inherit" 
                    size="small" 
                    variant="outlined"
                    to="/signup"
                    >
                    Register
                </Button>
            </Box>
            <Box>
                <Button
                    component={NavLink} 
                    color="inherit" 
                    size="small" 
                    variant="outlined"
                    to="/login"
                    >
                    Login
                </Button>
            </Box>
        </Fragment>
    );
    
    return(
        <AppBar position="static" className={classes.root}>
            <Toolbar>
                <Link
                    component={NavLink}
                    to="/"
                    underline="none"
                    color="secondary"                
                    variant="h5" 
                    fontWeight="400"
                    className={classes.title}>
                        Web Auth Todo
                </Link>
                { <Fragment>{ isAuthenticated ? exitLinks : enterLinks }</Fragment> }
            </Toolbar>
        </AppBar>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, { logout })(navbar);