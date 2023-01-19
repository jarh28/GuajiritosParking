const express = require("express");
const { SERVER_PORT, BASE_ROUTE } = require("./config");
const mongoose = require("mongoose");

const app = express();

// middlewares
app.use(express.json());

// routes
app.use(BASE_ROUTE, require("./src/routes/type.router"));
app.use(BASE_ROUTE, require("./src/routes/vehicle.router"));

// starting the server
require("./database");

app.listen(SERVER_PORT, () => {
    console.log(`=> Running server on port ${SERVER_PORT}`);
});
