// IMPORTING APIS
import React from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    useMediaQuery,
    Button,
    useScrollTrigger,
    Slide,
    Menu,
    MenuItem,
    ListItemIcon
} from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

// IMPORTING ICONS
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import SchoolIcon from "@material-ui/icons/School";
import PersonIcon from "@material-ui/icons/Person";
import BookmarksIcon from "@material-ui/icons/Bookmarks";

// REACT APP IMPORTS
import Home from "../homeComponent/homeComponent";
import GovComponent from "../govComponent/govComponent";
import OngComponent from "../ong-component/ong-component";

// LOCAL-STYLING
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

export default function NavComponent() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <AppBar>
                    <Toolbar>
                        <Typography
                            variant="h5"
                            component="p"
                            color="textSecondary"
                            className={classes.title}
                        >
                            EvoNet
                        </Typography>
                        <div style={{ marginRight: "2rem" }}>
                            <Button
                                variant="text"
                                component={Link}
                                to="/"
                                color="default"
                            >
                                <HomeIcon />
                                Home
                            </Button>
                            <Button
                                variant="text"
                                component={Link}
                                to="/gov"
                                color="default"
                            >
                                Government
                            </Button>
                            <Button
                                variant="text"
                                component={Link}
                                to="/ong"
                                color="default"
                            >
                                ONG
                            </Button>
                        </div>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/gov" element={<GovComponent/>} />
                    <Route exact path="/ong" element={<OngComponent/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
