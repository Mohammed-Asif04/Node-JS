const express = require('express');
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');
const path = require('path');
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

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use("/url", urlRoute);
app.use("/user", userRoute);

app.get('/test',async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home');
})


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});