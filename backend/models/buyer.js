const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email']
	},
	contact: {
		type: Number,
		validate: {
			validator: function (v) {
				return /\d{10}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		required: true
	},
	age: {
		type: Number,
		// required: true
	},
	batch: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	wallet: {
		type: Number,
		required: true
	}
});

module.exports = buyer = mongoose.model("buyer", BuyerSchema);
