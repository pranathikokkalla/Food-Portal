import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import { useNavigate } from "react-router-dom";


const UserType = (props) => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onSubmit = (event) => {

        console.log("plsss");
        localStorage.clear();
        localStorage.setItem('Email', email);
        localStorage.setItem('Password', password);
        event.preventDefault();
        const newUser = {
            email: email,
            password: password,
        };
        const resetInputs1 = () => {
            setEmail("");
            setPassword("");
        };
        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((response) => {
                alert("login successful!!\t");
                console.log(response.data.type);
                if (response.data.type === "Buyer") {
                    navigate("/buyerhome");
                }
                if (response.data.type === "Vendor") {
                    navigate("/vendorhome");
                }
            })
            .catch(function (error) {
                alert("Invalid credentials!!");
                console.log(error);
            });
        resetInputs1();
    };
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={onChangeEmail}
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
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
        </Grid>
    );

};
export default UserType;




