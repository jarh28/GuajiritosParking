const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    entryDate: Date,
    isParked: {
        type: Boolean,
        default: false,
    },
});
const Vehicle = mongoose.model("Vehicle", VehicleSchema);

module.exports = Vehicle;
