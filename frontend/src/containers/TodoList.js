import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import AddTodo from './AddTodo'
import AddEditForm from './EditTodo'
// Material UI
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 400,
  },
  cardHeaderRoot: {
    backgroundColor: theme.palette.primary.light,
  },
  grid: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function TodoList() {
  const classes = useStyles();

  const [data, setData] = useState({
    todos: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  //  FETCH DATA
  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
          }
        });
      setData({ todos: res.data });
      console.log(res.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  // DELETE TODO
  const deleteTodo = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete/${id}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      });
    fetchData();
  }

  // EDIT TODO 
  const triggerEditForm = (id) => {
    console.log(id)

    const updatedTodos = data.todos.map((todo) => todo.id === id ? {
      ...todo,
      editing: !todo.editing
    } : todo);
    // console.log(updatedTodos);
    setData({ todos: updatedTodos });
  };

  // CHECK / UNCHECK COMPLETED 
  const switchCheck = async (todo) => {
    // console.log(todo);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };
    const payload = {
      id: todo.id, title: todo.title, description: todo.description,
      editing: false, completed: !todo.completed
    }
    const { id, title, description, completed, editing } = payload;
    const body = JSON.stringify({ id, title, description, completed, editing });
    // console.log(body)
    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/api/update/${id}/`, body, config);
      console.log(response.data);
      fetchData()
    }
    catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Fragment>
      <Container maxWidth="lg">
        <AddTodo fetchData={fetchData} />
        <Card className={classes.root} square={true}>
          <CardHeader
            title="Your Todos"
            className={classes.cardHeaderRoot} >
          </CardHeader>
          <CardContent>
            <Table stickyHeader size="small">
              <TableHead variant="head">
                <TableRow>
                  <TableCell style={{ fontWeight: '600' }}>Task</TableCell>
                  <TableCell style={{ fontWeight: '600' }}>Description</TableCell>
                  <TableCell align="right" style={{ fontWeight: '600' }}>Completed</TableCell>
                  <TableCell align="right" style={{ fontWeight: '600' }}>Edit</TableCell>
                  <TableCell align="right" style={{ fontWeight: '600' }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.todos.map((todo) => (
                  <Fragment>
                    <TableRow key={todo.id}>
                      <TableCell>{todo.title}</TableCell>
                      <TableCell>{todo.description}</TableCell>
                      <TableCell align="right">
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => { switchCheck(todo) }}
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="edit"
                          id={todo.id}
                          title={todo.title}
                          contend={todo.content}
                          onClick={() => { triggerEditForm(todo.id) }}
                        >
                          <EditIcon fontSize="small" color="secondary" />
                        </IconButton>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="delete"
                          id={todo.id}
                          onClick={() => { deleteTodo(todo.id) }}
                        >
                          <DeleteIcon fontSize="small" color="secondary" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                      </TableCell>
                    </TableRow>
                    {todo.editing && <AddEditForm key={todo.title} fetchData={fetchData} todo={todo} />}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};
