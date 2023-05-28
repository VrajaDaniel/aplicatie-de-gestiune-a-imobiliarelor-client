import React, {useEffect, useState} from 'react';
import {AppBar, Button, Card, CardContent, Container, Grid, Toolbar, Typography,Box,Pagination} from '@mui/material';
import axios from "axios";
import ImageCarousel from "./Image";
import {useHistory} from "react-router-dom";
import FilterSortComponent from "./filter/Filter";

const HomePage = () => {
    const history = useHistory();
    const [allAnnouncements, setAllAnnouncements] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const itemsPerPage = 6;

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(announcements.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const currentItems = announcements.slice(startIndex, endIndex);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
    };

    function handleView(announcement) {
        history.push(`/announcement/${announcement.id}/view`);
    }

    const [showFilters, setShowFilters] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

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
                console.log(announcements)
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href={'/userPage'}>Anunturile mele</Button>
                    <Button color="inherit" onClick={toggleFilters}>Afiseaza Filtre</Button>
                </Toolbar>
            </AppBar>
            {
                isLoading === true ? (
                    <div>Page is loading...</div>
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
                                                    <Typography>{announcement.description}</Typography>
                                                </CardContent>
                                                <ImageCarousel images={announcement.images} width={200} height={200}/>
                                                <br/>
                                                <Button onClick={()=>handleView(announcement)}>Vizualizeaza</Button>
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
                        <FilterSortComponent isLoading={isLoading} setAnnouncements={setAnnouncements} announcements={announcements} allAnnouncements={allAnnouncements} showFilters={showFilters} toggleFilters={toggleFilters}/>
                    </div>
                )
            }
        </>
    );
};

export default HomePage;
