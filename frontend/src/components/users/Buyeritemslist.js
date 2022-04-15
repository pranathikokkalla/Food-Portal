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
import { useNavigate } from "react-router-dom";

const Buyeritemslist = (props) => {

    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [val, setVal] = useState("0");
    const [val1, setVal1] = useState("0");
    const [id, setId] = useState("");
    const [wallet, setWallet] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");

    const [flag, setFlag] = useState("0");
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("PLACED");

    const onChangeQuantity = (event) => {
        setQuantity(event.target.value);
    };
    if (val === "0") {
        axios
            .get("http://localhost:4000/food")
            .then((response) => {

                console.log(response.data);
                setItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        setVal(1);
    }

    const newUser = {
        email: localStorage.getItem('Email'),
        password: localStorage.getItem('Password'),
    };

    if (val1 === "0") {
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

            });
        setVal1(1);
    }


    function AddFavourites(itemname, shopname, vendorname, price, category) {
        console.log("Add to favourites");
        const newUser = {
            id: id,
            itemname: itemname,
            shopname: shopname,
            vendorname: vendorname,
            price: price,
            category: category
        };
        axios
            .post("http://localhost:4000/food/addfavourites/" + id, newUser)
            .then((response) => {
                console.log(response.data);
                alert("Added to favourites");
            })
            .catch((error) => {
                console.log(error);
                alert("Item already exists in favourites");
            });
    }

    function Placeorder(vendorid, itemname, vendorname, price, category, rating) {
        console.log("Place order");

        var date_ob = new Date();
        var hours = date_ob.getHours();
        var minutes = date_ob.getMinutes();
        var seconds = date_ob.getSeconds();
        var time = hours + ":" + minutes + ":" + seconds;

        const newUser = {
            id: id,
            itemname: itemname,
            vendorname: vendorname,
            price: price,
            category: category,
            quantity: quantity,
            rating: rating,
            status: status,
            time: time,
            vendorid: vendorid
        };
        axios
            .put("http://localhost:4000/buyer/update/" + id, {
                name: name,
                email: email,
                password: password,
                contact: contact,
                age: age,
                batch: batch,
                wallet: parseInt(wallet) - (parseInt(quantity) * parseInt(price)),
            })
            .then((response) => {
                alert("update successful!!\t");
                axios
                    .post("http://localhost:4000/orders/add", newUser)
                    .then((response) => {
                        console.log(response.data);
                        alert("Order placed!");
                        window.location.reload();

                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Error!!!");
                    });
            })
            .catch((error) => {
                console.log(error);
                alert("Balance insufficient to place the order!!");
                window.location.reload();
            });

    }

    const order = (event) => {
        event.preventDefault();
        setFlag("1");
        console.log("order");
    }

    const Addwallet = (event) => {
        event.preventDefault();
        navigate("/addwallet");
    }

    return (
        <div>
            <Grid container align={"right"} spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Wallet Amount"
                        variant="outlined"
                        value={wallet}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={Addwallet}>
                        Add Amount
                    </Button>
                </Grid>

            </Grid>
            {flag === "1" && <Grid item xs={12}>
                <TextField
                    label="Quantity"
                    variant="outlined"
                    value={quantity}
                    onChange={onChangeQuantity}
                />
            </Grid>}
            <table border="1">
                <tbody>
                    <tr>
                        <td>Item name</td>
                        <td>Vendor name</td>
                        <td>Shop name</td>
                        <td>Price</td>
                        <td>Rating</td>
                        <td>Category</td>
                    </tr>
                    {items.map((item, i) =>
                        <tr key={i}>
                            <td>{item.name}</td>
                            <td>{item.vendorname}</td>
                            <td>{item.shopname}</td>
                            <td>{item.price}</td>
                            <td>{item.rating}</td>
                            <td>{item.category}</td>
                            <td>
                                <Button variant="container" onClick={() => AddFavourites(item.name, item.shopname, item.vendorname, item.price, item.category)}>
                                    Add To Favourites
                                </Button>
                            </td>

                            <td>
                                <Button variant="container" onClick={order}>
                                    order
                                </Button>
                            </td>
                            {flag === "1" && <Grid item xs={12}>
                                <Button variant="container" onClick={() => Placeorder(item.id, item.name, item.vendorname, item.price, item.category, item.rating)}>
                                    Place order
                                </Button>
                            </Grid>}

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );

};

export default Buyeritemslist;