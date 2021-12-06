if (process.env.NODE_ENV !== "production") require("dotenv").config({ path: "./development.env" });
const express = require("express");
var mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var cors = require("cors");
var MongoStore = require("connect-mongo")(session);

mongoose.connect(process.env.MONGO_URL, function (err) {
    if (err) throw err;
    console.log("Successfully connected to MongoDB");
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.MAIN_URL || "http://localhost:3000" }));
app.use(express.static(__dirname));
app.set("trust proxy", 1);
app.use(
    session({
        secret: process.env.SESSION_SECRET || "localsecretkey",
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 /** 24 hours */,
            secure: false,
        },
        saveUninitialized: false,
        resave: false,
        store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
);

app.get("/", (req, res) => {
    try {
        res.json({ message: "API Route working." });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

const charitiesRouter = require("./routes/charities");
app.use("/charities", charitiesRouter.router);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
});
