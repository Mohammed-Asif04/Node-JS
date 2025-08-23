const express = require('express');
const urlRoute = require('./routes/url');
const { connectDB } = require('./connection');

const app = express();
const port = 8001;

connectDB("mongodb://127.0.0.1:27017/short-url")
.then(() => {
    console.log('Connected to DB');
})
.catch((err) => {
    console.log("Not connected to DB" , err);
});

app.use(express.json());
app.use("/url", urlRoute);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});