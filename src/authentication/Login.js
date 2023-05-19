import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

const LoginForm = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                userName: email,
                password: password
            });

            const token = response.data.token;
            localStorage.setItem('token', token);
            props.handleLogin();
            history.push('/userPage');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '10px'}}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <div style={{marginBottom: '10px'}}>
                <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
