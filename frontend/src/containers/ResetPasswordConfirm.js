import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
//MaterialUI
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
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


const ResetPasswordConfirm = (props) => {
    const classes = useStyles();

    const [requestSent, setRequestSent] = useState(false);

    const [formData, setFormData] = useState({
        new_password: '',
        re_new_password: ''
    });

    const { new_password, re_new_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        
        const uid = props.match.params.uid;
        const token = props.match.params.token;

        props.reset_password_confirm(uid, token, new_password, re_new_password);
        setRequestSent(true);
    };

    if (requestSent)
        return <Redirect to='/' />

        return (
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}></Avatar>
                <Typography component="h1" variant="h6">
                    Request Password Reset:
                </Typography>
                <form className={classes.form} noValidate onSubmit={e => onSubmit(e)}>
                <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="new_password"
                            label="New Password"
                            type="password"
                            id="new_password"
                            onChange={onChange}
                        />
                <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="re_new_password"
                            label="Confirm New Password"
                            type="password"
                            id="re_new_password"
                            onChange={onChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Reset Password
                        </Button>
                    </form>
                </div>
            </Container>
        );
};

export default connect(null, { reset_password_confirm })(ResetPasswordConfirm);