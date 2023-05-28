import {useState} from "react";
import {styled} from "@mui/system";
import {Card, Container, Grid, IconButton} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const useStyles = styled({
    root: {
        position: "relative",
        maxWidth: 600,
        minWidth: 200,
        minHeight: 200,
        margin: "0 auto",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    button: {
        position: "absolute",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
    },
});

const ImageCarousel = ({images, width, height}) => {
    const classes = useStyles();
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index === images.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    return (
            <div>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <img
                                src={"data:image/png;base64," + images[index]}
                                alt={"Image " + index}
                                width={width}
                                height={height}
                            />
                        </Grid>
                        <Grid item>
                            {images.length > 1 && (
                                <IconButton className={classes.button} onClick={handleNext}>
                                    <ArrowForwardIosIcon/>
                                </IconButton>
                            )}
                        </Grid>
                    </Grid>
            </div>
    )
        ;
};

export default ImageCarousel;
