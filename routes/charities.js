if (process.env.NODE_ENV !== "production") require("dotenv").config({ path: "./development.env" });
var Charity = require("../models/charity");
const express = require("express");
const router = express.Router();

//General route
router.get("/", async (req, res) => {
    try {
        res.json({ message: `Charity API Route working...` });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/all", async (req, res) => {
    try {
        const charities = await Charity.find();
        res.status(200).json({ charities });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const donateToCharity = async function (name, amount) {
    try {
        const charity = await Charity.findOneAndUpdate(
            { charityName: name },
            {
                $inc: { totalDonated: amount },
            },
            { new: true }
        );
        return { message: `Successfully donated points to '${name}' charity`, charity };
    } catch (err) {
        return { message: err.message };
    }
};

async function resetAllCharities() {
    let charities = ["The Salvation Army", "Robin Hood Foundation", "The Red Cross", "Feeding America", "Action Against Hunger", "Meals on Wheels"];
    for (let i = 0; i < charities.length; i++) {
        let charity = new Charity({
            charityName: charities[i],
            totalDonated: 0,
        });
        await charity.save();
    }
    console.log("All charities have been reset");
}
// resetAllCharities();

module.exports = { router, donateToCharity };
