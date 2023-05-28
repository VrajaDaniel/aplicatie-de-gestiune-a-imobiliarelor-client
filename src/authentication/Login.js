import React, {useState} from 'react';
import {Button, TextField} from '@mui/material';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import login from '../images/login.png'

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
        <form onSubmit={handleSubmit}
              style={{
                  backgroundImage: `url(${login})`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '100vh',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
              }}
        >
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
            <br/>
            <Button
                href='/signUpPage'
                variant="contained"
                color="primary"
            >
                Creeaza Cont
            </Button>
        </form>
    );
};

export default LoginForm;
