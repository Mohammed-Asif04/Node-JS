const express = require('express');
const app = express();
const port  = 8000;

const userRoutes = require('./routes/user');
const {connectMongoDB} = require('./connection');
const {logReqRes} = require('./middlewares');

// Connection 
connectMongoDB('mongodb://127.0.0.1:27017/Learning-NodeJS');

// Middleware-Plugins
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes('log.txt'));

//Routes
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
