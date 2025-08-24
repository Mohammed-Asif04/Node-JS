const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./connection");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectDB( "mongodb://localhost:27017/short-url").then(() =>
  console.log("Mongodb connected")
);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));