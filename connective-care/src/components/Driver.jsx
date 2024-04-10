import React from "react";
import PropTypes from 'prop-types';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

export function Driver(props) {
    const { firstName, lastName, company, id, photo, address, city, state, aid } = props;

    const navigate = useNavigate();

    const selectDriver = () => {
        Cookies.set('driver', id);
        navigate("/RequestForm");
    }

    return(
        <div>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                alignContent: "center",
                justifyContent: "center",
                paddingBottom: "3vh"
            }}>
                <Box>
                    <img src={photo} alt={`${firstName} ${lastName}`} />
                </Box>
                <Box width={"3vh"} />
                <Box sx={{
                    textAlign: "left"
                }}>
                    <Typography>Driver {aid? "Aid " : ""} Name: {firstName} {lastName}</Typography>
                    <Typography>Company: {company}</Typography>
                    <Typography>ID: {id}</Typography>
                    <Typography>Address: {address}, {city}, {state}</Typography>
                </Box>
                {Cookies.get('type') == "user" ?
                    <Button onClick={selectDriver}>test</Button>
                    :
                    <Box></Box>
                }
            </Box>
        </div>
    )
}

Driver.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    aid: PropTypes.bool
};

Driver.defaultProps = {
    aid: false
}

export default Driver;