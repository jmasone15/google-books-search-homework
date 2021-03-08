import React, { useContext, useState, useEffect } from 'react';
import UserContext from "../../context/UserContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from "@material-ui/icons/Delete";
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

export default function SavedContainer() {
    const classes = useStyles();
    const { userId } = useContext(UserContext);
    const [savedBooks, setSavedBooks] = useState([]);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function getSavedBooks() {
        const userBooks = await axios.get(`/api/${userId}`);
        console.log(userBooks.data)
        setSavedBooks(userBooks.data);
    }

    async function removeBook(e, id) {
        e.preventDefault();

        try {
            await axios.delete(`/api/remove/${id}`);
            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getSavedBooks()
    }, []);

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
        >
            <Grid>
                <Card className={classes.root1} variant="outlined" style={{ marginTop: "75px" }}>
                    <CardContent>
                        <Typography variant="h4" component="h2" style={{ textAlign: "center" }}>
                            Your Saved Books
                </Typography>
                        {savedBooks.map((book) => (
                            <Card className={classes.root2} key={book._id} variant="outlined" style={{ marginTop: "25px" }}>
                                <CardHeader
                                    title={book.title}
                                    style={{ textAlign: "center" }}
                                />
                                <CardMedia
                                    className={classes.media}
                                    image={book.image}
                                    title="Paella dish"
                                />
                                <CardActions disableSpacing>
                                    <IconButton aria-label="Remove from saved books">
                                        <DeleteIcon onClick={(e) => removeBook(e, book._id)} />
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
                                            {book.description}
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        ))}

                    </CardContent >
                </Card >
            </Grid>
        </Grid>
    )
}