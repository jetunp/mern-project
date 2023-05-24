const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 5000;

//init express
const app = express();

app.use('/api/goals', require('./routes/api/goalRoutes'));

//middleware (to use the req.body data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//use the error handler, this will override the default express error handler
app.use(errorHandler);

app.listen(PORT, () => {
	console.log(`server started on the port: ${PORT}`);
});
