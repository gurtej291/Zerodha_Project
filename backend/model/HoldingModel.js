const { model } = require("mongoose");
const { HoldingSchema } = require("../schemas/HoldingSchema");

const HoldingModel = model("Holding", HoldingSchema);

module.exports = { HoldingModel };
