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

const AddItem = (props) => {

    const [id, setId] = useState("");
    const [vendorname, setVendorname] = useState("");
    const [shopname, setShopname] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("0");
    const [category, setCategory] = useState("");

    const onChangeItemname = (event) => {
        setName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    }
    const onChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const newUser = {
        email: localStorage.getItem('Email'),
        password: localStorage.getItem('Password'),
    };

    axios
        .post("http://localhost:4000/user/login", newUser)
        .then((response) => {
            console.log(response.data);
            console.log(response.data.type);

            setId(response.data.user._id);
            setVendorname(response.data.user.name);
            setShopname(response.data.user.shopname);
            setRating(0);

        });

    const add = (event) => {

        event.preventDefault();
        const newUser1 = {
            id: id,
            vendorname:vendorname,
            shopname:shopname,
            name: name,
            price: price,
            rating: rating,
            category: category,
        };
        const resetInputs = () => {
            setName("");
            setPrice("");
            setCategory("");
        };
        axios
            .post("http://localhost:4000/food/register", newUser1)
            .then((response) => {
                console.log(response.data);
                alert("Item Added");
            })
            .catch((error) => {
                console.log(error);
                alert("This item already exists");
            });
            
        resetInputs();
    };
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Item name"
                    variant="outlined"
                    value={name}
                    onChange={onChangeItemname}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={onChangePrice}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Category"
                    variant="outlined"
                    value={category}
                    onChange={onChangeCategory}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" onClick={add}>
                    Add
                </Button>
            </Grid>
        </Grid>
    );
};

export default AddItem;