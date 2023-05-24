// here is where we define our schema, i.e, fields for this particular resource
const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
	{
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Goal', goalSchema);
