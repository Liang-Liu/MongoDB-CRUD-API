const express = require("express");
const app = express();
const apiRouter = require("./routers/api.js");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
	console.log("connected to mongoDB!");
});

app.use("/api/products", apiRouter);

app.get("/", (req, res, next) => {
	res.send("Hello world");
});

app.listen(PORT, () => {
	console.log("Server is running on PORT " + PORT);
});
