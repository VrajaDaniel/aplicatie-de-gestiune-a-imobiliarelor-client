import React, { useState } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import SearchIcon from '@mui/icons-material/Search';

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

export default function SearchBox(props) {
    const { selectPosition, setSelectPosition } = props;
    const [searchText, setSearchText] = useState("");
    const [listPlace, setListPlace] = useState([]);

    return (
        <div style={{ display: "flex", flexDirection: "column", maxHeight: "40vh"}}>
            <div style={{ display: "flex" }}>
                <div style={{ flex: 1 }}>
                    <OutlinedInput
                        style={{ width: "100%", height:"5vh" }}
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value);
                        }}
                    />
                </div>
                <div
                    style={{ display: "flex", alignItems: "center", padding: "0px 20px" }}
                >
                    <Button
                        variant="contained"
                        color="warning"
                        sx={{height:"5vh"}}
                        onClick={() => {
                            // Search
                            const params = {
                                q: searchText,
                                format: "json",
                                addressdetails: 1,
                                polygon_geojson: 0,
                            };
                            const queryString = new URLSearchParams(params).toString();
                            const requestOptions = {
                                method: "GET",
                                redirect: "follow",
                            };
                            fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
                                .then((response) => response.text())
                                .then((result) => {
                                    console.log(JSON.parse(result));
                                    setListPlace(JSON.parse(result));
                                })
                                .catch((err) => console.log("err: ", err));
                        }}
                    >
                        <SearchIcon/>
                    </Button>
                </div>
            </div>
            <div style={{overflowY: "auto"}}>
                <List component="nav" aria-label="main mailbox folders">
                    {listPlace.map((item) => {
                        return (
                            <div key={item?.place_id}>
                                <ListItem
                                    button
                                    onClick={() => {
                                        setSelectPosition(item);
                                    }}
                                >
                                    <ListItemText primary={item?.display_name} />
                                </ListItem>
                                <Divider />
                            </div>
                        );
                    })}
                </List>
            </div>
        </div>
    );
}