import React, { useState } from 'react'
import axios from 'axios'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

export default function AddEditForm({ todo, fetchData }) {

    const [editForm, setEditForm] = useState({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: false,
        editing: false,
    });

    const { id, title, description, completed, editing } = editForm;

    const onChange = e =>
        setEditForm({
            ...editForm, [e.target.name]: e.target.value, id: todo.id
        });
        console.log(editForm);

    const onSubmit = e => {
        e.preventDefault()
        editTask(id, title, description, completed, editing);
    };

    const editTask = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Accept': 'application/json'
                }
            };
            const body = JSON.stringify({ id, title, description, completed, editing });

            const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/update/${id}/`, body, config);
            console.log(response.data);
            fetchData()
        } catch (err) {
            console.error(err);
        }
    };

    return (
            <TableRow>
                <TableCell>
                    <TextField
                        variant="outlined"
                        required
                        name="title"
                        label="Task"
                        fullWidth
                        size="small"
                        defaultValue={todo.title}
                        onChange={onChange}
                    />
                </TableCell>
                <TableCell>
                    <TextField
                        required
                        variant="outlined"
                        name="description"
                        label="Description"
                        fullWidth
                        size="small"
                        defaultValue={todo.description}
                        onChange={onChange}
                    />
                </TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right">
                    <Button
                        size="medium"
                        variant="contained"
                        color="primary"
                        onClick={onSubmit}
                    >
                        Update
                    </Button>
                </TableCell>
        </TableRow>      
    )
}
