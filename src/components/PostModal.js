import React, {useState} from "react";
import {
    Box,
    FormControl,
    Input,
    InputLabel,
    MenuItem,
    Modal,
    Paper,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {styled} from "@mui/system";
import Maps from "./maps/Maps";
import SearchBox from "./maps/SearchBox";
import Button from "@mui/material/Button";
import axios from "axios";

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

const categories = ["Apartamente", "Case", "Spatii_comerciale"];
const types = ["Vanzare", "Inchiriere"];

const Post = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

    const [selectPosition, setSelectPosition] = useState(null);
    const [files, setFiles] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [price, setPrice] = useState(0);
    const [usefulSurface, setUsefulSurface] = useState(0);
    const [floor, setFloor] = useState(0);
    const [numberRooms, setNumberRooms] = useState(1);
    const [constructionYear, setConstructionYear] = useState(1900);
    const [category, setCategory] = useState("");
    const [type, setType] = useState("");

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

    const handleCreate = () => {
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
            type: type,
        };

        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        formData.append("postRequestBody", JSON.stringify(data));

        const config = {
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token"),
                'Content-Type': 'multipart/form-data'
            },
        };

        axios
            .post("http://localhost:8080/post", formData, config)
            .then((response) => {
                // handle success response
            })
            .catch((error) => {
                // handle error response
            });
        handleClose()
    };

    return (
        <div>
            <Modal sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} open={props.open}
                   onClose={props.onClose}>
                <Paper className={classes.paper} sx={{maxHeight: '90vh', maxWidth: '90vw', overflow: 'auto'}}>
                    <Typography variant="h6">Create Announcement</Typography>
                    <form>
                        <TextField onChange={(e) => setTitle(e.target.value)} label="Titlu" fullWidth sx={{mt: 2}}/>
                        <TextField onChange={(e) => setDescription(e.target.value)} label="Descriere" multiline
                                   fullWidth sx={{mt: 2}}/>
                        <TextField onChange={(e) => setCity(e.target.value)} label="Oras" fullWidth sx={{mt: 2}}/>
                        <TextField onChange={(e) => setPrice(e.target.value)} label="Pret" fullWidth sx={{mt: 2}}/>
                        <TextField onChange={(e) => setUsefulSurface(e.target.value)} label="Suprafata utila" fullWidth
                                   sx={{mt: 2}}/>
                        <TextField onChange={(e) => setFloor(e.target.value)} label="Etaj" fullWidth sx={{mt: 2}}/>
                        <TextField onChange={(e) => setNumberRooms(e.target.value)} label="Numar de camere" fullWidth
                                   sx={{mt: 2}}/>
                        <TextField onChange={(e) => setConstructionYear(e.target.value)} label="Anul constructiei"
                                   fullWidth sx={{mt: 2}}/>
                        <FormControl fullWidth className={classes.formControl} sx={{mt: 2}}>
                            <InputLabel>Category</InputLabel>
                            <Select onChange={(e) => setCategory(e.target.value)}>
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth className={classes.formControl} sx={{mt: 2}}>
                            <InputLabel>Type</InputLabel>
                            <Select onChange={(e) => setType(e.target.value)}>
                                {types.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                width: "100%",
                                height: "40vh",
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
                            <div style={{width: "50vw", paddingLeft: "10px"}}>
                                <SearchBox
                                    selectPosition={selectPosition}
                                    setSelectPosition={setSelectPosition}
                                />
                            </div>
                        </div>
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