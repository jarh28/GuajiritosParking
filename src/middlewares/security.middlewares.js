const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        const token = bearerHeader.split(" ")[1];
        req.token = token;
        next();
    } else {
        res.sendStatus(401);
    }
};

const verifyToken = (req, res, next) => {
    jwt.verify(req.token, SECRET_KEY, (err, data) => {
        if (err) res.sendStatus(401);
        next();
    });
};

module.exports = { ensureToken, verifyToken };
