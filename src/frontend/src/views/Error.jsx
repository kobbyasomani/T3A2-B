import React from 'react';
import {
    useRouteError,
    Link
} from "react-router-dom";

import NavBar from "../components/root/NavBar";
import Footer from "../components/root/Footer";
import { ButtonPrimary } from "../components/root/Buttons";

import { Typography, Box, Container } from "@mui/material"

export default function Error() {
    const error = useRouteError();
    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
        }}>
            <NavBar />
            <Container component="main"
                sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h1">{error.statusText}</Typography>
                <Typography variant="h2">{error.message}</Typography>
                <Typography variant="body1">
                    Oops! It looks like the page you were trying to visit could not be found.
                    <br />Check that you've entered the correct URL in the address bar.
                </Typography>
                <Link to="/" className="button-link">
                    <ButtonPrimary>
                        Return Home
                    </ButtonPrimary>
                </Link>
            </Container>
            <Footer />
        </Box>
    )
}