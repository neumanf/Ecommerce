const express = require("express");
const next = require("next");
const { createProxyMiddleware } = require("http-proxy-middleware");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        if (dev) {
            server.use(
                "/api",
                createProxyMiddleware({
                    target: "http://localhost:8000",
                    changeOrigin: true,
                })
            );
        }

        server.all("*", (req, res) => {
            return handle(req, res);
        });

        server.listen(port, () => {
            console.log(`Listening on http://localhost:${port}`);
        });
    })
    .catch((e) => {
        console.error("Error", e);
    });
