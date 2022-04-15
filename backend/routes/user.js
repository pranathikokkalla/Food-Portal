var express = require("express");
var router = express.Router();

// Load User model
const Buyer = require("../models/buyer");
// Load User model for vendor
const Vendor = require("../models/vendor");
// Load Food items model
const Fooditems = require("../models/fooditems");
// Load Favourites model
const Favourites = require("../models/favourites");
// Load Orders model
const Orders = require("../models/orders");

// GET request 
// Getting all the buyers
router.get("/buyer", function (req, res) {
    Buyer.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});


// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a buyer to db
router.post("/buyer/register", (req, res) => {

    email = req.body.email;
    Vendor.findOne({ email }).then(user1 => {
        if (!user1) {
            Buyer.findOne({ email }).then(user => {
                // Check if buyer email exists
                if (user) {
                    console.log("Email already exists");
                    return res.status(404).json({
                        error: "Email already exists!!!",
                    });
                }
                else {

                    if (req.body.batch !== "UG1" && req.body.batch !== "UG2" && req.body.batch !== "UG3" && req.body.batch !== "UG4" && req.body.batch !== "UG5") {
                        console.log("Invalid batch");
                        return res.status(404).json({
                            error: "Invalid batch!!!",
                        });
                    }
                    const newBuyer = new Buyer({
                        name: req.body.name,
                        email: req.body.email,
                        contact: req.body.contact,
                        age: req.body.age,
                        batch: req.body.batch,
                        password: req.body.password,
                        wallet: req.body.wallet
                    });

                    newBuyer.save()
                        .then(user => {
                            res.status(200).json(user);
                        })
                        .catch(err => {
                            res.status(400).send(err);
                        });
                }

            });
        }
        else {
            console.log("Invalid credentials!!");
            return res.status(404).json({
                error: "Email already exists!!!",
            });
        }
    });
});

// POST request 
// Login
router.post("/user/login", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // Find buyer by email and password

    Buyer.findOne({ email }).then(user => {

        // Check if buyer email exists

        if (!user) {
            Vendor.findOne({ email }).then(user => {
                if (!user) {
                    console.log("This Email is not registered!!");
                    return res.status(404).json({
                        error: "This Email is not registered!!!",
                    });
                }
                else {
                    Vendor.findOne({ email, password }).then(user => {

                        // Check if vendor account exists

                        if (!user) {
                            console.log("Invalid credentials!!");
                            return res.status(404).json({
                                error: "Invalid credentials!!!",
                            });
                        }
                        else {
                            console.log("Account found!!");
                            res.send({ type: "Vendor", user: user });
                            return user;
                        }
                    });
                }
            });
        }
        else {

            Buyer.findOne({ email, password }).then(user => {
                // Check if Buyer account exists

                if (user) {
                    console.log("Account found!!");
                    res.send({ type: "Buyer", user: user });
                    return user;
                }

                else {
                    console.log("Invalid credentials!!");
                    return res.status(404).json({
                        error: "Invalid credentials!!!",
                    });
                }

            });

        }
    });
});

// update buyer profile

router.put("/buyer/update/:id", (req, res) => {

    const id = req.params.id;
    const balance = req.body.wallet;
    console.log(balance);

    if (parseInt(balance) < 0) {
        console.log("Balance insufficient to place the order!!");
        return res.status(404).json({
            error: "Balance insufficient to place the order!!!!!",
        });
    }
    else {
        Buyer.updateMany({ _id: id }, { $set: req.body })
            .exec()
            .then(result => {
                console.log("result");
                res.status(200).json({
                    message: "Buyer updated",
                    request: {
                        type: "GET",
                        url: "http://localhost:4000/buyer/" + id
                    }
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
    }
});

// update vendor profile

router.put("/vendor/update/:id", (req, res) => {

    const id = req.params.id;
    Vendor.updateMany({ _id: id },
        { $set: req.body })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Vendor updated",
                request: {
                    type: "GET",
                    url: "http://localhost:4000/vendor/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// GET request 
// Getting all the vendors
router.get("/vendor", function (req, res) {
    Vendor.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            console.log("All good");
            res.json(users);
        }
    })
});


// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a buyer to db
router.post("/vendor/register", (req, res) => {

    email = req.body.email;
    shopname = req.body.shopname;
    Buyer.findOne({ email }).then(user1 => {
        if (!user1) {
            Vendor.findOne({ email }).then(user => {
                // Check if vendor email exists
                if (user) {
                    console.log("Email already exists");
                    return res.status(404).json({
                        error: "Email already exists!!!",
                    });

                }
                else {
                    Vendor.findOne({ shopname }).then(user => {
                        // Check if vendor email exists
                        if (user) {
                            console.log("Shop name already exists");
                            return res.status(404).json({
                                error: "Shop name already exists!!!",
                            });
                        }
                        else {
                            const newVendor = new Vendor({
                                name: req.body.name,
                                shopname: req.body.shopname,
                                email: req.body.email,
                                contact: req.body.contact,
                                openingtime: req.body.openingtime,
                                closingtime: req.body.closingtime,
                                password: req.body.password
                            });

                            newVendor.save()
                                .then(user => {
                                    res.status(200).json(user);
                                })
                                .catch(err => {
                                    res.status(400).send(err);
                                });
                        }
                    });
                }
            });
        }
        else {
            console.log("Invalid credentials!!");
            return res.status(404).json({
                error: "Email already exists!!!",
            });
        }
    });
});

// GET request 
// Getting all the Food items
router.get("/food", function (req, res) {
    Fooditems.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
            return users;
        }
    })
});

router.get("/vendor/items/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    Fooditems.find({ id }, function (err, users) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(users);
            console.log("menu");
            console.log(users);
            return users;
        }
    })
});

// delete food item
router.delete("/items/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    Fooditems.findById(id)
        .then(Fooditems =>
            Fooditems.remove()
                .then(() => res.json({ success: true }))
        )
        .catch(err => res.status(404).json({ success: false }));
});

// delete order
router.delete("/orders/delete/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);

    Orders.findById(id)
        .then(Orders =>
            Orders.remove()
                .then(() => res.json({ success: true }))
        )
        .catch(err => res.status(404).json({ success: false }));
});

router.put("/items/edit/:id", (req, res) => {

    const id = req.params.id;
    Fooditems.updateMany({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Food details edited",
                request: {
                    type: "GET",
                    url: "http://localhost:4000/food/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.put("/orders/edit/:id", (req, res) => {

    const id = req.params.id;
    Orders.updateMany({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "Order details edited",
                request: {
                    type: "GET",
                    url: "http://localhost:4000/orders/" + id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


router.post("/food/register", (req, res) => {

    name = req.body.name;
    Fooditems.findOne({ name }).then(user => {
        // Check if item  exists
        if (user) {
            console.log("This item already exists");
            return res.status(404).json({
                error: "This item already exists!!!",
            });
        }
        else {
            const newFooditems = new Fooditems({
                id: req.body.id,
                vendorname: req.body.vendorname,
                shopname: req.body.shopname,
                name: req.body.name,
                price: req.body.price,
                rating: req.body.rating,
                category: req.body.category
            });

            newFooditems.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });

});

router.post("/food/addfavourites/:id", (req, res) => {

    itemname = req.body.itemname;
    console.log(itemname);
    id = req.params.id;

    Favourites.findOne({ itemname, id }).then(user => {
        // Check if item  exists
        if (user) {
            console.log("This item already exists");
            return res.status(404).json({
                error: "This item already exists!!!",
            });
        }
        else {
            const newFavourites = new Favourites({
                id: req.params.id,
                itemname: req.body.itemname,
                shopname: req.body.shopname,
                vendorname: req.body.vendorname,
                price: req.body.price,
                category: req.body.category
            });
            newFavourites.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});

router.post("/orders/add/", (req, res) => {

    const newOrders = new Orders({
        id: req.body.id,
        itemname: req.body.itemname,
        vendorname: req.body.vendorname,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        status: req.body.status,
        quantity: req.body.quantity,
        time: req.body.time,
        vendorid: req.body.vendorid,
    });
    newOrders.save()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(400).send(err);
        });

});

router.get("/orders/:id", function (req, res) {
    id = req.params.id;
    Orders.find({ id }).then(user => {
        if (user) {
            res.json(user);
            return user;
        }
    });
});

router.get("/buyers/:id", function (req, res) {
    _id = req.params.id;
    Buyer.find({ _id }).then(user => {
        if (user) {
            res.json(user);
            return user;
        }
    });
});

router.get("/vendor/orders/:id", function (req, res) {
    vendorid = req.params.id;
    Orders.find({ vendorid }).then(user => {
        if (user) {
            res.json(user);
            return user;
        }
    });
});

router.get("/getorder/:id", function (req, res) {
    _id = req.params.id;
    Orders.find({ _id }).then(user => {
        if (user) {
            res.json(user);
            return user;
        }
    });
});

router.get("/favourites/:id", function (req, res) {
    id = req.params.id;
    Favourites.find({ id }).then(user => {
        if (user) {
            res.json(user);
            return user;
        }
    });
});



module.exports = router;

