const app = require("./app");
const mongoose = require("./db/connect");

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`[SERVER] Running on http://localhost:${port}`);

    mongoose.connection
        .on("open", () => console.log("[DB]: Connection Succeeded"))
        .on("error", (err) => console.error(err));
});
