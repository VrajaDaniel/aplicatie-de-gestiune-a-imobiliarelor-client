import React, {useState} from "react";
import {
    AppBar,
    Box,
    Button,
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    FormGroup,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Toolbar,
    Typography
} from "@mui/material";
import { styled } from "@mui/system";

const useStyles = styled((theme) => ({
    paper: {
        position: "absolute",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    checkboxControl: {
        display: "flex",
    },
}));

const categories = ["Sale", "Rent"];
const types = [
    "Apartment",
    "House",
    "Villa",
    "Office",
    "Retail",
    "Industrial",
    "Land",
];

const Post= (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const [files, setFiles] = useState([]);

    const handleFileSelect = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const handleRemoveFile = (index) => {
        setFiles(files.filter((file, i) => i !== index));
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedAnnouncement(null);
    };

    const handleCreate = (announcement) => {
        handleClose()
    };

    return (
        <div>
            <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} open={props.open} onClose={props.onClose}>
                <Paper className={classes.paper} sx={{ maxHeight: '90vh', maxWidth: '90vw', overflow: 'auto' }}>
                    <Typography variant="h6">Create Announcement</Typography>
                    <form>
                        <TextField label="Title" fullWidth sx={{mt: 2}}/>
                        <TextField label="Description" multiline fullWidth sx={{mt: 2}}/>
                        <TextField label="Date" fullWidth sx={{mt: 2}}/>
                        <TextField label="City" fullWidth sx={{mt: 2}}/>
                        <TextField label="Price" fullWidth sx={{mt: 2}}/>
                        <TextField label="Useful Surface" fullWidth sx={{mt: 2}}/>
                        <TextField label="Floor" fullWidth sx={{mt: 2}}/>
                        <TextField label="Number of Rooms" fullWidth sx={{mt: 2}}/>
                        <TextField label="Construction Year" fullWidth sx={{mt: 2}}/>
                        <FormControl fullWidth className={classes.formControl} sx={{mt: 2}}>
                            <InputLabel>Category</InputLabel>
                            <Select>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl} sx={{mt: 2}}>
                            <InputLabel>Type</InputLabel>
                            <Select>
                                {types.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormGroup className={classes.checkboxControl} sx={{mt: 2}}>
                            <FormControlLabel control={<Checkbox/>} label="Balcony"/>
                            <FormControlLabel control={<Checkbox/>} label="Garage"/>
                            <FormControlLabel control={<Checkbox/>} label="Furnished"/>
                            <FormControlLabel control={<Checkbox/>} label="Pet-friendly"/>
                        </FormGroup>
                        <TextField label="Latitude" fullWidth sx={{mt: 2}}/>
                        <TextField label="Longitude" fullWidth sx={{mt: 2}}/>
                        <TextField label="User ID" fullWidth sx={{mt: 2}}/>
                        <InputLabel htmlFor="file-upload" shrink>
                            Select files
                        </InputLabel>
                        <Input
                            id="file-upload"
                            type="file"
                            multiple
                            onChange={handleFileSelect}
                            inputProps={{
                                accept: "image/*",
                                style: { display: "none" },
                            }}
                        />
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                            {files.map((file, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        width: "100px",
                                        height: "100px",
                                        position: "relative",
                                        margin: "10px",
                                    }}
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`Preview ${index + 1}`}
                                        width="100%"
                                        height="100%"
                                        style={{ objectFit: "cover" }}
                                    />
                                    <Button
                                        onClick={() => handleRemoveFile(index)}
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            width: "30px",
                                            height: "30px",
                                            minWidth: 0,
                                            borderRadius: "50%",
                                            backgroundColor: "rgba(255, 255, 255, 0.7)",
                                            color: "red",
                                            "&:hover": {
                                                backgroundColor: "rgba(255, 255, 255, 1)",
                                            },
                                        }}
                                    >
                                        X
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                        <Button variant="contained" color="primary" fullWidth onClick={handleCreate} sx={{mt: 2}}>
                            Create
                        </Button>
                    </form>
                </Paper>
            </Modal>
        </div>
    );
};

export default Post;