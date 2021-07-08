require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const productsRouter = require("./routes/products.route");

const app = express();
const port = process.env.PORT || 8000;

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log("[DB] Connected successfully."))
    .catch((e) => console.error("[DB] Error: ", e));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api", productsRouter);

app.listen(port, () => {
    console.log(`[!] Server running on http://localhost:${port}`);
});
