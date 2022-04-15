const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema

const FavouritesSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    itemname: {
        type: String,
        required: true
    },
    shopname: {
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
});

module.exports = favourites = mongoose.model("favourites", FavouritesSchema);