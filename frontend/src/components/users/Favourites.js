import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Navigate } from "react-router-dom";

const Favourites = (props) => {

    const [favourites, setFavourites] = useState([]);
    const [val, setVal] = useState("0");
    // const [val1, setVal1] = useState("0");

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

                axios
                    .get("http://localhost:4000/favourites/" + response.data.user._id)
                    .then((response) => {
                        console.log(response.data);
                        setFavourites(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });


            });
        setVal(1);
    }

    return (
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <td>Item name</td>
                        <td>Shop name</td>
                        <td>Vendor name</td>
                        <td>Category</td>
                    </tr>
                    {favourites.map((item, i) =>
                        <tr key={i}>
                            <td>{item.itemname}</td>
                            <td>{item.shopname}</td>
                            <td>{item.vendorname}</td>
                            <td>{item.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Favourites;

