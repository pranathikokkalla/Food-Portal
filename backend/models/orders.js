const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const OrdersSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    vendorid: {
        type: String,
        required: true
    },
    itemname: {
        type: String,
        required: true
    },
    vendorname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = orders = mongoose.model("orders", OrdersSchema);