import { useState, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { CardGroup, ListGroup, ListGroupItem } from 'react-bootstrap';

const Vendorfood = (props) => {

    // const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("0");
    const [category, setCategory] = useState("");
    const [val, setVal] = useState("0");

    const onChangeName = (event) => {
        setName(event.target.value);
    };
    const onChangePrice = (event) => {
        setPrice(event.target.value);
    }
    const onchangeRating = (event) => {
        setRating(event.target.value);
    }
    const onChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    // const newUser = {
    //     email: localStorage.getItem('Email'),
    //     password: localStorage.getItem('Password'),
    // };

    // useEffect(() => {
    // if (val === "0") {
    //     axios
    //         .post("http://localhost:4000/user/login", newUser)
    //         .then((response) => {
    //             console.log(response.data);
    //             console.log(response.data.user._id);

    //             axios
    //                 .get("http://localhost:4000/vendor/items/" + response.data.user._id)
    //                 .then((response) => {
    //                     setItems(response.data);
    //                     setName(response.data.name);
    //                     console.log(response.data);

    //                 });

    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    //     setVal(1);
    // }
    // }, []);

    // const Additem = (event) => {
    //     event.preventDefault();
    //     navigate("/additems");
    // };

    // function Edititem(id1, id, shopname, vendorname) {
    //     console.log(id1);

    //     axios
    //         .put("http://localhost:4000/items/edit/" + id1, {
    //             id: id,
    //             vendorname: vendorname,
    //             shopname: shopname,
    //             name: name,
    //             price: price,
    //             rating: rating,
    //             category: category,
    //         })
    //         .then((response) => {
    //             alert("edit successful!!\t");
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // function Deleteitem(id) {
    //     axios
    //         .delete("http://localhost:4000/items/delete/" + id)
    //         .then((response) => {
    //             console.log(response.data);
    //             window.location.reload();
    //         });
    // };

    return (
        <div>
        /* <Grid container align={"right"} spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={Additem}>
                        Add Item
                    </Button>
                </Grid>
            </Grid> */
        /* <br /><br />
            <table border="1">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Rating</td>
                        <td>Category</td>
                    </tr>
                    {items.map((item, i) =>
                        <tr key={i}>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.name}
                                        onChange={onChangeName}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.price}
                                        onChange={onChangePrice}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.rating}
                                        onChange={onchangeRating}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.category}
                                        onChange={onChangeCategory}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Button variant="container" onClick={() => Edititem(item._id, item.id, item.shopname, item.vendorname)}>
                                    edit
                                </Button>
                            </td>
                            <td>
                                <Button variant="container" onClick={() => Deleteitem(item._id)}>
                                    delete
                                </Button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table> */
        </div>
    );

};

export default Vendorfood;

