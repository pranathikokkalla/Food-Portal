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


const UserType = (props) => {

  const [user, setUser] = useState("");
  const [val, setVal] = useState("0");
  const [name, setName] = useState("");
  const [shopname, setShopname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [age, setAge] = useState("");
  const [batch, setBatch] = useState("");
  const [openingtime, setOpeningtime] = useState("");
  const [closingtime, setClosingtime] = useState("");
  const [wallet, setWallet]= useState("");

  const onChangeUser = (event) => {
    setUser(event.target.value);
    if (event.target.value === "Buyer") {
      setVal(10);
    }
    else {
      setVal(20);
    }
  };
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
  const onChangeAge = (event) => {
    setAge(event.target.value);
  };
  const onChangeBatch = (event) => {
    setBatch(event.target.value);
  };
  const onChangeOpeningtime = (event) => {
    setOpeningtime(event.target.value);
  };
  const onChangeClosingtime = (event) => {
    setClosingtime(event.target.value);
  };
  const onChangeWallet = (event) => {
    setWallet(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (val === 10) {
      const newUser = {
        name: name,
        email: email,
        password: password,
        contact: contact,
        age: age,
        batch: batch,
        wallet:wallet
      };
      const resetInputs1 = () => {
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setAge("");
        setBatch("");
        setWallet("");
      };

      axios
        .post("http://localhost:4000/buyer/register", newUser)
        .then((response) => {
          alert("Created\t" + response.data.name);
          console.log(response.data);
        })
        .catch(function (error) {
          alert("Invalid details!!");
          console.log(error);
        });
      resetInputs1();
    }
    if (val === 20) {
      console.log(val);
      const newUser1 = {
        name: name,
        shopname: shopname,
        email: email,
        password: password,
        contact: contact,
        openingtime: openingtime,
        closingtime: closingtime,
      };
      const resetInputs2 = () => {
        setName("");
        setShopname("");
        setEmail("");
        setPassword("");
        setContact("");
        setOpeningtime("");
        setClosingtime("");
      };
      axios
        .post("http://localhost:4000/vendor/register", newUser1)
        .then((response) => {
          alert("Created\t" + response.data.name);
          console.log(response.data);
        })
        .catch(function (error) {
          alert("Error!!");
          console.log(error);
        });
      resetInputs2();
    }
  };
  if (val !== 10 && val !== 20) {
    return (
      <Grid container align={"center"} spacing={2}>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={user}
              label="user"
              onChange={onChangeUser}
            >
              <MenuItem value={"Buyer"}>Buyer</MenuItem>
              <MenuItem value={"Vendor"}>Vendor</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Grid>
    );
  }
  return (
    <Grid container align={"center"} spacing={2}>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">User</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={user}
            label="user"
            onChange={onChangeUser}
          >
            <MenuItem value={"Buyer"}>Buyer</MenuItem>
            <MenuItem value={"Vendor"}>Vendor</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid item xs={12}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={onChangeUsername}
        />
      </Grid>
      {val === 20 && <Grid item xs={12}>
        <TextField
          label="Shop Name"
          variant="outlined"
          value={shopname}
          onChange={onChangeShopname}
        />
      </Grid>}
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
        <TextField
          label="Contact"
          variant="outlined"
          value={contact}
          onChange={onChangeContact}
        />
      </Grid>
      {val === 10 && <Grid item xs={12}>
        <TextField
          label="Age"
          variant="outlined"
          value={age}
          onChange={onChangeAge}
        />
      </Grid>}
      {val === 10 && <Grid item xs={12}>
        <TextField
          label="Batch"
          variant="outlined"
          value={batch}
          onChange={onChangeBatch}
        />
      </Grid>}
      {val === 10 && <Grid item xs={12}>
        <TextField
          label="Wallet"
          variant="outlined"
          value={wallet}
          onChange={onChangeWallet}
        />
      </Grid>}
      {val === 20 && <Grid item xs={12}>
        <TextField
          label="Opening Time"
          variant="outlined"
          value={openingtime}
          onChange={onChangeOpeningtime}
        />
      </Grid>}
      {val === 20 && <Grid item xs={12}>
        <TextField
          label="Closing Time"
          variant="outlined"
          value={closingtime}
          onChange={onChangeClosingtime}
        />
      </Grid>}
      <Grid item xs={12}>
        <Button variant="contained" onClick={onSubmit}>
          Register
        </Button>
      </Grid>
    </Grid>
  );
};

export default UserType;

