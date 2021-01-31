import React from 'react';
import { Link } from 'react-router-dom';

const home = () => (
    <div className='container'>
        <div className="jumbotron mt-5">
            <h1 className="display-4">Welcome to Auth System!</h1>
            <p className="lead">This is an authentication system with all kinds of functionalities.</p>
            <hr className="my-4" />
            <p>Go ahead and login or sign up!</p>
            <Link className="btn btn-primary btn-lg" to='/login' role="button">Login</Link>
            <Link className="btn btn-secondary btn-lg" to='/signup' role="button">Signup</Link> 
        </div>
    </div>
);

export default home;