// This is the file we will use to write logic to connect to our database
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const connect = await mongoose.connect(process.env.MONGO_URI);
		console.log(`MongoDB connected: ${connect.connection.host}`.cyan.underline);
	} catch (err) {
		console.log(err);
		//close the process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
