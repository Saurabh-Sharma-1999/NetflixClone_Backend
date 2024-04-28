const express = require("express");
const main = require("./utils/database.js");
const app = express();
require('dotenv').config();
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require('cookie-parser');
const cors = require('cors');

main(); // Establish MongoDB connection

const port = process.env.PORT || 8080; // Use the PORT environment variable or default to 8080
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: function (origin, callback) {
        // Check if the origin is allowed
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));


app.use("/api/v1/user", require("./routes/userRoute.js"));

// Use the error handler middleware
app.use(errorHandler);

app.get("/", (req, res) => {
    res.send("Server working well");
});

app.listen(port, '0.0.0.0', () => { // Bind to 0.0.0.0
    console.log(`App is listening on port ${port}`);
});
