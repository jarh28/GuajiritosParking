const { Router } = require("express");
const { Type } = require("../models");

const BASE_ROUTE = "/types";

const typeRouter = Router();

typeRouter.get(BASE_ROUTE, async (req, res) => {
    try {
        const types = await Type.find();
        res.json(types);
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

typeRouter.get(`${BASE_ROUTE}/:name`, async (req, res) => {
    try {
        const { name } = req.params;
        if (name) {
            const type = (await Type.findOne({ name })) || {};
            res.json(type);
        }
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

typeRouter.post(BASE_ROUTE, async (req, res) => {
    try {
        const { name } = req.body;
        await Type.create({ name });
        res.json({ status: 200, message: "successfully created" });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

typeRouter.patch(`${BASE_ROUTE}/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        if (name) {
            await Type.findByIdAndUpdate(id, { name });
            res.json({ status: 200, message: "successfully updated" });
        }
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

typeRouter.delete(`${BASE_ROUTE}/:id`, async (req, res) => {
    try {
        const { id } = req.params;
        await Type.findByIdAndRemove(id);
        res.json({ status: 200, message: "successfully removed" });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

module.exports = typeRouter;
