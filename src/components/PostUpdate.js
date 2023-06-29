import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {
    AppBar,
    Box,
    Button,
    FormControl,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Snackbar,
    TextField,
    Toolbar
} from '@mui/material';
import {styled} from "@mui/system";
import Maps from "./maps/Maps";
import SearchBox from "./maps/SearchBox";

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

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleSubmit = (event) => {
        event.preventDefault();
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
                    const blobs = data.images.map((base64String) => {
                        // Remove data URL prefix if present
                        const dataUrlPrefix = 'data:image/png;base64,';
                        const base64Data = base64String.replace(dataUrlPrefix, '');

                        // Decode Base64 data and create Uint8Array
                        const decodedData = atob(base64Data);
                        const dataArray = new Uint8Array(decodedData.length);
                        for (let i = 0; i < decodedData.length; i++) {
                            dataArray[i] = decodedData.charCodeAt(i);
                        }

                        return new Blob([dataArray], {type: 'image/png'});
                    });
                    setFiles(blobs)
                    setSelectPosition({
                        lon: data.longitude,
                        lat: data.latitude
                    });
                }
            })

    }, []);

    const isLoading = announcement === null;

    const handleUpdate = () => {
        const data = {
            latitude: selectPosition.lat,
            longitude: selectPosition.lon,
            title: title,
            description: description,
            city: city,
            price: price,
            usefulSurface: usefulSurface,
            floor: floor,
            numberRooms: numberRooms,
            constructionYear: constructionYear,
            category: category,
            type: type
        };

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("postRequestBody", JSON.stringify(data));

        const config = {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token"),
                'Content-Type': 'multipart/form-data'
            },
        };

        axios
            .put("http://localhost:8080/post/" + id, formData, config)
            .then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setSnackbarSeverity('success');
                    setSnackbarMessage('Anuntul dumneavoastra a putut fi actualizat cu succes!');
                    setSnackbarOpen(true);
                }
            })
            .catch((error) => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Anuntul nu a putut fi actualizat!');
                setSnackbarOpen(true);
            });
    };

    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" href={'/homepage'}>Acasă</Button>
                    <Button color="inherit" href={'/userPage'}>Anunțurile mele</Button>
                </Toolbar>
            </AppBar>

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
                                    label="Titlu"
                                    variant="outlined"
                                    value={title}
                                    onChange={(event) => setTitle(event.target.value)}
                                    required
                                />
                                <br/>
                                <br/>
                                <TextField
                                    label="Descriere"
                                    variant="outlined"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    multiline
                                    rows={4}
                                    required
                                />
                                <br/>
                                <br/>
                                <TextField
                                    label="Oraș"
                                    variant="outlined"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    required
                                />
                                <br/>
                                <br/>
                                <TextField
                                    label="Preț"
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
                                <br/>
                                <TextField
                                    label="Suprafață Utilă"
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
                                <br/>
                                <TextField
                                    label="Etaj"
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
                                <br/>
                                <TextField
                                    label="Număr de camere"
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
                                <br/>
                                <TextField
                                    label="Anul construcției"
                                    variant="outlined"
                                    type="number"
                                    value={constructionYear}
                                    onChange={(event) => setConstructionYear(event.target.value)}
                                />
                                <br/>
                                <br/>
                                <FormControl variant="outlined" required>
                                    <InputLabel id="category-label">Categorie</InputLabel>
                                    <Select
                                        labelId="category-label"
                                        label="Category"
                                        value={category}
                                        onChange={(event) => setCategory(event.target.value)}
                                    >
                                        <MenuItem value="Apartamente">Apartamente</MenuItem>
                                        <MenuItem value="Case">Case</MenuItem>
                                        <MenuItem value="Spatii_comerciale">Spații comerciale</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <br/>
                                <FormControl variant="outlined" required>
                                    <InputLabel id="type-label">Tip</InputLabel>
                                    <Select
                                        labelId="type-label"
                                        label="Type"
                                        value={type}
                                        onChange={(event) => setType(event.target.value)}
                                    >
                                        <MenuItem value="Vanzare">Vânzare</MenuItem>
                                        <MenuItem value="Inchiriere">Închiriere</MenuItem>
                                    </Select>
                                </FormControl>
                                <br/>
                                <br/>

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
                                        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                            <div style={{width: "350px", paddingLeft: "10px"}}>
                                                <SearchBox
                                                    selectPosition={selectPosition}
                                                    setSelectPosition={setSelectPosition}
                                                />
                                            </div>
                                            <div
                                                style={{
                                                    width: "25vw",
                                                    height: "100%",
                                                    border: "2px solid #dd742d",
                                                    marginTop: "10px", // optional: space between the search box and the map
                                                }}
                                            >
                                                <Maps selectPosition={selectPosition}/>
                                            </div>
                                        </div>


                                    </div>
                                    <br/>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <InputLabel htmlFor="file-upload" style={{
                                            backgroundColor: "#3f51b5", // Change color as per your needs
                                            color: "white",
                                            width: "160px",
                                            padding: "6px 16px",
                                            fontSize: "0.875rem",
                                            lineHeight: 1.75,
                                            borderRadius: "4px",
                                            textTransform: "uppercase",
                                            cursor: "pointer",
                                            '&:hover': {
                                                backgroundColor: "#002984", // Change hover color as per your needs
                                            }
                                        }}>
                                            Selectează pozele
                                        </InputLabel>
                                    </div>
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
                                    <Button type="submit" onClick={handleUpdate} variant="contained" color="primary">
                                        Salvează
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </div>
            )}
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

    );
}

export default PostUpdate;