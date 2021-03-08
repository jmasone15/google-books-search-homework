import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import UserContext from "../../context/UserContext";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import axios from "axios";
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Collapse from '@material-ui/core/Collapse';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root1: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    root2: {
        maxWidth: 500,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function ResultsContainer({ results }) {
    const classes = useStyles();
    const { userId } = useContext(UserContext);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function saveBook(e, title, description, image, link, authors) {
        e.preventDefault();

        try {
            const bookData = {
                title: title,
                description: description,
                image: image,
                link: link,
                authors: JSON.stringify(authors),
                userId: userId
            }

            await axios.post("/api/save", bookData);
            alert("Book Saved");
            // Add a notification here
        } catch (err) {
            console.error(err)
        }
    }

    async function infoLink(e, link) {
        e.preventDefault();
        window.open(link, "_blank")
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid>
                <Card className={classes.root} variant="outlined" style={{ marginTop: "75px" }}>
                    <CardContent>

                        <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
                            Search Results
                </Typography>
                        {results.map((book) => (
                            <Card className={classes.root2} key={book._id} variant="outlined" style={{ marginTop: "25px" }}>
                                <CardHeader
                                    title={book.volumeInfo.title}
                                    style={{ textAlign: "center" }}
                                />
                                <Typography className={classes.title} color="textSecondary" style={{ textAlign: "center" }} gutterBottom>
                                    Author(s): {book.volumeInfo.authors}
                                </Typography>
                                {/* <CardMedia
                            className={classes.media}
                            // image={book.volumeInfo.imageLinks.smallThumbnail}
                            title="Paella dish"
                        /> */}
                                <CardActions disableSpacing>
                                    <IconButton aria-label="Save book">
                                        <FavoriteIcon
                                            onClick={(e) => saveBook(
                                                e, book.volumeInfo.title, book.volumeInfo.description,
                                                book.volumeInfo.imageLinks.thumbnail, book.volumeInfo.infoLink,
                                                book.volumeInfo.authors
                                            )} />
                                    </IconButton>
                                    <IconButton aria-label="More Info">
                                        <InfoIcon onClick={(e) => infoLink(e, book.volumeInfo.infoLink)} />
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Description:</Typography>
                                        <Typography paragraph>
                                            {book.volumeInfo.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
