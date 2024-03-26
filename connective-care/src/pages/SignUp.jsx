import React, { useState } from "react";
import PropTypes from 'prop-types';
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { userSignup } from "../components/dbCalls";

const SignUp = () => {
    const [username,setUsername] = useState(null)
    const [password,setPassword] = useState(null)
    const [name,setName] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null);

    const passwordRegex = /(?=.+[a-z])(?=.+[A-Z])(?=.+[0-9])(?=.+[!@#$%^&*])/
    const minimumPasswordLength = 8
    
    //handles any change when creating the info
    const handleUser = (event) => {
        setUsername(event.target.value);
        setName(event.target.value)
      };
    
    const handlePassword = (event) => {
        setPassword(event.target.value);
    };


    async function userSubmit(e) {
        e.preventDefault()
        //sign up funciton here
        // password security rules
        // 1. at least 8 characters
        // 2. at least 1 uppercase and at least 1 lowercase letter
        // 3. at least 1 number
        // 4. at least one special character
        if (password.length < minimumPasswordLength) {
            alert("Password must be at least 8 characters")
            return
        }
        if (!passwordRegex.test(password)) {
            alert("Password must meet the criteria:\n1. Contains at least 1 uppercase letter\n2. Contains at least 1 lowercase letter\n3. Contains at least 1 number\n4. Contains at least 1 special characters")
            return
        }
        if (confirmPassword !== password){
            alert("Passwords do not match")
            return
        }
        try{
            const response = await userSignup({name,username,password})
            alert("User has successfully signed up")
        }
        catch(error){
            console.log(error)
        }
    }

    async function providerSubmit(e) {
        //add provider sign up here
    }

    //tabs
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                  </Box>
                )}
            </div>
        );
    }
    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };
    function tabProps(index) {
        return {
            id: `tab-${index}`,
            'aria-controls': `tabpanel-${index}`,
        };
    };
    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

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
                    height: "60%",
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
                    <Box>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="User" {...tabProps(0)}/>
                            <Tab label="Provider" {...tabProps(1)}/>
                        </Tabs>
                    </Box>
                    <TabPanel value={tabValue} index={0}>
                        <form onSubmit={userSubmit}>
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
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        <form onSubmit={providerSubmit}>
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
                    </TabPanel>
                </Box>
            </Box>
        </div>
    )
}

export default SignUp;