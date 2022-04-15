import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const VendorProfile = (props) => {

    console.log("Hola");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [shopname, setShopname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [openingtime, setOpeningtime] = useState("");
    const [closingtime, setClosingtime] = useState("");
    const [val, setVal] = useState("0");

    const onChangeUsername = (event) => {
        setName(event.target.value);
    };
    const onChangeShopname = (event) => {
        setShopname(event.target.value);
    };
    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const onChangeContact = (event) => {
        setContact(event.target.value);
    };
    const onChangeOpeningtime = (event) => {
        setOpeningtime(event.target.value);
    };
    const onChangeClosingtime = (event) => {
        setClosingtime(event.target.value);
    };

    const newUser = {
        email: localStorage.getItem('Email'),
        password: localStorage.getItem('Password'),
    };
    if (val === "0") {
        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.type);

                setId(response.data.user._id);
                setName(response.data.user.name);
                setShopname(response.data.user.shopname);
                setEmail(response.data.user.email);
                setPassword(response.data.user.password);
                setContact(response.data.user.contact);
                setOpeningtime(response.data.user.openingtime);
                setClosingtime(response.data.user.closingtime);

            });
        setVal(1);
    }

    const UPDATE = (event) => {
        event.preventDefault();
        console.log("id", id);
        axios
            .put("http://localhost:4000/vendor/update/" + id, {
                name: name,
                shopname: shopname,
                email: email,
                password: password,
                contact: contact,
                openingtime: openingtime,
                closingtime: closingtime,
            })
            .then((response) => {
                alert("update successful!!\t");
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeUsername}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Shop Name"
                    variant="outlined"
                    value={shopname}
                    onChange={onChangeShopname}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    // onChange={onChangeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Password"
                    variant="outlined"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Contact"
                    variant="outlined"
                    value={contact}
                    onChange={onChangeContact}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Opening Time"
                    variant="outlined"
                    value={openingtime}
                    onChange={onChangeOpeningtime}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Closing Time"
                    variant="outlined"
                    value={closingtime}
                    onChange={onChangeClosingtime}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={UPDATE}>
                    Update
                </Button>
            </Grid>
        </Grid>

    );
};

export default VendorProfile;
