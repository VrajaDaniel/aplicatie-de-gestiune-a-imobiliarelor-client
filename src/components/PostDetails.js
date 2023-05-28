import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AppBar, Button, Card, Grid, Paper, Toolbar, Typography} from '@mui/material';
import {styled} from "@mui/system";
import ImageCarousel from "./Image";
import ContactForm from "./contactForm/ContactForm";
import Maps from "./maps/Maps";
import Divider from "@mui/material/Divider";
import postDetailsBackground from '../images/postDetailsBackground.jpg'

const useStyles = styled((theme) => ({
    root: {
        padding: theme.spacing(3),
    },
    media: {
        height: 300,
        backgroundSize: 'cover',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
}));

export default function PostDetails() {
    const {id} = useParams();
    const [announcement, setAnnouncement] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [selectPosition, setSelectPosition] = useState(null);

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/post/" + id, config)
            .then((response) => {
                setAnnouncement(response.data)
                setSelectPosition({
                    lon: response.data.longitude,
                    lat: response.data.latitude
                });
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, []);

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Anunturi Imobiliare
                    </Typography>
                    <Button color="inherit" href={'/homepage'}>Acasa</Button>
                    <Button color="inherit" href={'/userPage'}>Pagina utilizatorului</Button>
                </Toolbar>
            </AppBar>
            {
                isLoading === true ? (
                    <div>Page is loading...</div>
                ) : (
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            flexGrow: 1,
                            backgroundImage: `url(${postDetailsBackground})`,
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                            backgroundSize: 'cover',
                        }}
                    >
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item>
                                    <Grid item>
                                        <ImageCarousel images={announcement.images} width={700} height={500}/>
                                    </Grid>
                                </Grid>
                                <Grid container direction="column" spacing={2}>
                                    <Grid item xs={1}>
                                        <div
                                            style={{
                                                width: "700px",
                                                height: "300px",
                                                border: "2px solid #dd742d",
                                                marginLeft: 200
                                            }}
                                        >
                                            <Maps selectPosition={selectPosition}/>
                                        </div>
                                    </Grid>
                                </Grid>
                                <br/>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} >
                                        <Typography  variant="h6">Detalii:</Typography>
                                        <Typography textAlign={"left"} marginLeft={"200px"} variant="body1">
                                            Categorie: {announcement.category}<br/>
                                            <Divider />
                                            Tip: {announcement.type}<br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <br/>
                                        <Typography textAlign={"left"} variant="body1">
                                            Etaj: {announcement.floor}<br/>
                                            <Divider />
                                            Număr de camere: {announcement.numberRooms}<br/>
                                            <Divider />
                                            Anul construcției: {announcement.constructionYear}<br/>
                                            <Divider />
                                            Dată: {announcement.date}<br/>
                                            <Divider />
                                            Oraș: {announcement.city}<br/>
                                            <Divider />
                                            Preț: {announcement.price}<br/>
                                            <Divider />
                                            Suprafață utilă: {announcement.usefulSurface}<br/>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item spacing={2}>
                                <Grid item>
                                    <ContactForm/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
        </div>
    );
}