import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { userSignup } from "../components/dbCalls";

const SignUp = () => {
    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [name,setName] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null);
    
    //handles any change when creating the info
    const handleUser = (event) => {
        setUsername(event.target.value);
        setName(event.target.value)
      };
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };


    async function signUp(e) {
        e.preventDefault()
        //sign up funciton here
        if (confirmPassword !== password){
            alert("Passwords do not match")
            return
        }
        try{
            const response = await userSignup({name,username,password})
            alert("User has successfully signed up")
        }
        catch(error){
            alert("Error signing user:",error)
        }
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
                            onChange={handleUser}
                        />
                        <InputLabel>
                            Password
                        </InputLabel>
                        <TextField
                            type="password"
                            onChange={handlePassword}
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