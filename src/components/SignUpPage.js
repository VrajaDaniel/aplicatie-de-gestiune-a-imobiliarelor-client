import React, {useState} from 'react';
import Button from "@mui/material/Button";
import {TextField} from "@mui/material";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import {useHistory} from "react-router-dom";

function SignUpPage() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const history = useHistory();
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

const handleSubmit = (e) => {

    if (validatePhoneNumber(formData.phoneNumber)===false){
        e.preventDefault()
        setSnackbarSeverity('error');
        setSnackbarMessage('Numar de telefon invalid');
        setSnackbarOpen(true);
    }
    else {
        e.preventDefault()
        axios
            .post("http://localhost:8080/signup", formData)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Cont creeat cu succes');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Contul nu a putut fi creeat');
                setSnackbarOpen(true);
            });
    }
};

const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\d{10}$/;
    return phonePattern.test(phoneNumber);
};

return (
    <div>
        <h2>Înregistrare</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="lastName">Nume:</label>
                <br/>
                <TextField
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="firstName">Prenume:</label>
                <br/>
                <TextField
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="phoneNumber">Număr de telefon:</label>
                <br/>
                <TextField
                    type="phone"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <br/>
                <TextField
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Parolă:</label>
                <br/>
                <TextField
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </div>
            <br/>
            <div>
                <Button variant="contained" type="submit">
                    Înregistrare
                </Button>
                <br/>
                <br/>
                <Button variant="contained" href="/">
                    Du-te pe prima pagina
                </Button>
            </div>
        </form>

        <Snackbar
            open={snackbarOpen}
            onClose={() => setSnackbarOpen(false)}
            message={snackbarMessage}
            ContentProps={{
                style: {
                    backgroundColor: snackbarSeverity === 'success' ? 'green' : 'red',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
            }}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        />

    </div>
);

}

export default SignUpPage;
