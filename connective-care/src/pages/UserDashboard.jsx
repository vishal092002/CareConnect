import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { Box, Button, InputLabel, TextField, Typography, Tabs, Tab } from "@mui/material";
import { drivers, driverAides, displayAllDrivers, filterDriversByCompany, filterDriverAidesByCompany } from "../data/driverData";


const UserDashboard = () => {

    displayAllDrivers(drivers);

    const filteredDrivers = filterDriversByCompany('ABC Taxi');
    const filteredDriverAides = filterDriverAidesByCompany('ABC Taxi');

    //we are using separate fields for the live input and the submitted input
    //use the submitted input for api calls since incomplete inputs from live vars will cause problems
    const [addressInput, setAddressInput] = useState(null);
    const [cityInput, setCityInput] = useState(null);
    const [stateInput, setStateInput] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);

    function updateAddress() {
        setAddress(addressInput)
        setCity(cityInput)
        setState(stateInput)
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
                <Box className="addressBox" sx={{
                    width: "30%",
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#000000",
                    backgroundColor: "#CCCCCC"
                }}>
                    <Box className="addressContent" sx={{
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
                            Update Address
                        </Typography>
                        <form onSubmit={updateAddress}>
                            <InputLabel>
                                Address
                            </InputLabel>
                            <TextField
                                onChange={(e) => setAddressInput(e.target.value)}
                            />
                            <InputLabel>
                                City
                            </InputLabel>
                            <TextField
                                onChange={(e) => setCityInput(e.target.value)}
                            />
                            <InputLabel>
                                State
                            </InputLabel>
                            <TextField
                                onChange={(e) => setStateInput(e.target.value)}
                            />
                            <Box paddingTop={"3vh"}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                >
                                    Update
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

export default UserDashboard;