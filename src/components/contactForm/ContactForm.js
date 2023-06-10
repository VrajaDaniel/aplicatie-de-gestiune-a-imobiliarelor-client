import React, {useState} from 'react';
import {Button, Grid, Snackbar, TextField, Typography} from '@mui/material';
import axios from "axios";

const ContactForm = (props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phone: '',
        postId:'',
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                "Content-Type":"application/json"
            },
        };
        formData.postId=props.postId;
        console.log(formData)
        axios
            .post("http://localhost:8080/contact", JSON.stringify(formData), config)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Mesajul dumneavoastra a fost trimis cu succes');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Mesajul nu a putut fi trimis');
                setSnackbarOpen(true);
            });
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction={"column"}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Contactează proprietarul
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="name"
                            label="Nume"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="phone"
                            label="Telefon"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            name="email"
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            name="message"
                            label="Mesaj"
                            value={formData.message}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary">
                            Trimite
                        </Button>
                    </Grid>
                </Grid>
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
    )
        ;
};

export default ContactForm;
