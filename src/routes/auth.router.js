const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../../config");

const BASE_ROUTE = "/login";

const authRouter = Router();

authRouter.post(BASE_ROUTE, (req, res) => {
    const { user, pass } = req.body;
    const token = jwt.sign({ user, pass }, SECRET_KEY);
    res.json({ token });
});

module.exports = authRouter;
