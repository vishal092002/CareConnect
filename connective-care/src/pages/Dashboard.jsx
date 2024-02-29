import React from "react";
import { NavBar } from "../components/NavBar";

const Dashboard = () => {

    return(
        <div>
            <NavBar />
            <p>This will be the landing page after a user is signed in.</p>
            <p>For now, this can be a place to test functionality like displaying mapping data.</p>
        </div>
    )
}

export default Dashboard;