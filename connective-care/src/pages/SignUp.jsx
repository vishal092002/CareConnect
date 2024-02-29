import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const SignUp = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    function signUp() {
        //sign up funciton here
    }

    return(
        <div>
            <NavBar />
            <Box className="boundingBox" sx={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box className="signupBox" sx={{
                    width: "30%",
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#000000",
                    backgroundColor: "#CCCCCC"
                }}>
                    <Typography variant="h3">
                        Sign Up
                    </Typography>
                    <form onSubmit={signUp}>
                        <InputLabel>
                            Username
                        </InputLabel>
                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <InputLabel>
                            Password
                        </InputLabel>
                        <TextField
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputLabel>
                            Confirm Password
                        </InputLabel>
                        <TextField
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Box>
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </form>
                    <p>detecting input: {username} {password} {confirmPassword}</p>
                </Box>
            </Box>
        </div>
    )
}

export default SignUp;