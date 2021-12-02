var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var CharitySchema = new Schema({
    charityName: { type: String, required: true, index: { unique: true } },
    totalDonated: { type: Number, default: 0 },
    profilePicture: { type: String, default: "http://www.gravatar.com/avatar/00000000000000000000000000000000?d=mm&f=y" },
});

module.exports = mongoose.model("Charity", CharitySchema);
