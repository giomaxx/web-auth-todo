import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../actions/auth';
//MaterialUI
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));


const Signup = ({ signup, isAuthenticated }) => {
    const classes = useStyles();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        re_password: ''
    });

    const [accountCreated, setAccountCreated] = useState(false);

    const { username, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password === re_password) {
            signup({ username, email, password, re_password });
            setAccountCreated(true);
        }
    };

    if (isAuthenticated)
        return <Redirect to='/' />;
    if (accountCreated)
        return <Redirect to='login' />;
    
        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Typography component="h6" variant="h6">
                    Create your Account
                </Typography>
                <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={onChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="re_password"
                            label="Confirm Password"
                            type="password"
                            id="re_password"
                            autoComplete="current-password"
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={onSubmit}
                        >
                            Register
                        </Button>
                        <Grid container>
                            <Grid item>
                                {"Already have an account? "}  
                                <Link href="/login" variant="body2">
                                Login
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup })(Signup);