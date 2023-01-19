const mongoose = require("mongoose");

const AmountSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
});
const Amount = mongoose.model("Amount", AmountSchema);

module.exports = Amount;
