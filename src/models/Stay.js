const mongoose = require("mongoose");

const StaySchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
    },
    stays: {
        type: [{ entry: Date, leaving: Date }],
        default: [],
    },
});
const Stay = mongoose.model("Stay", StaySchema);

module.exports = Stay;
