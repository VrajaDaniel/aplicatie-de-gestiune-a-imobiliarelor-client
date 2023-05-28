import * as React from 'react';
import {Global} from '@emotion/react';
import {styled} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {grey} from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import {Button, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";

const drawerBleeding = 56;

const Root = styled('div')(({theme}) => ({
    height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({theme}) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer(props) {
    const {window} = props;
    const container = window !== undefined ? () => window().document.body : undefined;

    const [minUsefullSurface, setUsefullSurface] = React.useState(0);
    const [minPrice, setMinPrice] = React.useState(0);
    const [maxPrice, setMaxPrice] = React.useState(999999999);
    const [category, setCategory] = React.useState('');
    const [type, setType] = React.useState('');
    const [roomNumber, setRoomNumber] = React.useState(-1);
    const [floor, setFloor] = React.useState(-1);
    const [city, setCity] = React.useState('');
    const [minConstructionYear, setMinConstructionYear] = React.useState(0);

    const filterAnnouncements = (announcements) => {
        return announcements.filter((announcement) => {
            const meetsUsefullSurface = announcement.usefulSurface >= minUsefullSurface;
            const meetsPriceRange = announcement.price >= minPrice && announcement.price <= maxPrice;
            const meetsCategory = category === '' || announcement.category === category;
            const meetsType = type === '' || announcement.type === type;
            const meetsRoomNumber = roomNumber === -1 || announcement.roomNumber === roomNumber;
            const meetsFloor = floor === -1 || announcement.floor === floor;
            const meetsCity = city === '' || announcement.city === city;
            const meetsConstructionYear = announcement.constructionYear >= minConstructionYear;

            return (
                meetsUsefullSurface &&
                meetsPriceRange &&
                meetsCategory &&
                meetsType &&
                meetsRoomNumber &&
                meetsFloor &&
                meetsCity &&
                meetsConstructionYear
            );
        });
    };

    function deleteFilters() {
        setUsefullSurface(0);
        setMinPrice(0);
        setMaxPrice(999999999);
        setCategory('');
        setType('');
        setRoomNumber(-1);
        setFloor(-1);
        setCity('');
        setMinConstructionYear(0);
        props.setAnnouncements(props.allAnnouncements)
    }

    function applyFilters() {
        console.log("Filters begin")
        props.setAnnouncements(filterAnnouncements(props.allAnnouncements));
        console.log(props.announcements)
    }

    return (
        <Root>
            <CssBaseline/>
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <Box sx={{textAlign: 'center', pt: 1}}>
            </Box>
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={props.showFilters}
                onClose={props.toggleFilters}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderTopLeftRadius: 8,
                        borderTopRightRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                    }}
                >
                    <Puller/>
                    <Typography sx={{p: 2, color: 'text.secondary'}}>Filtre</Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >

                    <Grid container spacing={2} marginTop={"10px"}>
                        <Grid item xs={1} sm={1} md={4}>
                            <TextField
                                label="Suprafata minima"
                                variant="outlined"
                                value={minUsefullSurface === 0 ? '' : minUsefullSurface}
                                onChange={(event) => setUsefullSurface(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <TextField
                                label="Pret minim"
                                variant="outlined"
                                value={minPrice === 0 ? '' : minPrice}
                                onChange={(event) => setMinPrice(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <TextField
                                label="Pret maxim"
                                variant="outlined"
                                value={maxPrice === 999999999 ? '' :maxPrice}
                                onChange={(event) => setMaxPrice(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <TextField
                                label="Etaj"
                                variant="outlined"
                                value={floor === -1 ? '' :floor}
                                onChange={(event) => setFloor(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <TextField
                                label="Numar camere"
                                variant="outlined"
                                value={roomNumber === -1 ? '':roomNumber}
                                onChange={(event) => setRoomNumber(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <TextField
                                label="Anul constructiei"
                                variant="outlined"
                                value={minConstructionYear === 0 ? '':minConstructionYear}
                                onChange={(event) => setMinConstructionYear(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <InputLabel id="type">Tip</InputLabel>
                            <Select
                                labelId="type"
                                variant="outlined"
                                value={type}
                                onChange={(event) => setType(event.target.value)}
                            >
                                <MenuItem value="Vanzare">Vanzare</MenuItem>
                                <MenuItem value="Inchiriere">Inchiriere</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <InputLabel id="category-label">Categorie</InputLabel>
                            <Select
                                labelId="category-label"
                                variant="outlined"
                                value={category}
                                onChange={(event) => setCategory(event.target.value)}
                            >
                                <MenuItem value="Apartamente">Apartamente</MenuItem>
                                <MenuItem value="Spatii_comerciale">Spatii_comerciale</MenuItem>
                                <MenuItem value="Case">Case</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <InputLabel id="city">Oras</InputLabel>
                            {props.allAnnouncements && props.allAnnouncements.length > 0 ? (
                                <Select
                                    labelId="type"
                                    variant="outlined"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                >
                                    {props.allAnnouncements.map((option) => (
                                        <MenuItem key={option.city} value={option.city}>
                                            {option.city}
                                        </MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <span>Loading data...</span>
                            )}
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <Button onClick={() => applyFilters()}>Aplica filtre</Button>
                        </Grid>
                        <Grid item xs={1} sm={1} md={4}>
                            <Button onClick={() => deleteFilters()}>Sterge filtre</Button>
                        </Grid>
                    </Grid>
                </StyledBox>
            </SwipeableDrawer>
        </Root>
    );
}

export default SwipeableEdgeDrawer;