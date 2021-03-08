import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
});



export default function UserHeader(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} style={{ textAlign: "center" }} variant="outlined">
            <CardContent>
                <Typography variant="h3" component="h2">
                    (React) Google Books Saved Books
                </Typography>
                <br />
                <Typography variant="h5" component="h2">
                    Welcome, {props.email}.
                </Typography>
            </CardContent>
        </Card>


    );
}
