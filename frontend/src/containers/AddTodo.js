import React, { useState, Fragment } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function AddTodo( { isAuthenticated, user, fetchData } ) {

    const [todoForm, setTodoForm] = useState({
        title: "",
        description: "",
        completed: false,
        author: ""
    });

    const { title, description, completed, author } = todoForm;

    const onChange = (e) => 
        setTodoForm({ ...todoForm, [e.target.name]: e.target.value, author:user.id });
        console.log(todoForm);

    const onSubmit = e => {
        e.preventDefault()
        addNewTask(title, description, completed, author);
        setTodoForm({
            title: "",
            description: "",
            completed: false,
            author: ""
        });
    };

    const addNewTask = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({ title, description, completed, author });

            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/create/`, body, config);
                console.log(response.data);
                window.location.reload();
                clearForm()
                showForm()
                fetchData()
        } catch (err) {
            console.error(err);
        }
    };

    const clearForm = () => {
        setTodoForm({
        title: "",
        description: "",
        completed: false,
        author: "" });
    }

    const showForm = () => (
        <Box component="span" m={2}>
            <Typography variant="h5" align="center" color="secondary">
                Add a new task!
            </Typography>
            <Grid container spacing={2} justify="space-around" alignItems="center" >
                <Grid item xs={12} md={3}>
                    <TextField 
                        variant="outlined"
                        required 
                        name="title" 
                        label="Task" 
                        fullWidth 
                        size="small"
                        defaultValue="" 
                        onChange={onChange}                
                    />
                </Grid>
                <Grid item xs={12} md={7}>
                    <TextField
                        required
                        variant="outlined"
                        name="description"
                        label="Description"
                        fullWidth
                        size="small"
                        defaultValue=""
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button 
                        size="medium" 
                        variant="contained" 
                        color="primary"
                        onClick={onSubmit}
                    >
                        Add todo
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )

    const hideForm = (
        <Box  component="span" m={2}>
            <Typography variant="h5" align="center" color="secondary">
                You must be authenticated to see your tasks!
            </Typography>
        </Box> )
  
    return (
        <Fragment>
            { isAuthenticated ? showForm() : hideForm } 
        </Fragment>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps)(AddTodo);