const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// Create Schema
const VendorSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	shopname: {
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
	openingtime: {
		type: String,
		required: true
	},
	closingtime: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});

module.exports = vendor = mongoose.model("vendor", VendorSchema);
