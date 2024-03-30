import React from "react";
import { NavBar } from "../components/NavBar";
import { Typography, Button } from "@mui/material";

const Home = () => {

    return(
        <div>
            <NavBar />
            <Typography variant="h1">
                ConnectiveCare
            </Typography>
            <Typography variant="h4">
                Revolutionizing Non-Emergency Medical Transportation
            </Typography>
            <Typography>&nbsp;</Typography>
            <Button 
                href="./SignUp"
            >
                <Typography color="#FFFFFF">New User?</Typography>
                <Typography>&nbsp;</Typography>
                <Typography color="#88FFAA">Sign Up Here</Typography>
            </Button>
            <div></div>
            <Button 
                href="./SignIn"
            >
                <Typography color="#FFFFFF">Returning User?</Typography>
                <Typography>&nbsp;</Typography>
                <Typography color="#88FFAA">Sign In Here</Typography>
            </Button>
        </div>
    )
}

export default Home;