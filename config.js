// WEB SERVER
const SERVER_PORT = process.env.PORT || 3000;

// DATABASE
const database = {
    IP: "169.254.124.50",
    PORT: "27017",
    NAME: "guajiritos-parking",
};
const MONGO_URI = `mongodb://${database.IP}:${database.PORT}/${database.NAME}`;

// ROUTES
const BASE_ROUTE = "/ms-core";

module.exports = { SERVER_PORT, MONGO_URI, BASE_ROUTE };
