import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {AppBar, Button, Grid, Paper, TextField, Toolbar, Typography} from '@mui/material';
import {styled} from "@mui/system";
import ImageCarousel from "./Image";
import ContactForm from "./contactForm/ContactForm";
import Maps from "./maps/Maps";
import Divider from "@mui/material/Divider";

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
    const [announcement, setAnnouncement] = useState([]);
    const [isLoading, setIsLoading] = useState([true, true]);
    const [selectPosition, setSelectPosition] = useState(null);
    const [user, setUser] = useState([]);

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
                setIsLoading(Array(false, isLoading[1]));
            })
            .catch((error) => {
                setIsLoading(Array(false, isLoading[1]));
            });

        axios
            .get("http://localhost:8080/users/postUserDetails/" + id, config)
            .then((response) => {
                setUser(response.data)
                setIsLoading(Array(isLoading[0], false));
            })
            .catch((error) => {
                setIsLoading(Array(isLoading[0], false));
            });
    }, []);

    const classes = useStyles();

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href={'/homepage'}>Acasă</Button>
                    <Button color="inherit" href={'/userPage'}>Anunțurile mele</Button>
                </Toolbar>
            </AppBar>
            {
                isLoading[0] === true && isLoading[1] === true  ? (
                    <div>Page is loading...</div>
                ) : (
                    <Paper
                        sx={{
                            p: 2,
                            margin: 'auto',
                            flexGrow: 1,
                        }}
                    >
                        <Grid container direction="row" spacing={1}>
                            <Grid item xs container direction="column" spacing={1}>
                                <Grid item>
                                    <Grid item>
                                        {announcement.images!==null && announcement.images!=undefined ?
                                            < ImageCarousel images={announcement.images} width={700} height={500}/>
                                            :<div>Imaginile se incarca</div>
                                        }
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
                                <Grid item sx={{marginLeft: "200px", textAlign: "left"}}>
                                    <Typography variant="h6">Descrierea proprietății:</Typography>
                                    <Typography variant="body1">
                                        {announcement.description}
                                    </Typography>
                                </Grid>
                                <br/>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="h6">Detalii:</Typography>
                                        <Typography textAlign={"left"} marginLeft={"200px"} variant="body1">
                                            Categorie: {announcement.category}<br/>
                                            <Divider/>
                                            Tip: {announcement.type}<br/>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <br/>
                                        <Typography textAlign={"left"} variant="body1">
                                            Etaj: {announcement.floor}<br/>
                                            <Divider/>
                                            Număr de camere: {announcement.numberRooms}<br/>
                                            <Divider/>
                                            Anul construcției: {announcement.constructionYear}<br/>
                                            <Divider/>
                                            Oraș: {announcement.city}<br/>
                                            <Divider/>
                                            Suprafață utilă: {announcement.usefulSurface} mp<br/>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item spacing={2}>
                                <Grid item>
                                    <ContactForm postId={id}/>
                                </Grid>
                                <br/>
                                <Grid item>
                                    <Typography textAlign={"left"} variant="h6">Informații proprietar:</Typography>
                                    <br/>
                                    <Typography textAlign={"left"} variant="body1">
                                        Nume: {user.lastName}<br/>
                                        <Divider/>
                                        Prenume: {user.firstName}<br/>
                                        <Divider/>
                                        Telefon: {user.phoneNumber}<br/>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                )}
        </div>
    );
}