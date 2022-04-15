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

const Statisticspage = (props) => {

    const navigate = useNavigate();

    const [val, setVal] = useState("0");
    const [orders, setOrders] = useState([]);

    const newUser = {
        email: localStorage.getItem('Email'),
        password: localStorage.getItem('Password'),
    };

    if (val === "0") {
        axios
            .post("http://localhost:4000/user/login", newUser)
            .then((response) => {
                console.log(response.data);
                console.log(response.data.user._id);

                axios
                    .get("http://localhost:4000/vendor/orders/" + response.data.user._id)
                    .then((response) => {
                        setOrders(response.data);
                        console.log(response.data);

                    });

            })
            .catch((error) => {
                console.log(error);
            });
        setVal(1);
    }

    var placed = 0;
    var rejected = 0;
    var completed = 0;
    var pending = 0;
    var k = 0;
    let key, j;
    var dum;
    const array = [];
    const quan = [];
    const flag = [];
    const freq = [];
    const result = [];
    var count = 0;

    console.log(orders);

    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status === "PLACED" || orders[i].status === "ACCEPTED" || orders[i].status === "COOKING" || orders[i].status === "READY FOR PICKUP" || orders[i].status === "COMPLETED" || orders[i].status === "REJECTED") {
            placed = placed + 1;
        }
        if (orders[i].status === "REJECTED") {
            rejected = rejected + 1;
        }
        if (orders[i].status === "COMPLETED") {
            completed = completed + 1;
        }
        pending = placed - rejected - completed;
        if (pending < 0) {
            pending = 0;
        }
    }

    for (var i = 0; i < orders.length; i++) {
        if (orders[i].status !== "REJECTED") {
            array.push(orders[i].itemname);
            quan.push(orders[i].quantity);
            count = count + 1;
        }
    }
    for (var i = 0; i < count; i++) {
        if (flag.indexOf(array[i]) <= -1) {
            flag.push(array[i]);
            freq[k] = quan[i];
            k++;
        }
        else {
            freq[flag.indexOf(array[i])] = freq[flag.indexOf(array[i])] + quan[i];
        }
    }

    for (var i = 1; i < freq.length; i++) {
        key = freq[i];
        dum = flag[i];
        j = i - 1;

        while (j >= 0 && freq[j] > key) {
            freq[j + 1] = freq[j];
            flag[j + 1] = flag[j];
            j = j - 1;
        }
        freq[j + 1] = key;
        flag[j + 1] = dum;
    }
    
    if (freq.length < 5) {
        for (var i = freq.length-1; i >=0; i--) {
            result.push(flag[i]);
        }
    }
    else {
        for (var i = 4; i >= 0; i--) {
            result.push(flag[i]);
        }
    }

    return (
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <td>Top 5 Items that have been sold</td>
                    </tr>
                    {result.map((item, i) =>
                        <tr key={i}>
                            <td>{item}</td>
                        </tr>
                    )}
                </tbody>
            </table><br></br>
            <Grid item xs={12}>
                <TextField
                    id="outlined-basic"
                    label="Placed Orders"
                    variant="outlined"
                    value={placed}
                />
            </Grid><br></br>
            <Grid item xs={12}>
                <TextField
                    id="outlined-basic"
                    label="Pending Orders"
                    variant="outlined"
                    value={pending}
                />
            </Grid><br></br>
            <Grid item xs={12}>
                <TextField
                    id="outlined-basic"
                    label="Completed Orders"
                    variant="outlined"
                    value={completed}
                />
            </Grid>
        </div>
    );


}

export default Statisticspage;
