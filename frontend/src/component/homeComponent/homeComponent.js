import logo from "../../logo.svg";
import React from "react";
import {Button, Card, CardContent, Container, Grid, Paper} from "@material-ui/core";
import {Link} from "react-router-dom";
import GovComponent from "../govComponent/govComponent";
import OngComponent from "../ong-component/ong-component";

export default function Home() {
    return (
        <div className="App" style={{marginTop: 150}}>
            <Paper style={{height: "200vh"}}>
                <Container>
                <Grid container spacing={1}>
                    <Grid item xs alignItems="center">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Button
                                    size="big"
                                    variant="text"
                                    component={Link}
                                    to="/gov"
                                    color="default">
                                    Government
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs alignItems="center">
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <Button
                                    size="big"
                                    variant="text"
                                    component={Link}
                                    to="/ong"
                                    color="default">
                                    ONG
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    </Grid>
                </Container>
            </Paper>
        </div>
    );
}
