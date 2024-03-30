import React, { useState } from "react";
import PropTypes from 'prop-types';
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { drivers, driverAides, displayAllDrivers, filterDriversByCompany, filterDriverAidesByCompany } from "../data/driverData";


const ProviderDashboard = () => {

    displayAllDrivers(drivers);

    const filteredDrivers = filterDriversByCompany('ABC Taxi');
    const filteredDriverAides = filterDriverAidesByCompany('ABC Taxi');

    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [companyName, setCompanyName] = useState(null);
    const [driverID, setDriverID] = useState(null);
    const [driverPhoto, setDriverPhoto] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    function submit() {
        if (tabValue == 0) {
            //add driver to db
            //form gathers everything but companyName
            //grab that from provider login session once sessions are working
        }
        else if (tabValue == 1) {
            //add driver aid to db
            //form gathers everything but companyName
            //grab that from provider login session once sessions are working
        }
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
                <Box className="driverFormBox" sx={{
                    width: "30%",
                    height: "90%",
                    display: "flex",                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#000000",
                    backgroundColor: "#CCCCCC"
                }}>
                    <Box className="driverFormContent" sx={{
                        width: "100%",
                        height: "flex",
                        display: "flex",                    flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#000000",
                        backgroundColor: "#CCCCCC"
                    }}>
                        <TabPanel value={tabValue} index={0}>
                            <Typography variant="h3">
                                    Register Driver
                            </Typography>
                        </TabPanel>
                        <TabPanel value={tabValue} index={1}>
                            <Typography variant="h3">
                                    Register Driver Aid
                            </Typography>
                        </TabPanel>
                        <Box paddingBottom={"3vh"}>
                            <Tabs value={tabValue} onChange={handleTabChange}>
                                <Tab label="Driver" {...tabProps(0)}/>
                                <Tab label="Driver Aid" {...tabProps(1)}/>
                            </Tabs>
                        </Box>
                        <form onSubmit={submit}>
                            <InputLabel>
                                First Name
                            </InputLabel>
                            <TextField
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <InputLabel>
                                Last Name
                            </InputLabel>
                            <TextField
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <InputLabel>
                                {tabValue == 0? 
                                    "Driver ID Number"
                                    :
                                    "Driver Aid ID Number"
                                }
                            </InputLabel>
                            <TextField
                                onChange={(e) => setDriverID(e.target.value)}
                            />
                            {/*are we still planning on adding photos? we need to find a database solution to storing photos if we are*/}
                            <InputLabel>
                                {tabValue == 0? 
                                    "Driver Photo"
                                    :
                                    "Driver Aid Photo"
                                }
                            </InputLabel>
                            <TextField
                                onChange={(e) => setDriverPhoto(e.target.value)}
                            />
                            <InputLabel>
                                Address
                            </InputLabel>
                            <TextField
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <InputLabel>
                                City
                            </InputLabel>
                            <TextField
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <InputLabel>
                                State
                            </InputLabel>
                            <TextField
                                onChange={(e) => setState(e.target.value)}
                            />
                            <Box paddingTop={"3vh"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    {tabValue == 0? 
                                        "Register Driver"
                                        :
                                        "Register Driver Aid"
                                    }
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Box>
            </Box>

            <div>
            <h1>All Drivers</h1>
            <ul>
                {drivers.map(driver => (
                    <li key={driver.id}>
                        <img src={driver.profilePicture} alt={`${driver.firstName} ${driver.lastName}`} />
                        <p>Name: {driver.firstName} {driver.lastName}</p>
                        <p>Company: {driver.companyName}</p>
                        <p>ID: {driver.idNumber}</p>
                    </li>
                ))}
            </ul>
            <h1>Driver Details</h1>
            <h2>Filtered Drivers</h2>
            <ul>
                {filteredDrivers.map(driver => (
                    <li key={driver.id}>
                        <img src={driver.profilePicture} alt={`${driver.firstName} ${driver.lastName}`} />
                        <p>Name: {driver.firstName} {driver.lastName}</p>
                        <p>Company: {driver.companyName}</p>
                        <p>ID: {driver.idNumber}</p>
                    </li>
                ))}
            </ul>
            <h2>Filtered Driver Aides</h2>
            <ul>
                {filteredDriverAides.map(driverAide => (
                    <li key={driverAide.id}>
                        <img src={driverAide.profilePicture} alt={`${driverAide.firstName} ${driverAide.lastName}`} />
                        <p>Name: {driverAide.firstName} {driverAide.lastName}</p>
                        <p>Company: {driverAide.companyName}</p>
                        <p>ID: {driverAide.idNumber}</p>
                    </li>
                ))}
            </ul>
        </div>
        </div>
        
    )
}

export default ProviderDashboard;