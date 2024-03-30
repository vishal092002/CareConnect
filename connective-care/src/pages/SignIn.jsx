import React, { useState } from "react";
import PropTypes from 'prop-types';
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { userLogin } from "../components/dbCalls";

const SignIn = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    async function userSubmit(e) {
        e.preventDefault()
        //sign in funciton here
        const response = await userLogin({username,password})

    }

    async function providerSubmit(e) {
        //add provider sign in here
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
                <Box className="signinBox" sx={{
                    width: "30%",
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#000000",
                    backgroundColor: "#CCCCCC"
                }}>
                    <Box className="signinContent" sx={{
                        width: "100%",
                        height: "flex",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#CCCCCC"
                    }}>
                        <Typography variant="h3">
                            Sign In
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
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <InputLabel>
                                    Password
                                </InputLabel>
                                <TextField
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign In
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
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <InputLabel>
                                    Password
                                </InputLabel>
                                <TextField
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                    >
                                        Sign In
                                    </Button>
                                </Box>
                            </form>
                        </TabPanel>
                    </Box>
                </Box>
            </Box>
        </div>
    )
}

export default SignIn;