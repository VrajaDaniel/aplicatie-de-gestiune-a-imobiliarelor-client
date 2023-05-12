import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Paper, Select, TextField} from '@mui/material';
import {styled} from "@mui/system";
import Maps from "./maps/Maps";
import SearchBox from "./maps/SearchBox";
import ImageCarousel from "./Image";

const useStyles = styled((theme) => ({
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2),
        "& .MuiTextField-root": {
            margin: theme.spacing(2),
            width: "auto",
        },
        "& .MuiButton-root": {
            margin: theme.spacing(2),
        },
    },
}));

const PostUpdate = () => {
    const {id} = useParams();
    const classes = useStyles();
    const [announcement, setAnnouncement] = useState(null);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [city, setCity] = useState('');
    const [price, setPrice] = useState(0);
    const [usefulSurface, setUsefulSurface] = useState(0);
    const [floor, setFloor] = useState(0);
    const [numberRooms, setNumberRooms] = useState(0);
    const [constructionYear, setConstructionYear] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [selectPosition, setSelectPosition] = useState(null);
    const [files, setFiles] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
    };

    const handleFileSelect = (e) => {
        setFiles([...files, ...e.target.files]);
    };

    const handleRemoveFile = (index) => {
        setFiles(files.filter((file, i) => i !== index));
    };

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
        };
        axios
            .get("http://localhost:8080/post/" + id, config)
            .then((response) => {
                console.log(response.status)
                if (response.status === 200) {
                    setAnnouncement(response.data)
                    const data = response.data;
                    setTitle(data.title);
                    setDescription(data.description);
                    setDate(data.date);
                    setCity(data.city);
                    setPrice(data.price);
                    setUsefulSurface(data.usefulSurface);
                    setFloor(data.floor);
                    setNumberRooms(data.numberRooms);
                    setConstructionYear(data.constructionYear);
                    setCategory(data.category);
                    setType(data.type);
                    //setSelectPosition(data.selectPosition);
                }
            })

    }, []);

    const isLoading = announcement === null;

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div> // Show loading component while announcement is null
            ) : (
                <div>
                    <Grid container direction="row"
                          justifyContent="center"
                          alignItems="center">
                        <Paper style={{padding: "16px"}}>
                            <Grid item>
                                <TextField
                                    label="Title"
                                    variant="outlined"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    multiline
                                    rows={4}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Date"
                                    type="date"
                                    variant="outlined"
                                    value={date}
                                    onChange={(event) => setDate(event.target.value)}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="City"
                                    variant="outlined"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    type="number"
                                    value={price}
                                    onChange={(event) => setPrice(event.target.value)}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Useful Surface"
                                    variant="outlined"
                                    type="number"
                                    value={usefulSurface}
                                    onChange={(event) => setUsefulSurface(event.target.value)}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Floor"
                                    variant="outlined"
                                    type="number"
                                    value={floor}
                                    onChange={(event) => setFloor(event.target.value)}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Number of Rooms"
                                    variant="outlined"
                                    type="number"
                                    value={numberRooms}
                                    onChange={(event) => setNumberRooms(event.target.value)}
                                    InputProps={{
                                        inputProps: {
                                            min: 0,
                                        },
                                    }}
                                    required
                                />
                                <br/>
                                <TextField
                                    label="Construction Year"
                                    variant="outlined"
                                    type="number"
                                    value={constructionYear}
                                    onChange={(event) => setConstructionYear(event.target.value)}
                                />
                                <br/>
                                <FormControl variant="outlined" required>
                                    <InputLabel id="category-label">Category</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        label="Category"
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                    >
                                        <MenuItem value="real-estate">Real Estate</MenuItem>
                                        <MenuItem value="vehicles">Vehicles</MenuItem>
                                        <MenuItem value="jobs">Jobs</MenuItem>
                                        <MenuItem value="services">Services</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <FormControl variant="outlined" required>
                                    <InputLabel id="type-label">Type</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        label="Type"
                                        value={type}
                                        onChange={(event) => setType(event.target.value)}
                                    >
                                        <MenuItem value="apartment">Apartment</MenuItem>
                                        <MenuItem value="house">House</MenuItem>
                                        <MenuItem value="office">Office</MenuItem>
                                        <MenuItem value="land">Land</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>

                                <Grid item>
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            width: "350px",
                                            height: "200px",
                                            paddingTop: 20,
                                        }}
                                    >
                                        <div
                                            style={{
                                                width: "50vw",
                                                height: "100%",
                                                border: "2px solid #dd742d",
                                            }}
                                        >
                                            <Maps selectPosition={selectPosition}/>
                                        </div>
                                        <div style={{width: "100px", paddingLeft: "10px"}}>
                                            <SearchBox
                                                selectPosition={selectPosition}
                                                setSelectPosition={setSelectPosition}
                                            />
                                        </div>
                                    </div>
                                    <ImageCarousel images={announcement.images}/>
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
                                            style: {display: "none"},
                                        }}
                                    />
                                    <Box sx={{display: "flex", flexWrap: "wrap"}}>
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
                                                    style={{objectFit: "cover"}}
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
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
            )}
        </div>

    );
}

export default PostUpdate;