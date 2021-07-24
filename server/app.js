require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const productsRouter = require("./routes/products.route");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", productsRouter);

module.exports = app;
