import {useState} from "react";
import {styled} from "@mui/system";
import {Card, CardMedia, Container, IconButton} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "react-image";

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

const ImageCarousel = ({images}) => {
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
        <Container style={{width: "200px",height:"200px", marginTop: "24px"}}>
            <div className={classes.root}>
                <Card>
                    <img
                        src={"data:image/png;base64," + images[index]}
                        alt={"Image " + index}
                        width={200}
                        height={200}
                    />
                </Card>
                {images.length > 1 && (
                    <IconButton className={classes.button} onClick={handleNext}>
                        <ArrowForwardIosIcon/>
                    </IconButton>
                )}
            </div>
        </Container>
    );
};

export default ImageCarousel;
