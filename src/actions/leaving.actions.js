const types = require("../constants/type.constants");
const { Vehicle, Stay, Amount } = require("../models");

const leavingDispatcher = async (type, vehicle) => {
    switch (type.name) {
        case types.OFFICIAL: {
            try {
                const { plate } = vehicle;
                const { stays } = await Stay.findOne({ plate });
                const newStay = {
                    entry: vehicle.entryDate,
                    leaving: Date.now(),
                };
                await Stay.updateOne({ plate }, { stays: [...stays, newStay] });
                await Vehicle.findByIdAndUpdate(vehicle.id, {
                    entryDate: null,
                    isParked: false,
                });
                return { status: 200, message: "successfully dispatched" };
            } catch (err) {
                console.error(err);
                return { status: 500, message: "internal server error" };
            }
        }
        case types.RESIDENT: {
            try {
                const { plate } = vehicle;
                const { amount } = await Amount.findOne({ plate });
                const time = (Date.now() - vehicle.entryDate) / 1000 / 60;
                await Amount.updateOne({ plate }, { amount: amount + time });
                await Vehicle.findByIdAndUpdate(vehicle.id, {
                    entryDate: null,
                    isParked: false,
                });
                return { status: 200, message: "successfully dispatched" };
            } catch (err) {
                console.error(err);
                return { status: 500, message: "internal server error" };
            }
        }
        case types.NONRESIDENT: {
            try {
                const amount =
                    ((Date.now() - vehicle.entryDate) / 1000 / 60) * 0.5;
                await Vehicle.findByIdAndUpdate(vehicle.id, {
                    entryDate: null,
                    isParked: false,
                });
                return {
                    amount,
                    status: 200,
                    message: "successfully dispatched",
                };
            } catch (err) {
                console.error(err);
                return { status: 500, message: "internal server error" };
            }
        }
    }
};

module.exports = { leavingDispatcher };
