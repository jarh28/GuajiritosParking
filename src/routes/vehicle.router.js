const { Router } = require("express");
const { Type, Vehicle, Stay, Amount } = require("../models");
const { leavingDispatcher } = require("../actions/leaving.actions");

const BASE_ROUTE = "/vehicles";

const vehicleRouter = Router();

vehicleRouter.get(BASE_ROUTE, async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

vehicleRouter.patch(`${BASE_ROUTE}/entry`, async (req, res) => {
    try {
        const { plate } = req.body;
        const entryDate = Date.now();
        const vehicle = await Vehicle.findOne({ plate });
        if (!vehicle.isParked) {
            await Vehicle.updateOne({ plate }, { entryDate, isParked: true });
            res.json({ status: 200, message: "successfully registered" });
        } else {
            res.json({ status: 400, message: "vehicle is already parked" });
        }
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

vehicleRouter.patch(`${BASE_ROUTE}/leaving`, async (req, res) => {
    try {
        const { plate } = req.body;
        const vehicle = await Vehicle.findOne({ plate });
        if (vehicle.isParked) {
            const type = await Type.findById(vehicle.type);
            const data = await leavingDispatcher(type, vehicle);
            res.json(data);
        } else {
            res.json({ status: 400, message: "vehicle is not parked" });
        }
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

vehicleRouter.post(`${BASE_ROUTE}/enroll/official`, async (req, res) => {
    try {
        const { plate } = req.body;
        const type = await Type.findOne({ name: "official" });
        await Vehicle.create({ plate, type: type.id });
        await Stay.create({ plate });
        res.json({ status: 200, message: "successfully enrolled" });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

vehicleRouter.post(`${BASE_ROUTE}/enroll/resident`, async (req, res) => {
    try {
        const { plate } = req.body;
        const type = await Type.findOne({ name: "resident" });
        await Vehicle.create({ plate, type: type.id });
        await Amount.create({ plate });
        res.json({ status: 200, message: "successfully enrolled" });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

vehicleRouter.patch(`${BASE_ROUTE}/start-month`, async (req, res) => {
    try {
        await Stay.updateMany({}, { stays: [] });
        await Amount.updateMany({}, { amount: 0 });
        res.json({ status: 200, message: "month successfully started" });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

vehicleRouter.get(`${BASE_ROUTE}/payment-report`, async (req, res) => {
    try {
        let paymentReport =
            "Núm. placa,Tiempo estacionado (min.),Cantidad a pagar\n";
        Amount.find().then((data) => {
            data.forEach((x) => {
                const { plate } = x;
                const time = Math.ceil(x.amount);
                const amount = Number(time * 0.05).toFixed(2);
                paymentReport += `${plate},${time},${amount}\n`;
            });
            res.attachment("payment-report.csv");
            res.type("csv");
            res.send(paymentReport);
        });
    } catch (err) {
        console.error(err);
        res.json({ status: 500, message: "internal server error" });
    }
});

module.exports = vehicleRouter;
