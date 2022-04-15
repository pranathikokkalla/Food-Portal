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

const Myorders = (props) => {

    const [myorders, setMyorders] = useState([]);
    const [val, setVal] = useState("0");

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

                console.log(response.data.user._id);
                axios
                    .get("http://localhost:4000/orders/" + response.data.user._id)
                    .then((response) => {
                        console.log(response.data);
                        setMyorders(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });


            });
        setVal(1);
    }

    function Pickup(id) {
        console.log("Pickup");

        let newUser = {

            category: "veg",
            id: "61f426464d9f92616b867266",
            itemname: "maggie",
            price: 30,
            quantity: 3,
            rating: 0,
            status: "ACCEPTED",
            time: "1:1:17",
            vendorid: "61f426704d9f92616b867267",
            vendorname: "divya",
        }

        axios
            .get("http://localhost:4000/getorder/" + id)
            .then((response) => {
                newUser = {
                    id: response.data[0].id,
                    vendorid: response.data[0].vendorid,
                    itemname: response.data[0].itemname,
                    vendorname: response.data[0].vendorname,
                    price: response.data[0].price,
                    category: response.data[0].category,
                    quantity: response.data[0].quantity,
                    rating: response.data[0].rating,
                    status: "COMPLETED",
                    time: response.data[0].time,
                }
                console.log(newUser);
                axios
                    .put("http://localhost:4000/orders/edit/" + id, newUser)
                    .then((response) => {
                        alert("edit successful!!\t");
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
        window.location.reload();
    }

    return (
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <td>Item name</td>
                        <td>Vendor name</td>
                        <td>Price</td>
                        <td>Category</td>
                        <td>Rating</td>
                        <td>Quantity</td>
                        <td>Order time</td>
                        <td>Status</td>
                    </tr>
                    {myorders.map((item, i) =>
                        <tr key={i}>
                            <td>{item.itemname}</td>
                            <td>{item.vendorname}</td>
                            <td>{item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.rating}</td>
                            <td>{item.quantity}</td>
                            <td>{item.time}</td>
                            <td>{item.status}</td>
                            {item.status === "READY FOR PICKUP" && <Button variant="container" onClick={() => Pickup(item._id)}>
                                PICKED UP
                            </Button>}
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Myorders;
