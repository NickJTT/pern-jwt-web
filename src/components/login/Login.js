import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

export default function Login({ setAuth }) {
    const [inputs, setInputs] = useState({ email: '', password: '' });
    const { email, password } = inputs;

    const onChange = event => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }

    const onSubmit = async event => {
        event.preventDefault();
        try {
            const token = await AuthService.login({ email, password });
            if (token?.length > 0)
                setAuth(true);
        } catch (exception) {
            console.error(exception);
        }
    }

    return (
        <Fragment>
            <h1>Login</h1>
            <form onSubmit = { onSubmit }>
                <input type = 'email' name = 'email' placeholder = 'example@mail.com' value = { email } onChange = { onChange }/>
                <input type = 'password' name = 'password' placeholder = 'password' value = { password } onChange = { onChange }/>
                <button type = 'submit'>Submit</button>
            </form>
            <Link to = '/register'>Register</Link>
        </Fragment>
    );
}
