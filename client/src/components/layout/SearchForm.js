import React, { useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
});

export default function SearchForm(props) {
    const classes = useStyles();
    const [title, setTitle] = useState("");

    async function handleSearchBtn(e, query) {
        await props.searchBook(e, query);
        props.setShow(true);
    }



    return (
        <Card className={classes.root} style={{ marginTop: "75px" }} variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h2">
                    Search for a book by title.
                </Typography>
                <br />
                <Typography variant="h5" component="h2">
                    <form noValidate autoComplete="on">
                        <TextField id="standard-basic" label="Book Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                        <Button variant="outlined" color="primary" style={{ justifyContent: "flex-end" }} onClick={(e) => handleSearchBtn(e, title)}>Submit</Button>
                    </form>
                </Typography>
            </CardContent>
        </Card>
    )
}
