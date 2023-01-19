const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");
const { Type } = require("./src/models");
const types = require("./src/constants/type.constants");

// only for testing purposes
const createTypeCollection = async () => {
    try {
        const data = await Type.find();
        if (data.length === 0) {
            const official = new Type({ name: types.OFFICIAL });
            const resident = new Type({ name: types.RESIDENT });
            const nonResident = new Type({ name: types.NONRESIDENT });

            await official.save();
            await resident.save();
            await nonResident.save();
        }
    } catch (err) {
        console.error(err);
    }
};

mongoose
    .connect(MONGO_URI)
    .then(() => {
        createTypeCollection();
        console.log("=> Database is successfully connected");
    })
    .catch((err) => console.error(err));
