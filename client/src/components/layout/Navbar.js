import React, { useContext } from "react";
import axios from 'axios';
import { useHistory } from 'react-router';
import AuthContext from "../../context/AuthContext";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    }
}));


export default function Navbar() {
    const { loggedIn, getLoggedIn } = useContext(AuthContext);
    const classes = useStyles();
    const history = useHistory();

    const [drawerState, setDrawerState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState({ ...drawerState, [anchor]: open });
    };

    async function logOut() {
        await axios.get("/user/logout");
        await getLoggedIn();
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{ position: "absolute", left: "0px", top: "0px" }}>
                <Toolbar>
                    {loggedIn === true && (
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon onClick={toggleDrawer("left", true)}></MenuIcon>
                            <Drawer anchor="left" open={drawerState["left"]} onClose={toggleDrawer("left", false)}>
                                <div
                                    className={clsx(classes.list)}
                                    role="presentation"
                                    onClick={toggleDrawer("left", false)}
                                    onKeyDown={toggleDrawer("left", false)}
                                >
                                    <List>
                                        <ListItem button key="Home" >
                                            <NavLink className="mdc-list-item" to="/home" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }} >Home</NavLink>
                                        </ListItem>
                                        <br />
                                        <ListItem button key="SavedBooks">
                                            <NavLink className="mdc-list-item" style={{ fontFamily: "Roboto, Helvetica, Arial, sans-serif" }} to="/saved">Saved Books</NavLink>
                                        </ListItem>
                                    </List>
                                </div>
                            </Drawer>
                        </IconButton>
                    )}
                    < Typography variant="h6" className={classes.title}>
                        Google Books Search
                    </Typography>
                    {loggedIn === true && (<Button color="inherit" onClick={logOut}>Logout</Button>)}
                </Toolbar>
            </AppBar>
        </div >
    );
}
