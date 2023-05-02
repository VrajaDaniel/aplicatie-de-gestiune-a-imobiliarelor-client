import {useState} from "react";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PostModal from "./PostModal";

const announcements = [
    {
        id: 1,
        title: "Spacious 2-Bedroom Apartment",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices purus eget erat suscipit viverra. Nulla auctor lorem quis dolor fermentum, vel bibendum arcu semper.",
    },
    {
        id: 2,
        title: "Luxury Penthouse with Panoramic View",
        description:
            "Nullam interdum sapien a quam suscipit, eu laoreet purus tincidunt. Nulla imperdiet nisi eget tellus mollis, ac interdum arcu finibus.",
    },
    {
        id: 3,
        title: "Charming Cottage in the Countryside",
        description:
            "Sed id enim in urna efficitur eleifend. Praesent bibendum mauris nec erat fermentum consequat. Fusce non mauris non magna tincidunt gravida.",
    },
];

const UserPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const handleOpen = (announcement) => {
        setSelectedAnnouncement(announcement);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAnnouncement(null);
    };

    const handleDelete = (announcement) => {
        // Delete the announcement from the list
    };

    const handleEdit = (announcement) => {
        // Edit the announcement
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Real Estate Announcements
                    </Typography>
                    <Button color="inherit">Home</Button>
                    <Button color="inherit" onClick={handleOpen}>Create Announcement</Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="lg" style={{marginTop: "24px"}}>
                <Grid container spacing={3}>
                    {announcements.map((announcement) => (
                        <Grid item xs={12} md={6} lg={4} key={announcement.id}>
                            <Paper style={{padding: "16px"}}>
                                <Typography variant="h6">{announcement.title}</Typography>
                                <Typography>{announcement.description}</Typography>
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
            <PostModal
                open={open}
            />
        </>
    );
};

export default UserPage;