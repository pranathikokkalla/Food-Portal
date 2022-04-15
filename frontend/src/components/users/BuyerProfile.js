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

const BuyerProfile = (props) => {

    console.log("Hola");
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");
    const [wallet, setWallet] = useState("");
    const [val, setVal] = useState("0");

    console.log(val);

    const onChangeUsername = (event) => {
        setName(event.target.value);
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
    const onChangeAge = (event) => {
        setAge(event.target.value);
    };
    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };
    const onChangeWallet = (event) => {
        setWallet(event.target.value);
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
                console.log("yeah");
                
                setId(response.data.user._id);
                setName(response.data.user.name);
                setEmail(response.data.user.email);
                setPassword(response.data.user.password);
                setContact(response.data.user.contact);
                setAge(response.data.user.age);
                setBatch(response.data.user.batch);
                setWallet(response.data.user.wallet);

                console.log(email);

            });
        setVal(1);
    }

    const UPDATE = (event) => {
        event.preventDefault();
        console.log("id", id);
        axios
            .put("http://localhost:4000/buyer/update/" + id, {
                name: name,
                email: email,
                password: password,
                contact: contact,
                age: age,
                batch: batch,
                wallet:wallet,
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
                    label="Age"
                    variant="outlined"
                    value={age}
                    onChange={onChangeAge}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Batch"
                    variant="outlined"
                    value={batch}
                    onChange={onChangeBatch}
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

export default BuyerProfile;
