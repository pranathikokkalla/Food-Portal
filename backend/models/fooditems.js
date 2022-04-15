const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const FooditemsSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    vendorname: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    // addon: {
    //     type: [Map],
    //     required: true
    // }
});

module.exports = fooditems = mongoose.model("fooditems", FooditemsSchema);
