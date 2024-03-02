import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";

const Dashboard = () => {
    const [connection,setConnection] = useState(false)

    useEffect(()=>{
        fetch('/test')
            .then(res=>{
                if(res.ok){
                    setConnection(true)
                }
            })
            .catch(err => console.log("No connection established",err))

    })

    return(
        <div>
            <NavBar />
            <p>{connection}</p>
            <p>This will be the landing page after a user is signed in.</p>
            <p>For now, this can be a place to test functionality like displaying mapping data.</p>
        </div>
    )
}

export default Dashboard;