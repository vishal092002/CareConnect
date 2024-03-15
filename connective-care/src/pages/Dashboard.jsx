import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { drivers, driverAides, displayAllDrivers, filterDriversByCompany, filterDriverAidesByCompany } from "../data/driverData";


const Dashboard = () => {

    displayAllDrivers(drivers);

    const filteredDrivers = filterDriversByCompany('ABC Taxi');
    const filteredDriverAides = filterDriverAidesByCompany('ABC Taxi');

    return(
        <div>
            <NavBar />
            <p>This will be the landing page after a user is signed in.</p>
            <p>For now, this can be a place to test functionality like displaying mapping data.</p>

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

export default Dashboard;