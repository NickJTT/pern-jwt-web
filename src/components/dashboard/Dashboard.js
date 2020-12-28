import React, { Fragment, useState, useEffect } from 'react';
import AuthService from '../../services/AuthService';

export default function Dashboard({ setAuth }) {
    const [name, setName] = useState('');

    const getName = () => {
        try {
            const fetchData = async () => {
                const name = await AuthService.dashboard();
                if (name?.length > 0)
                    setName(name);
            }
            fetchData();
        } catch (exception) {
            console.error(exception);
        }
    }

    useEffect(() => getName(), [name]);

    const logout = (e) => {
        e.preventDefault();
        AuthService.logout();
        setAuth(false);
    }

    return (
        <Fragment>
            <h1>Dashboard</h1>
            <p>Hello, { name }!</p>
            <button onClick = { e => logout(e) }>Logout</button>
        </Fragment>
    );
}
