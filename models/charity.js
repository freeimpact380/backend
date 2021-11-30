var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var CharitySchema = new Schema({
    charityName: { type: String, required: true, index: { unique: true } },
    totalDonated: { type: Number, default: 0 },
});

module.exports = mongoose.model("Charity", CharitySchema);
