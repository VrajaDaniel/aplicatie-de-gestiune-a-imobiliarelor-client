import React, {useEffect, useState} from 'react';
import {
    AppBar,
    Box,
    Button,
    Card,
    CardContent,
    Container,
    Grid,
    Menu,
    MenuItem,
    Pagination,
    Snackbar,
    Toolbar,
    Typography
} from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from "axios";
import ImageCarousel from "./Image";
import {useHistory} from "react-router-dom";
import FilterSortComponent from "./filter/Filter";

const HomePage = () => {
    const history = useHistory();
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [likedAnnouncements, setLikedAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState([true, true]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(announcements.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = announcements.slice(startIndex, endIndex);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (value) => {
        setAnchorEl(null);
        let sortedAnouncement = sortList(announcements, value);
        setAnnouncements(sortedAnouncement);
    };

    const handlePageChange = (event, page) => {
        console.log(page)
        setCurrentPage(page);
    };

    function handleView(announcement) {
        history.push(`/announcement/${announcement.id}/view`);
    }

    const handleLike = (announcementId) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        };

        if (likedAnnouncements.includes(announcementId)) {
            const updatedArray = likedAnnouncements.filter((id) => id !== announcementId);
            axios
                .delete("http://localhost:8080/like/" + announcementId+"/"+getIdFromToken(localStorage.getItem("token")), config)
                .then((response) => {
                    if (response.status === 200) {
                        setLikedAnnouncements(updatedArray);
                        let updatedAnnouncements = announcements.map(post =>
                            post.id === announcementId
                                ? { ...post, likeNumber: post.likeNumber -1}
                                : post
                        );
                        setAnnouncements(updatedAnnouncements);
                    }
                })
        } else {
            const likeFormData={
                postId:announcementId,
                userId:getIdFromToken(localStorage.getItem("token"))
            }
            axios
                .post("http://localhost:8080/like", likeFormData, config)
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {
                        setLikedAnnouncements([...likedAnnouncements, announcementId]);
                        let updatedAnnouncements = announcements.map(post =>
                            post.id === announcementId
                                ? { ...post, likeNumber: post.likeNumber +1}
                                : post
                        );
                        setAnnouncements(updatedAnnouncements);
                    }
                })
        }
    };

    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    function isAdmin(token) {
        try {
            const base64Url = token.split('.')[1]; // Extract the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
            const decodedToken = JSON.parse(atob(base64)); // Decode the base64-encoded payload
            return decodedToken.authorities.includes('ROLE_ADMIN');
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }

    function getIdFromToken(token) {
        try {
            const base64Url = token.split('.')[1]; // Extract the payload part of the token
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Replace URL-safe characters
            const decodedToken = JSON.parse(atob(base64)); // Decode the base64-encoded payload
            console.log("Decoded token:", decodedToken)
            console.log(decodedToken.userId);
            return decodedToken.userId;
        } catch (error) {
            console.error('Error decoding token:', error);
            return null;
        }
    }


    function sortList(list, parameter) {
        // Clone the list to avoid modifying the original array
        const sortedList = [...list];

        switch (parameter) {
            case 1:
                sortedList.sort((a, b) => a.price - b.price);
                break;
            case 2:
                sortedList.sort((a, b) => b.price - a.price);
                break;
            case 3:
                sortedList.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 4:
                sortedList.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 5:
                sortedList.sort((a, b) => b.likeNumber - a.likeNumber);
                break;
            default:
                // If the parameter is not 1, 2, 3, or 4, return the original list
                return list;
        }

        return sortedList;
    }

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/post/getAll", config)
            .then((response) => {
                setAnnouncements(response.data)
                setAllAnnouncements(response.data)
                setIsLoading(Array(false, isLoading[1]));
            })

        axios
            .get("http://localhost:8080/like/" + getIdFromToken(localStorage.getItem("token")), config)
            .then((response) => {
                setLikedAnnouncements(response.data)
                setIsLoading(Array(isLoading[0], false));
            })
    }, []);

    function logout() {
        localStorage.clear();
        history.push("/");
    }

    const handleDelete = (announcement) => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        };
        axios
            .delete("http://localhost:8080/post/" + announcement.id, config)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setAllAnnouncements(allAnnouncements.filter(item => item.id !== announcement.id))
                    setAnnouncements(announcements.filter(item => item.id !== announcement.id))
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Anuntul dumneavoastra a fost sters cu succes!');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Anuntul nu a putut fi sters!');
                setSnackbarOpen(true);
            });
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href={'/userPage'}>Anunțurile mele</Button>
                    <Button color="inherit" onClick={toggleFilters}>Afișează Filtre</Button>
                    <div>
                        <Button color="inherit" onClick={handleClick}>Sortează
                            după</Button>
                        <Menu
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <MenuItem onClick={() => handleClose(1)}>Preț {<KeyboardArrowUpIcon/>}</MenuItem>
                            <MenuItem onClick={() => handleClose(2)}>Preț {<KeyboardArrowDownIcon/>}</MenuItem>
                            <MenuItem onClick={() => handleClose(3)}>Dată {<KeyboardArrowUpIcon/>}</MenuItem>
                            <MenuItem onClick={() => handleClose(4)}>Dată {<KeyboardArrowDownIcon/>}</MenuItem>
                            <MenuItem onClick={() => handleClose(5)}>Like-uri {<KeyboardArrowDownIcon/>}</MenuItem>
                        </Menu>
                    </div>
                    <Button color="inherit" onClick={logout} style={{marginLeft: 'auto'}}>Deconectare</Button>
                </Toolbar>
            </AppBar>
            {
                isLoading[0] === true && isLoading[1] === true ? (
                    <div>Pagina se incarca...</div>
                ) : (
                    <div>
                        <Box>
                            <br/>
                            <br/>
                            <Container maxWidth="lg">
                                <Grid container direction="row" container spacing={4}>
                                    {currentItems.map((announcement) => (
                                        <Grid item key={announcement.id} xs={12} md={4}>
                                            <Card sx={{height: '100%'}}>
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        {announcement.title}
                                                    </Typography>
                                                    <Typography variant="h6">Preț: {announcement.price} EUR</Typography>
                                                </CardContent>
                                                <ImageCarousel images={announcement.images} width={200} height={200}/>
                                                <br/>
                                                <Button onClick={() => handleView(announcement)}>Vizualizează</Button>
                                                {isAdmin(localStorage.getItem("token")) === true ? (
                                                    <Button onClick={() => handleDelete(announcement)}>Șterge</Button>
                                                ) : null}
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{top: 0, right: 0, margin: 0}}
                                                >
                                                    {announcement.date}
                                                </Typography>
                                                <Button onClick={() => handleLike(announcement.id)}>
                                                    {likedAnnouncements.includes(announcement.id) ? <FavoriteIcon/> :
                                                        <FavoriteBorderIcon/>}
                                                    Like ({announcement.likeNumber})
                                                </Button>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>

                            <Box display="flex" justifyContent="center" mt={2}>
                                <Pagination
                                    count={totalPages}
                                    page={currentPage}
                                    onChange={handlePageChange}
                                    variant="outlined"
                                    shape="rounded"
                                />
                            </Box>
                        </Box>
                        <br/>
                        <br/>
                        <FilterSortComponent isLoading={isLoading} setAnnouncements={setAnnouncements}
                                             announcements={announcements} allAnnouncements={allAnnouncements}
                                             showFilters={showFilters} toggleFilters={toggleFilters}/>
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
            }
        </>
    );
};

export default HomePage;
