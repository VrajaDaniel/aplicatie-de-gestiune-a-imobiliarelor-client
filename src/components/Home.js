import React from 'react';
import { Container, Typography, Grid, Card, CardContent } from '@mui/material';



const HomePage = () => {

    const announcements = [
        {
            id: 1,
            title: 'Luxury apartments in the heart of the city',
            description:
                'Discover our latest luxury apartments in the heart of the city, with stunning views and modern amenities.',
            imageUrl: 'https://source.unsplash.com/random/400x200?apartment',
        },
        {
            id: 2,
            title: 'Beautiful countryside villas',
            description:
                'Escape to the countryside and experience our beautiful villas, surrounded by rolling hills and picturesque landscapes.',
            imageUrl: 'https://source.unsplash.com/random/400x200?villa',
        },
        {
            id: 3,
            title: 'Stylish condos with ocean views',
            description:
                'Enjoy the best of both worlds with our stylish condos, located just steps away from the beach and offering stunning ocean views.',
            imageUrl: 'https://source.unsplash.com/random/400x200?condo',
        },
    ];

    return (
        <Container maxWidth="lg">
            <Typography variant="h3" component="h1" align="center" gutterBottom>
                Real Estate Announcements
            </Typography>
            <Grid container spacing={4}>
                {announcements.map((announcement) => (
                    <Grid item key={announcement.id} xs={12} md={4}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {announcement.title}
                                </Typography>
                                <Typography>{announcement.description}</Typography>
                            </CardContent>
                            <img src={announcement.imageUrl} alt="" style={{ height: 200, width: '100%', display: 'block' }} />
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default HomePage;
