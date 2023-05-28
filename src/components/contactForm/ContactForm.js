import React, { useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        phone:'',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log(formData);
        // Reset form data
        setFormData({
            name: '',
            email: '',
            message: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction={"column"}>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Contacteaza proprietarul
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        name="name"
                        label="Name"
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
                        label="Message"
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
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ContactForm;
