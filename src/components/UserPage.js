import React, {useState,useEffect } from "react";
import {AppBar, Button, Container, Grid, IconButton, Paper, Snackbar, Toolbar, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostModal from "./PostModal";
import axios from "axios";
import ImageCarousel from "./Image";
import {useHistory} from "react-router-dom";

const UserPage = () => {
    const [open, setOpen] = useState(false);
    const history = useHistory();

    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [post, setPost] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
        setSnackbarMessage('');
    };

    const handleRequestError = (error) => {
        setSnackbarOpen(true);
        setSnackbarMessage(error.message);
    };

    const handleOpen = (announcement) => {
        setSelectedAnnouncement(announcement);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAnnouncement(null);
    };
    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/post/userPosts",config)
            .then((response) => {
                setPost(response.data)
            })
            .catch((error) => {
                // handle error response
            });
    }, []);

    const handleDelete = (announcement) => {
        const config = {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token"),
            },
        };
        axios
            .delete("http://localhost:8080/post/"+announcement.id,config)
            .then((response) => {
            })
            .catch((error) => {
                // handle error response
            });
    };

    function handleEdit(announcement) {
        history.push(`/announcement/${announcement.id}/edit`);
    }


    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href={'/homepage'}>Acasa</Button>
                    <Button color="inherit" onClick={handleOpen}>Creeaza Anunt</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" style={{marginTop: "24px"}}>
                <Grid container>
                    {post.map((announcement) => (
                        <Grid item xs={12} key={announcement.id}>
                            <Paper style={{padding: "16px"}}>
                                <Typography variant="h6">{announcement.title}</Typography>
                                <Typography>{announcement.description}</Typography>
                                <ImageCarousel images={announcement.images} width={200} height={200}/>
                                <IconButton
                                    color="primary"
                                    onClick={() => handleEdit(announcement)}
                                >
                                    <EditIcon/>
                                </IconButton>
                                <IconButton
                                    color="secondary"
                                    onClick={() => handleDelete(announcement)}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
            <PostModal
                open={open}
                handleCloseModal={handleClose}
                handleRequestError={handleRequestError}
            />
        </>
    );
};

export default UserPage;