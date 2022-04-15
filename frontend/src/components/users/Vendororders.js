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
import emailjs from 'emailjs-com';

const Vendororders = (props) => {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [response, setResponse] = useState([]);
    const [status, setStatus] = useState("");
    const [flag, setFlag] = useState("0");
    const [val, setVal] = useState("0");

    const [wallet, setWallet] = useState(0);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [contact, setContact] = useState("");
    const [age, setAge] = useState("");
    const [batch, setBatch] = useState("");

    const onChangeStatus = (event) => {
        setStatus(event.target.value);
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

    function Nextstage(id) {
        console.log("Next stage");
        var count = 0;
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
                if (response.data[0].status === "PLACED") {
                    for (var i = 0; i < orders.length; i++) {
                        if (orders[i].status === "ACCEPTED" || orders[i].status === "COOKING") {
                            count = count + 1;
                        }
                    }

                }
                if (count >= 10) {
                    alert("You can't accept more than 10 orders at a time");
                }
                else {
                    if (response.data[0].status === "PLACED") {

                        newUser = {
                            id: response.data[0].id,
                            vendorid: response.data[0].vendorid,
                            itemname: response.data[0].itemname,
                            vendorname: response.data[0].vendorname,
                            price: response.data[0].price,
                            category: response.data[0].category,
                            quantity: response.data[0].quantity,
                            rating: response.data[0].rating,
                            status: "ACCEPTED",
                            time: response.data[0].time,
                        }

                        const Emailjs = {
                            from_name: response.data[0].vendorname,
                            message: 'Your order is accepted!Thankyou for ordering'
                        }

                        emailjs.send('service_rxe02gb', 'template_qrkjngj', Emailjs, 'user_BDaiBUAHzUJbYWjTjU12g')
                            .then(function (response) {
                                console.log('SUCCESS!', response.status, response.text);
                            }, function (error) {
                                console.log('FAILED...', error);
                            });
                    }
                    if (response.data[0].status === "ACCEPTED") {

                        newUser = {
                            id: response.data[0].id,
                            vendorid: response.data[0].vendorid,
                            itemname: response.data[0].itemname,
                            vendorname: response.data[0].vendorname,
                            price: response.data[0].price,
                            category: response.data[0].category,
                            quantity: response.data[0].quantity,
                            rating: response.data[0].rating,
                            status: "COOKING",
                            time: response.data[0].time,
                        }

                    }
                    if (response.data[0].status === "COOKING") {
                        newUser = {
                            id: response.data[0].id,
                            vendorid: response.data[0].vendorid,
                            itemname: response.data[0].itemname,
                            vendorname: response.data[0].vendorname,
                            price: response.data[0].price,
                            category: response.data[0].category,
                            quantity: response.data[0].quantity,
                            rating: response.data[0].rating,
                            status: "READY FOR PICKUP",
                            time: response.data[0].time,
                        }
                    }

                    console.log(newUser);
                    axios
                        .put("http://localhost:4000/orders/edit/" + id, newUser)
                        .then((response) => {
                            alert("edit successful!!\t");
                            console.log(response.data);
                            window.location.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            })
            .catch((error) => {
                console.log(error);
            });
        // window.location.reload();
    }

    function Reject(id1) {
        console.log("Reject");

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
            .get("http://localhost:4000/getorder/" + id1)
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
                    status: "REJECTED",
                    time: response.data[0].time,
                }
                console.log(newUser);
                axios
                    .put("http://localhost:4000/orders/edit/" + id1, newUser)
                    .then((response) => {
                        alert("edit successful!!\t");
                        console.log(response.data);
                    })

                axios
                    .get("http://localhost:4000/buyers/" + response.data[0].id)
                    .then((response1) => {
                        console.log(response1);
                        axios
                            .put("http://localhost:4000/buyer/update/" + response.data[0].id, {
                                name: response1.data[0].name,
                                email: response1.data[0].email,
                                password: response1.data[0].password,
                                contact: response1.data[0].contact,
                                age: response1.data[0].age,
                                batch: response1.data[0].batch,
                                wallet: parseInt(response1.data[0].wallet) + (parseInt(response.data[0].quantity) * parseInt(response.data[0].price)),
                            })
                            .then((response2) => {
                                alert("Money is refunded back!!\t");

                                const Emailjs = {
                                    from_name: response.data[0].vendorname,
                                    message: 'Your order is rejected!! Sorry for the inconvinience!'
                                }
        
                                emailjs.send('service_rxe02gb', 'template_qrkjngj', Emailjs, 'user_BDaiBUAHzUJbYWjTjU12g')
                                    .then(function (response3) {
                                        console.log('SUCCESS!', response3.status, response3.text);
                                    }, function (error) {
                                        console.log('FAILED...', error);
                                    });

                                console.log(response2.data);
                                window.location.reload();
                            });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
        // window.location.reload();
    }

    return (
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>Quantity</td>
                        <td>Category</td>
                        <td>Placed time</td>
                        <td>Status</td>
                    </tr>
                    {orders.map((item, i) =>
                        <tr key={i}>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.itemname}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.quantity}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.category}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.time}
                                    />
                                </Grid>
                            </td>
                            <td>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        value={item.status}
                                        onChange={onChangeStatus}
                                    />
                                </Grid>
                            </td>

                            {item.status === "PLACED" && <Button variant="container" onClick={() => Nextstage(item._id)}>
                                MOVE TO NEXT STAGE
                            </Button>}


                            {item.status === "ACCEPTED" && <Button variant="container" onClick={() => Nextstage(item._id)}>
                                MOVE TO NEXT STAGE
                            </Button>}



                            {item.status === "COOKING" && <Button variant="container" onClick={() => Nextstage(item._id)}>
                                MOVE TO NEXT STAGE
                            </Button>}


                            {item.status === "PLACED" && <Button variant="container" onClick={() => Reject(item._id)}>
                                REJECT
                            </Button>}

                        </tr>
                    )}
                </tbody>
            </table>
        </div >
    )

};

export default Vendororders;
